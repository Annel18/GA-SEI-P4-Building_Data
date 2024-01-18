import axios from 'axios'
import { Link } from 'react-router-dom'
import { useLoaderData } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'
import { useEffect, useState } from 'react'

//! Components
import PageFFES from './PageFFEs'
import PageFloorFinishes from './PageFloorFinishes'

//! Styles
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'

export default function SingleRoomType() {
    const userData = useOutletContext()
    const builingPreviousPageId = localStorage.getItem('previousPageId')
    const builingPreviousPageName = localStorage.getItem('previousPageName')
    const [roomCollection, setRoomCollection] = useState([])
    const [open, setOpen] = useState(false)
    const [openFloorFinishUpload, setOpenFloorFinishUpload] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const handleOpenFloorFinishUpload = () => setOpenFloorFinishUpload(true)
    const handleCloseFloorFinishUPload = () => setOpenFloorFinishUpload(false)

    const indRT = useLoaderData()
    const {
        id: roomType_id,
        room_code,
        room_name,
        room_img,
        area,
        height,
        rooms,
        floorFinishes,
        // ceilings,
        // wallFinishes,
        ffes } = indRT
    const [ffesToUpdate, setFfesToUpdate] = useState(ffes)
    const [floorFinishesToUpdate, setFloorFinishesToUpdate] = useState(floorFinishes)
    // const [wallFinishesToUpdate, setWallFinishesToUpdate] = useState(wallFinishes)
    // const [ceilingsToUpdate, setCeilingsToUpdate] = useState(ceilings)


    useEffect(() => {
        const updatedSingleRoomCollection = rooms.map(object => object.room_nbr).join(', ')
        console.log("Updated Collection:", updatedSingleRoomCollection)
        setRoomCollection(updatedSingleRoomCollection)
        async function retrieveFloorFinish() { }
        retrieveFloorFinish()
    }, [rooms])

    //! Functions
    async function removeFFE(e, ffeId) {
        e.preventDefault()
        console.log("Removing FFE. FFE ID:", ffeId)
        try {
            // Filter out the room with the specified ID
            const filteredFFE = ffesToUpdate.filter(value => value.id !== ffeId)
            // Extract the IDs from the filtered array
            const ffesIds = filteredFFE.map(ffe => ffe.id)
            // Update the state with the filtered FFE IDs
            setFfesToUpdate(filteredFFE)
            // Send the patch request
            await axios.patch(`/api/roomTypes/${roomType_id}/`, { ffes: ffesIds }, {
                headers: {
                    Authorization: `Bearer ${userData[0].access}`,
                },
            })
        } catch (error) {
            console.error("Error removing FFE type:", error)
        }
    }

    async function updateRT(addedItem) {
        console.log("Updating RT. Added Item:", addedItem)
        const ffeIDArray = ffesToUpdate.map(object => object.id)
        const ffeIDArrayPopulated = [...ffeIDArray, addedItem]
        try {
            await axios.patch(`/api/roomTypes/${roomType_id}/`, { ffes: ffeIDArrayPopulated }, {
                headers: {
                    Authorization: `Bearer ${userData[0].access}`
                }
            })
            const updatedData = await axios.get(`/api/roomTypes/${roomType_id}/`)
            console.log(updatedData)
            setFfesToUpdate(updatedData.data.ffes)

            setOpen(false)
        } catch (error) {
            console.log(error)
        }
    }
    async function updateRoomTypeWithFloorFinish(addedItem) {
        console.log("Updating Room Type with Floor Finish. Added Item:", addedItem)
        try {
            await axios.patch(`/api/roomTypes/${roomType_id}/`, { floorFinishes: addedItem }, {
                headers: {
                    Authorization: `Bearer ${userData[0].access}`
                }
            })
            const updatedData = await axios.get(`/api/floorFinishes/${addedItem}/`)
            console.log(updatedData.data)
            setFloorFinishesToUpdate(updatedData.data)
            setOpenFloorFinishUpload(!openFloorFinishUpload)
        } catch (error) {
            console.log(error)
        }
    }
    console.log("Component Re-rendered!")

    return (
        <>
            <nav className='navBarTwo'>
                <Link className="nav-button" to={'/buildings/'}>{'>'} Buildings</Link>
                <Link className="nav-button" to={`/buildings/${builingPreviousPageId}`}>{'>'} {builingPreviousPageName}</Link>
            </nav>
            <Container className="ind-Container" fluid>
                <Row>
                    {!room_img ?
                        <Col sm={3} className="indImgColumn imagePlaceHolder"></Col>
                        :
                        <Col sm={3} className="indImgColumn" style={{ backgroundImage: `url(${room_img})` }}></Col>
                    }
                    <Col className="indInfoColumn">
                        <Row className='page-title'><h1>{room_code} || {room_name}</h1></Row>
                        <Row className='section-separation'><h4>Room Type Characteristics</h4>
                        </Row>
                        <Row>
                            <Col s={6}>
                                <p><b>Area: </b>{area}m<sup>2</sup> <button className='submitBtn'>edit</button ></p>
                                <p><b>Height: </b>{height}mm <button className='submitBtn'>edit</button ></p>
                                <p><b>Flooring: </b>
                                    {floorFinishesToUpdate && floorFinishesToUpdate.spec_code} - {floorFinishesToUpdate && floorFinishesToUpdate.spec_name}
                                    <button className='submitBtn' onClick={handleOpenFloorFinishUpload}>edit</button></p>
                                <p><b>Wall finish: </b> { } - { } <button className='submitBtn'>edit</button></p>
                                <p><b>Ceilings: </b> { } - { } <button className='submitBtn'>edit</button ></p>
                            </Col>
                            <Col>
                                <p><b>Amount of rooms following this type: </b>{rooms.length}</p>
                                <Row><p><b>Room numbers: </b> {roomCollection}</p></Row>
                            </Col>
                        </Row>
                        <Row className='section-separation'><h4>FFE Schedule
                            <button className='submitBtn' onClick={handleOpen}> <span style={{ fontSize: 'x-small', alignSelf: 'center' }}>add FFE </span>✚</button>
                        </h4>
                        </Row>

                        {/* Modal to upload FFE */}
                        <Modal
                            size="lg"
                            show={open}
                            onHide={handleClose}
                            aria-labelledby="example-modal-sizes-title-lg"
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="example-modal-sizes-title-lg">
                                    Select FFE to add to Building or create new FFE
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="modal-container">
                                <>
                                    <PageFFES display={true} roomType_id={roomType_id} updateRT={updateRT} />
                                </>
                            </Modal.Body>
                        </Modal>

                        {/* Modal to upload Floor Finish */}
                        <Modal
                            size="lg"
                            show={openFloorFinishUpload}
                            onHide={handleCloseFloorFinishUPload}
                            aria-labelledby="example-modal-sizes-title-lg"
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="example-modal-sizes-title-lg">
                                    Select Floor Finish to add to Roomtype or create new Floor Finish
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="modal-container">
                                <>
                                    <PageFloorFinishes addItem={true} roomType_id={roomType_id} updateRoomTypeWithFloorFinish={updateRoomTypeWithFloorFinish} />
                                </>
                            </Modal.Body>
                        </Modal>

                        <Container fluid className="container-grid">
                            <div className='ffe-list' ><h5>Code</h5><h5>Name</h5><h5>Group</h5><p>Remove</p></div>
                            {ffesToUpdate
                                .sort((a, b) => a.ffe_code.localeCompare(b.ffe_code))
                                .map(ffe => (
                                    <Col
                                        key={ffe.id}
                                        className='ffe-list'
                                    >
                                        <p>{ffe.ffe_code}</p>
                                        <p>{ffe.ffe_name}</p>
                                        <p>{ffe.ffe_group}</p>
                                        <p onClick={(e) => removeFFE(e, ffe.id)}>❌</p>
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