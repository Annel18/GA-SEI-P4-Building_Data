import { Container, Row, Col } from "react-bootstrap"

export default function PageReferences() {

    //!JSX
    return (
        <section className='index-page'>
            <Container className="container-grid">
                <Row className="items-list">
                    <h3 className="page-title section-separation" style={{ paddingTop: '0' }}>Building Regulations</h3>
                    <Col className='single-container'>
                        These are the links to the Approved Documents
                    </Col>
                    <h3 className="page-title section-separation" style={{ paddingTop: '0' }}>HBN Guidances</h3>
                    <Col className='single-container'>
                        These are the links to the Approved Documents
                    </Col>
                </Row>
            </Container>
        </section>
    )
}