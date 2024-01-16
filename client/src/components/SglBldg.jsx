import { Link } from 'react-router-dom'
import { useLoaderData } from 'react-router-dom';
import { useState } from "react"

//! Components
import FilterBarRT from './FilterBarRT'
// import UploadDivRT from './UploadDivRT'
//! Styles
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'

export default function IndBldg() {
    const indBldg = useLoaderData()
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const {
        id: bldg_id,
        bldg_code,
        bldg_name,
        bldg_description,
        bldg_img,
        roomTypes } = indBldg

    console.log(roomTypes)

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
                        <Row><h3>{bldg_code} || {bldg_name}</h3></Row>
                        <Row><p>{bldg_description}</p></Row>
                        <Row><h4>Room Schedule
                            <button className='submitBtn' onClick={handleOpen}> <span style={{fontSize:'x-small', alignSelf:'center'}}>add roomtype </span>✚</button>
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
                                <>
                                <FilterBarRT addItem={true} bldg_id={bldg_id} />
                                </>
                            </Modal.Body>

                        </Modal>
                        <Container fluid className="container-grid">
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}><h5>Code</h5><h5>Name</h5></div>
                            {roomTypes
                                .sort((a, b) => a.room_code.localeCompare(b.room_code))
                                .map(roomType => (
                                    // console.log(roomType)
                                    <Row key={roomType.id}>
                                        <Link
                                            to={`/roomTypes/${roomType.id}`}
                                            // bldg_id={id}
                                            style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid black' }}>
                                            <p>{roomType.room_code}</p>
                                            <p>{roomType.room_name}</p>
                                            {/* <p>{roomType.room_nbr.length}</p> */}
                                        </Link>
                                    </Row>
                                )
                                )}
                        </Container>
                    </Col>
                </Row>

            </Container>
        </>

    )
}