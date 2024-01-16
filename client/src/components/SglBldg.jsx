import axios from 'axios'
import { Link } from 'react-router-dom'
import { useLoaderData } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'
import { useState, useEffect } from "react"
// import { useNavigate } from 'react-router-dom'
//! Components
import FilterBarRT from './FilterBarRT'
// import UploadDivRT from './UploadDivRT'
//! Styles
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
// import Checkbox from '@mui/material/Checkbox'

export default function IndBldg() {
    // const navigate = useNavigate()
    const userData = useOutletContext()
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

    async function updateBldg(addedRoom) {

        try {
            await axios.patch(`/api/buildings/${indBldg.id}/`, { roomTypes: addedRoom }, {
                headers: {
                    Authorization: `Bearer ${userData[0].access}`
                }
            })
            // const newData = { ...res.data, access: userData[0].access }
            // setBuilding(newData)
            // navigate(`/buildings/${bldg_id}/`)
            indBldg.roomTypes = {...indBldg.roomTypes, addedRoom}
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
                        <Row className='page-title'>
                            <h3 className='page-title'>{bldg_code} || {bldg_name}</h3>
                            <p>DESCRIPTION:{'\n'}{bldg_description}</p>
                        </Row>
                        <Row><h4>Room Schedule
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
                                <FilterBarRT addItem={true} building={indBldg} updateBldg={updateBldg}/>
                            </Modal.Body>
                        </Modal>
                        <Container fluid className="container-grid">
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex' }}>
                                    <h5 className='table-content'>Code</h5>
                                    <h5 className='table-content'>Name</h5>
                                </div>
                                <p>delete</p>
                            </div>
                            <Row className="items-list">
                                {roomTypesToUpdate
                                    .sort((a, b) => a.room_code.localeCompare(b.room_code))
                                    .map(roomType => (
                                        <Row
                                            key={roomType.id}
                                            as={Link}
                                            to={`/roomTypes/${roomType.id}`}
                                        >
                                            <div
                                                // bldg_id={id}
                                                style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid black' }}
                                            >
                                                <div style={{ display: 'flex' }}>
                                                    <h5 className='table-content'>{roomType.room_code}</h5>
                                                    <p className='table-content'>{roomType.room_name}</p>
                                                    {/* <p className='table-content'>{roomType.room_nbrs.length}</p> */}
                                                </div>
                                                <h3
                                                
                                                    onClick={(e) => removeRT(e, roomType.id)}
                                                >❌</h3>
                                            </div>
                                        </Row>
                                    )
                                    )}
                            </Row>
                        </Container>
                    </Col>
                </Row>

            </Container>
        </>

    )
}