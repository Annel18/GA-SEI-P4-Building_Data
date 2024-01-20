import axios from 'axios'
import { Link } from 'react-router-dom'
import { useLoaderData } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'
import { useEffect, useState } from 'react'

//! Components
import PageFFES from './PageFFEs'
import PageFloorFinishes from './PageFloorFinishes'
import UploadEditRT from './UploadEditRT'

//! Styles
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'

export default function PageSingleRoomType() {
    const [userData] = useOutletContext()
    const builingPreviousPageId = localStorage.getItem('previousPageId')
    const builingPreviousPageName = localStorage.getItem('previousPageName')
    const [roomCollection, setRoomCollection] = useState([])
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const [openEdit, setOpenEdit] = useState(false)
    const handleOpenEdit = () => setOpenEdit(true)
    const handleCloseEdit = () => setOpenEdit(false)
    const [openFloorFinishUpload, setOpenFloorFinishUpload] = useState(false)
    const handleOpenFloorFinishUpload = () => setOpenFloorFinishUpload(true)
    const handleCloseFloorFinishUPload = () => setOpenFloorFinishUpload(false)
    const [display, setDisplay] = useState(true)
    const isUserLoggedIn = userData && userData.access

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
        ffes,
        owner } = indRT
    const [codeToUpdate, setCodeToUpdate] = useState(room_code)
    const [nameToUpdate, setNameToUpdate] = useState(room_name)
    const [ffesToUpdate, setFfesToUpdate] = useState(ffes)
    const [floorFinishesToUpdate, setFloorFinishesToUpdate] = useState(floorFinishes)
    // const [wallFinishesToUpdate, setWallFinishesToUpdate] = useState(wallFinishes)
    // const [ceilingsToUpdate, setCeilingsToUpdate] = useState(ceilings)

    useEffect(() => {
        owner === 1 ? setDisplay('none') : setDisplay(true)
    }, [owner])

    useEffect(() => {
        const updatedSingleRoomCollection = rooms.map(object => object.room_nbr).join(', ')
        setRoomCollection(updatedSingleRoomCollection)
    }, [rooms])

    //! Functions
    async function removeFFE(e, ffeId) {
        e.preventDefault()
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
                    Authorization: `Bearer ${userData.access}`,
                },
            })
        } catch (error) {
            console.error("Error removing FFE type:", error)
        }
    }

    async function updateRT(addedItem) {
        const ffeIDArray = ffesToUpdate.map(object => object.id)
        const ffeIDArrayPopulated = [...ffeIDArray, addedItem]
        try {
            await axios.patch(`/api/roomTypes/${roomType_id}/`, { ffes: ffeIDArrayPopulated }, {
                headers: {
                    Authorization: `Bearer ${userData.access}`
                }
            })
            const updatedData = await axios.get(`/api/roomTypes/${roomType_id}/`)
            setFfesToUpdate(updatedData.data.ffes)
            setOpen(false)
        } catch (error) {
            console.log(error)
        }
    }
    async function edit(json) {
        try {
            await axios.patch(`/api/roomTypes/${roomType_id}/`, json, {
                headers: {
                    Authorization: `Bearer ${userData.access}`,
                },
            })
            const updatedData = await axios.get(`/api/roomTypes/${roomType_id}/`)
            setCodeToUpdate(updatedData.data.room_code)
            setNameToUpdate(updatedData.data.room_name)
            setOpenEdit(!openEdit)
        } catch (error) {
            console.log(error)
        }
    }

    async function updateRoomTypeWithFloorFinish(addedItem) {
        try {
            await axios.patch(`/api/roomTypes/${roomType_id}/`, { floorFinishes: addedItem }, {
                headers: {
                    Authorization: `Bearer ${userData.access}`
                }
            })
            const updatedData = await axios.get(`/api/floorFinishes/${addedItem}/`)
            setFloorFinishesToUpdate(updatedData.data)
            setOpenFloorFinishUpload(!openFloorFinishUpload)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {isUserLoggedIn ?
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
                                <Row className='page-title'><h1><button className='submitBtn' style={{ fontSize: '1rem', display: display }} onClick={handleOpenEdit}>edit</button>{codeToUpdate} || {nameToUpdate}</h1></Row>
                                <Row className='section-separation'><h4>Room Type Characteristics</h4>
                                </Row>
                                <Row>
                                    <Col s={6}>
                                        <p><b>Area: </b>{area}m<sup>2</sup> <button className='submitBtn' style={{ display: display }}>edit</button ></p>
                                        <p><b>Height: </b>{height}mm <button className='submitBtn' style={{ display: display }}>edit</button ></p>
                                        <p><b>Flooring: </b>
                                            {floorFinishesToUpdate && floorFinishesToUpdate.spec_code} - {floorFinishesToUpdate && floorFinishesToUpdate.spec_name}
                                            <button className='submitBtn' onClick={handleOpenFloorFinishUpload} style={{ display: display }}>edit</button></p>
                                        <p><b>Wall finish: </b> { } - { } <button className='submitBtn' style={{ display: display }}>edit</button></p>
                                        <p><b>Ceilings: </b> { } - { } <button className='submitBtn' style={{ display: display }}>edit</button ></p>
                                    </Col>
                                    <Col>
                                        <p><b>Amount of rooms following this type: </b>{rooms.length}</p>
                                        <Row><p><b>Room numbers: </b> {roomCollection}</p></Row>
                                    </Col>
                                </Row>
                                <Row className='section-separation'><h4>FFE Schedule
                                    <button className='submitBtn' onClick={handleOpen} style={{ display: display }}> <span style={{ fontSize: 'x-small', alignSelf: 'center' }}>add FFE </span>✚</button>
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

                                {/* Modal to EDIT code and name */}
                                <Modal
                                    size="lg"
                                    show={openEdit}
                                    onHide={handleCloseEdit}
                                    aria-labelledby="example-modal-sizes-title-lg"
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title id="example-modal-sizes-title-lg">
                                            Edit
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className="modal-container">
                                        <>
                                            <UploadEditRT roomType_id={roomType_id} edit={edit} />
                                        </>
                                    </Modal.Body>
                                </Modal>

                                <Container fluid className="container-grid">
                                    <div className='ffe-list' ><h5>Code</h5><h5>Name</h5><h5>Group</h5><p style={{ display: display }}>Remove</p></div>
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
                                                <p onClick={(e) => removeFFE(e, ffe.id)} style={{ display: display }}>❌</p>
                                            </Col>
                                        )
                                        )}
                                </Container>
                            </Col>
                        </Row>

                    </Container>
                </>
                :
                <h1>404 PAGE NOT FOUND</h1>
            }
        </>

    )
}