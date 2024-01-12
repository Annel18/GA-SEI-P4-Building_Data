import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from "axios"

//! Styling 
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import Box from '@mui/material/Box'
// import { Modal } from '@mui/material'

export default function IndexRoomTypes() {
    //! States
    const [roomTypes, setRoomTypes] = useState([])
    // const [search, setSearch] = useState('')
    // const [open, setOpen] = useState(false)
    // const handleOpen = () => setOpen(true)
    // const handleClose = () => setOpen(false)

    //! Effects
    useEffect(() => {
        async function getRoomTypesData() {
            try {
                const res = await axios.get('/api/roomTypes')
                setRoomTypes(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getRoomTypesData()
    }, [])

    //! JSX
    return (
        <>
            <section className='index-page'>
                <Container fluid className="container-grid">
                    <Row className="items-list">
                        {roomTypes
                            .map((roomType, i) => {
                                const { _id: singleRoomType, room_code, room_name, room_img } = roomType
                                return (
                                    <Col
                                        className="single-container"
                                        as={Link}
                                        key={i}
                                        xs={12}
                                        s={6}
                                        md={4}
                                        lg={3}
                                        xl={2}
                                        to={`/roomTypes/${singleRoomType}`}
                                    >
                                        <div className="rails"></div>
                                        <div
                                            className="thumbnail"
                                            to={`/roomTypes/${singleRoomType}`}
                                            style={{ backgroundImage: `url(${room_img})` }}>
                                        </div>
                                        <div>
                                            <h5>{room_code}</h5>
                                            <p>{room_name}</p>
                                        </div>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Container>
            </section>
        </>
    )
}