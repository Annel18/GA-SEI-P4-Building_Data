import { Link } from 'react-router-dom'
import { useLoaderData } from 'react-router-dom'
import { useEffect, useState } from 'react'

//! Components
import FilterBarFFE from './FilterBarFFE'
import FilterBarFloorFinish from './FilterBarFloorFinish'

//! Styles
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'

export default function IndRT() {
    const indRT = useLoaderData()
    const [roomCollection, setRoomCollection] = useState([])
    const [open, setOpen] = useState(false)
    const [openFloorFinishUpload, setOpenFloorFinishUpload] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const handleOpenFloorFinishUpload = () => setOpenFloorFinishUpload(true)
    const handleCloseFloorFinishUPload = () => setOpenFloorFinishUpload(false)


    const {
        id: roomType_id,
        room_code,
        room_name,
        room_img,
        area,
        height,
        rooms,
        floorFinishes,
        ceilings,
        wallFinishes,
        ffes } = indRT

    useEffect(() => {
        const updatedCollection = []
        rooms.forEach(object => updatedCollection.push(object.room_nbr))
        const roomListToDisplay = updatedCollection.toString().replaceAll(',', ', ')
        setRoomCollection(roomListToDisplay)
    }, [rooms])


    return (
        <>
            <nav className='navBarTwo'>
                <Link className="nav-button" to={'/buildings/'}>{'>'} Buildings</Link>
                <Link className="nav-button" to={'/buildings/'}>{'>'} Bldg_name</Link>
            </nav>
            <Container className="ind-Container" fluid>
                <Row>
                    {room_img &&
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
                                <p><b>Flooring: </b> {floorFinishes.spec_code} - {floorFinishes.spec_name} <button className='submitBtn' onClick={handleOpenFloorFinishUpload}>edit</button></p>
                                <p><b>Wall finish: </b> {wallFinishes.spec_code} - {wallFinishes.spec_name} <button className='submitBtn'>edit</button></p>
                                <p><b>Ceilings: </b> {ceilings.spec_code} - {ceilings.spec_name} <button className='submitBtn'>edit</button ></p>
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
                                    <FilterBarFFE addItem={true} roomType_id={roomType_id} />
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
                                    <FilterBarFloorFinish addItem={true} roomType_id={roomType_id} />
                                </>
                            </Modal.Body>
                        </Modal>

                        <Container fluid className="container-grid">
                            <div className='ffe-list' ><h5>Code</h5><h5>Name</h5><h5>Group</h5><p>Remove</p></div>
                            {ffes
                                .sort((a, b) => a.ffe_code.localeCompare(b.ffe_code))
                                .map(ffe => (
                                    <Col
                                        key={ffe.id}
                                        className='ffe-list'
                                    >
                                        <p>{ffe.ffe_code}</p>
                                        <p>{ffe.ffe_name}</p>
                                        <p>{ffe.ffe_group}</p>
                                        <p>❌</p>
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