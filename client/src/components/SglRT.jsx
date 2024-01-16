import { Link } from 'react-router-dom'
import { useLoaderData } from 'react-router-dom'
import { useEffect, useState } from 'react'

//! Components
import FilterBarFFE from './FilterBarFFE'

//! Styles
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'

export default function IndRT() {
    const indRT = useLoaderData()
    const [open, setOpen] = useState(false)
    const [roomCollection, setRoomCollection] = useState([])
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)


    const {
        id: roomType_id,
        room_code,
        room_name,
        room_img,
        area,
        height,
        rooms,
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
                                <p><b>Area: </b>{area}m<sup>2</sup></p>
                                <p><b>Height: </b>{height}mm </p>
                                <p><b>Flooring: </b> spec_code and spec_name </p>
                                <p><b>Wall finish: </b> spec_code and spec_name</p>
                                <p><b>Ceilings: </b> spec_code and spec_name</p>
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

                        <Container fluid className="container-grid">
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}><h5>Code</h5><h5>Name</h5><h5>Group</h5></div>
                            {ffes
                                .sort((a, b) => a.ffe_code.localeCompare(b.ffe_code))
                                .map(ffe => (
                                    // console.log(ffe)
                                    <Col
                                        key={ffe.id}
                                        className='ffe-list'
                                        // as={Link}
                                        // to={`/buildings/${roomType_id}/${ffe.id}`}
                                    >
                                        <p>{ffe.ffe_code}</p>
                                        <p>{ffe.ffe_name}</p>
                                        <p>{ffe.ffe_group}</p>
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