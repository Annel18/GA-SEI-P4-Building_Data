import axios from "axios"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

//! Styles
import { Container, Row, Col } from "react-bootstrap"

export default function PageResources() {
    //!States
    const [regs, setRegs] = useState([])
    const [hbns, setHbns] = useState([])

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

    useEffect(() => {
        async function getHbn() {
            try {
                const res = await axios.get(`/api/resourcesHBN/`)
                console.log(res.data)
                setHbns(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getHbn()
    }, [hbns.id])

    //!JSX
    return (
        <section className='index-page'>
            <Container fluid className="container-grid">
                <Row className="items-list">
                    <h3 className="page-title section-separation" style={{ paddingTop: '1em' }}>HBN Guidances</h3>
                    {hbns
                        .map(hbn => (
                            <Col
                                className='single-container'
                                key={`${hbn.id}`}
                                as={Link}
                                xs={12}
                                s={6}
                                md={4}
                                lg={3}
                                xl={2}
                                to={`${hbn.hbn_link}`}
                            >
                                <div className="rails-ref">
                                    <div
                                        className="thumbnail"
                                        style={{ backgroundImage: `url(${hbn.hbn_img})` }}>
                                    </div>
                                    <div>
                                        <h5>{hbn.hbn_code}</h5>
                                        <p>{hbn.hbn_name}</p>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    <h3 className="page-title section-separation" style={{ paddingTop: '1em' }}>Building Regulations</h3>
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
                                <div className="rails-ref">
                                    <div
                                        className="thumbnail"
                                        style={{ backgroundImage: `url(${reg.reg_img})` }}>
                                    </div>
                                    <div>
                                        <h5>{reg.reg_code}</h5>
                                        <p>{reg.reg_name}</p>
                                    </div>
                                </div>
                            </Col>
                        ))}
                </Row>
            </Container>
        </section>
    )
}