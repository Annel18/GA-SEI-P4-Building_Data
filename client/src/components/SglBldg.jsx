import axios from 'axios'
import { Link } from 'react-router-dom'
import { useLoaderData } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'
import { useState } from "react"

//! Components
import FilterBarRT from './FilterBarRT'

//! Styles
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'


export default function IndBldg() {
    // const navigate = useNavigate()
    const userData = useOutletContext()
    const [addType, setAddType] = useState('')
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const indBldg = useLoaderData()

    const {
        id: bldg_id,
        bldg_code,
        bldg_name,
        bldg_description,
        bldg_img,
        roomTypes } = indBldg

    const [roomTypesToUpdate, setRoomTypesToUpdate] = useState(roomTypes)
    console.log(indBldg)


    //! Functions

    const handleChangeRoomUploadType = (event) => {
        setAddType(event.target.value);
    }

    async function removeRT(e, roomId) {
        e.preventDefault()
        // Filter out the room with the specified ID
        const filteredRT = roomTypesToUpdate.filter(value => value.id !== roomId)
        // Extract the IDs from the filtered array
        const roomTypeIds = filteredRT.map(roomType => roomType.id)
        try {
            await axios.patch(`/api/buildings/${bldg_id}/`, { roomTypes: roomTypeIds }, {
                headers: {
                    Authorization: `Bearer ${userData[0].access}`,
                },
            })
            const updatedData = await axios.get(`/api/buildings/${bldg_id}/`)
            setRoomTypesToUpdate(updatedData.data.roomTypes)
        } catch (error) {
            console.error("Error removing room type:", error)
        }
    }

    async function createRT(createdRoom) {

        try {
            const response = await axios.get(`/api/roomTypes/${createdRoom}`)
            const roomToCopy = response.data
            console.log(roomToCopy)

            const ffeArray = []
            roomToCopy.ffes.forEach(object => ffeArray.push(object.id))
            const floorFinishesArray = []
            roomToCopy.floorFinishes.forEach(object => floorFinishesArray.push(object.id))
            const wallFinishesArray = []
            roomToCopy.wallFinishes.forEach(object => wallFinishesArray.push(object.id))
            const ceilingsArray = []
            roomToCopy.ceilings.forEach(object => ceilingsArray.push(object.id))

            console.log(ffeArray)

            const res = await axios.post('/api/roomTypes/', { ...roomToCopy, room_code: `${roomToCopy.room_code}_copy`, ffes: ffeArray, floorFinishes: floorFinishesArray, wallFinishes: wallFinishesArray, ceilings: ceilingsArray }, {
                headers: {
                    Authorization: `Bearer ${userData[0].access}`,
                },
            })
            // const newData = { ...res.data, access: userData[0].access }
            // const roomIdToAdd = newData.id
            updateBldg(res.data.id)
            setOpen(!open)
        } catch (error) {
            console.log(error)
        }
    }

    async function selection(createdRoom) {
        console.log(createdRoom)


        if (addType === "create") {
            createRT(createdRoom)
        }
        else {
            updateBldg(createdRoom)
            setOpen(!open)
        }
    }

    async function updateBldg(createdRoom) {
        const roomTypeIDArray = []
        {
            roomTypesToUpdate &&
                roomTypesToUpdate.forEach(object => {
                    roomTypeIDArray.push(object.id)
                })
        }
        const addedRoom = [...roomTypeIDArray, createdRoom]
        console.log(addedRoom)
        try {
            await axios.patch(`/api/buildings/${indBldg.id}/`, { roomTypes: addedRoom }, {
                headers: {
                    Authorization: `Bearer ${userData[0].access}`
                }
            })
            indBldg.roomTypes = { ...indBldg.roomTypes, addedRoom }
            const updatedData = await axios.get(`/api/buildings/${bldg_id}/`)
            setRoomTypesToUpdate(updatedData.data.roomTypes)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <nav className='navBarTwo'>
                <Link className="nav-button" to={'/buildings/'}>{'>'} Buildings</Link>
            </nav>
            <Container className="ind-Container" fluid>
                <Row>
                    {bldg_img &&
                        <Col sm={3} className="indImgColumn" style={{ backgroundImage: `url(${bldg_img})` }}></Col>
                    }
                    <Col className="indInfoColumn">
                        <Row>
                            <h3 className='page-title'>{bldg_code} || {bldg_name}</h3>
                            <p className='section-separation'><b>DESCRIPTION:</b><button className='submitBtn'>edit</button></p>
                            <p>{bldg_description}</p>
                        </Row>
                        <Row><h4 className='section-separation'>Room Schedule
                            <button className='submitBtn' onClick={handleOpen}> <span style={{ fontSize: 'x-small', alignSelf: 'center' }}>add roomtype </span>✚</button>
                        </h4>
                        </Row>
                        <Modal
                            size="lg"
                            show={open}
                            onHide={handleClose}
                            aria-labelledby="example-modal-sizes-title-lg"
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="example-modal-sizes-title-lg">
                                    Select Room Type to add to Building or create new Room Type
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="modal-container">
                                <FilterBarRT addItem={true} building={indBldg} updateBldg={updateBldg} selection={selection} createRT={createRT} handleChangeRoomUploadType={handleChangeRoomUploadType} />
                            </Modal.Body>
                        </Modal>
                        <Container fluid className="container-grid">
                            <div className='roomType-list'><h5>Code</h5><h5>Name</h5><p>remove</p></div>
                            {roomTypesToUpdate
                                .sort((a, b) => a.room_code.localeCompare(b.room_code))
                                .map(roomType => (
                                    <Col
                                        className='roomType-list'
                                        key={roomType.id}
                                        as={Link}
                                        to={`/roomTypes/${roomType.id}`}
                                    >
                                        <p>{roomType.room_code}</p>
                                        <p>{roomType.room_name}</p>
                                        <p onClick={(e) => removeRT(e, roomType.id)}>❌</p>
                                    </Col>
                                )
                                )}
                        </Container>
                    </Col>
                </Row>

            </Container>
        </>

    )
}