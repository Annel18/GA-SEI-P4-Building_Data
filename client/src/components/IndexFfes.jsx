import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from "axios"

//! Styling 
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import Box from '@mui/material/Box'
// import { Modal } from '@mui/material'

export default function IndexFfes() {
    //! States
    const [ffes, setFfes] = useState([])
    // const [search, setSearch] = useState('')
    // const [open, setOpen] = useState(false)
    // const handleOpen = () => setOpen(true)
    // const handleClose = () => setOpen(false)

    //! Effects
    useEffect(() => {
        async function getFfesData() {
            try {
                const res = await axios.get('/api/ffes')
                setFfes(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getFfesData()
    }, [])

    //! JSX
    return (
        <>
            <section className='index-page'>
                <Container fluid className="container-grid">
                    <Row className="items-list">
                        {ffes
                            .map((ffe, i) => {
                                const { ffe_code, ffe_name, ffe_img } = ffe
                                return (
                                    <Col
                                        className="single-container"
                                        key={i}
                                        xs={12}
                                        s={6}
                                        md={4}
                                        lg={3}
                                        xl={2}
                                    >
                                        <div className="rails"></div>
                                        <div
                                            className="thumbnail"
                                            style={{ backgroundImage: `url(${ffe_img})` }}>
                                        </div>
                                        <div>
                                            <h5>{ffe_code}</h5>
                                            <p>{ffe_name}</p>
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