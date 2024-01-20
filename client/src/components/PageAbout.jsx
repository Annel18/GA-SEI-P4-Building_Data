import { Container, Row, Col } from "react-bootstrap"

export default function PageAbout() {

    //!JSX
    return (
        <section className="hero">
            <div className="fieldset">
                <div className='index-page'>
                    <Container fluid className="container-grid">
                        <Row className="items-list">
                            <h3 className="page-title section-separation" style={{ paddingTop: '0' }}>About</h3>
                            <Col className='single-container'>
                                <p>
                                    This project is for educational purpose only. The website has been built as part of the General Assembly SEI curriculum
                                </p>
                                <p>
                                    All information used to build the database can publicly be found on the England NHS website
                                </p>
                                <p>
                                    <a href=" https://www.england.nhs.uk/publication/foi-activity-database/">https://www.england.nhs.uk/publication/foi-activity-database/</a>
                                </p>
                                <br />
                                <h5>The Brief</h5>
                                <p>Fullstack project | build time:10days | Solo</p>
                                <br />
                                <h5>Github</h5>
                                <p className="devLinks" style={{ fontStyle: 'italic' }}>
                                    <a href='https://github.com/Annel18' target='_blank' rel='noreferrer'>Anne-Laure Guiot</a>
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </section>
    )
}