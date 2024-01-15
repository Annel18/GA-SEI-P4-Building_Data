import { Link } from 'react-router-dom'
import { useLoaderData } from 'react-router-dom';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function IndRT() {
    const indRT = useLoaderData()

    const {
        id,
        room_code,
        room_name,
        room_img,
        area,
        height,
        ffes } = indRT
console.log(room_img)
    return (
        <>
            <nav className='navBarTwo'>
                <Link className="nav-button" to={'/'}>Projects</Link>
                <Link className="nav-button" to={'/buidlings/{bldg_id}'}>buildings</Link>
            </nav>
            <Container className="ind-Container" fluid>
                <Row>
                    {room_img && 
                    <Col sm={3} className="indImgColumn" style={{ backgroundImage: `url(${room_img})` }}></Col>
                    }
                    <Col className="indInfoColumn">
                        <Row><h3>{room_code} || {room_name}</h3></Row>
                        <Row>
                            <p>Area: {area}m<sup>2</sup></p>
                            <p>Height: {height}mm </p>
                        </Row>
                        <Row><h4>FFE Schedule</h4></Row>
                        <Container fluid className="container-grid">
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}><h5>Code</h5><h5>Name</h5><h5>Group</h5></div>
                            {ffes
                                .sort((a, b) => a.ffe_code.localeCompare(b.ffe_code))
                                .map(ffe => (
                                    // console.log(ffe)
                                    <Row key={ffe.id}>
                                        <Link
                                            to={`/buildings/${id}/${ffe.id}`}
                                            style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid black' }}>
                                            <p>{ffe.ffe_code}</p>
                                            <p>{ffe.ffe_name}</p>
                                            <p>{ffe.ffe_group}</p>
                                        </Link>
                                    </Row>
                                )
                                )}
                        </Container>s
                    </Col>
                </Row>

            </Container>
        </>

    )
}