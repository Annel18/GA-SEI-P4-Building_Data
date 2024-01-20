import { Container, Row, Col } from "react-bootstrap"

export default function PageAbout() {

    //!JSX
    return (
        <section className='index-page'>
            <Container fluid className="container-grid">
                <Row className="items-list">
                    <h3 className="page-title section-separation" style={{ paddingTop: '0' }}>About</h3>
                    <Col className='single-container'>
                        This project is for Educational purpose only
                    </Col>
                </Row>
            </Container>
        </section>
    )
}