import axios from "axios"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

//! Styles
import { Container, Row, Col } from "react-bootstrap"

export default function PageResources() {
    //!States
    const [regs, setRegs] = useState([])
    //! Effects
    useEffect(() => {
        async function getBuildingRegs() {
            try {
                const res = await axios.get(`/api/resourcesBuildingRegs/`)
                console.log(res.data)
                setRegs(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getBuildingRegs()
    }, [regs.id])

    //!JSX
    return (
        <section className='index-page'>
            <Container fluid className="container-grid">
                <Row className="items-list">
                    <h3 className="page-title section-separation" style={{ paddingTop: '0' }}>Building Regulations</h3>
                    {regs
                        .map(reg => (
                            <Col
                                className='single-container'
                                key={`${reg.id}`}
                                as={Link}
                                xs={6}
                                s={4}
                                md={3}
                                lg={2}
                                xl={1}
                                to={`${reg.reg_link}`}
                            >
                                <div className="rails">
                                    <div
                                        className="thumbnail"
                                        style={{ backgroundImage: `url(${reg.reg_img})` }}>
                                    </div>
                                    <div>
                                        <h5>{reg.room_code}</h5>
                                        <p>{reg.room_name}</p>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    <h3 className="page-title section-separation" style={{ paddingTop: '0' }}>HBN Guidances</h3>
                    <Col className='single-container'>
                        These are the links to the Approved Documents
                    </Col>
                </Row>
            </Container>
        </section>
    )
}