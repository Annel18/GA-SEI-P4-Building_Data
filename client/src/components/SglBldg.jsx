import { Link } from 'react-router-dom'
import { useLoaderData } from 'react-router-dom';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function IndBldg() {
    const indBldg = useLoaderData()

    const {
        // id,
        bldg_code,
        bldg_name,
        bldg_description,
        bldg_img,
        roomTypes } = indBldg

        console.log(roomTypes)

    return (
        <>
            <nav className='navBarTwo'>
                <Link className="nav-button" to={'/'}>Projects</Link>
            </nav>
            <Container className="ind-Container" fluid>
                <Row>
                    <Col sm={3} className="indImgColumn">
                        <div className="poster-container">
                            <div className="poster" style={{ backgroundImage: `url(${bldg_img})` }}><></></div>
                        </div>
                    </Col>
                    <Col className="indInfoColumn">
                        <Row><h3>{bldg_code} || {bldg_name}</h3></Row>
                        <Row><p>{bldg_description}</p></Row>
                        <Row><h4>Room Schedule</h4></Row>
                        <Container fluid className="container-grid">
                            <div style={{ display: 'flex', justifyContent: 'space-between'}}><h5>Code</h5><h5>Name</h5></div>
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