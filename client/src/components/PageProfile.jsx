import { useOutletContext } from "react-router-dom"
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function PageProfile() {
    const [userData, setUserData] = useOutletContext()

    console.log(userData)

    return (
        <>
            <nav className='navBarTwo' style={{ padding:'0px'}}>
                {/* <Link className="nav-button" to={'/buildings/'}>{'>'} Buildings</Link> */}
            </nav>
            <Container className="ind-Container" fluid>
                <Row>
                    {!userData.img ?

                        <Col sm={3} className="indImgColumn" style={{ backgroundImage: 'url(https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png)' }}></Col>
                        :
                        <Col sm={3} className="indImgColumn" style={{ backgroundImage: `url(${userData.img})` }}></Col>
                    }
                    <Col className="indInfoColumn">
                        <Row>
                            <h3 className='page-title'>Profile</h3>
                            <Row style={{alignItems:'Center'}}>
                                <Col sm={2} style={{display:"flex", justifyContent:'flex-end'}}><b>username:</b></Col>
                                <Col style={{display:"flex", alignItems:'baseline'}}>
                                    <div>{userData.username}</div>
                                    <button className='submitBtn' style={{ width: 'auto' }}>edit</button >
                                </Col>
                            </Row>
                            <Row style={{alignItems:'Center'}}>
                                <Col sm={2} style={{display:"flex", justifyContent:'flex-end'}}><b>First Name:</b></Col>
                                <Col style={{display:"flex", alignItems:'baseline'}}>
                                    <div>{userData.first_name}</div>
                                    <button className='submitBtn' style={{ width: 'auto' }}>edit</button >
                                </Col>
                            </Row>
                            <Row style={{alignItems:'Center'}}>
                                <Col sm={2} style={{display:"flex", justifyContent:'flex-end'}}><b>Last Name:</b></Col>
                                <Col style={{display:"flex", alignItems:'baseline'}}>
                                    <div>{userData.last_name}</div>
                                    <button className='submitBtn' style={{ width: 'auto' }}>edit</button >
                                </Col>
                            </Row>

                            <Row style={{alignItems:'Center'}}>
                                <Col sm={2} style={{display:"flex", justifyContent:'flex-end'}}><b>email:</b></Col>
                                <Col style={{display:"flex", alignItems:'baseline'}}>
                                    <div>{userData.email}</div>
                                    <button className='submitBtn' style={{ width: 'auto' }}>edit</button >
                                </Col>
                            </Row>
                            <Row style={{alignItems:'Center'}}>
                                <Col sm={2} style={{display:"flex", justifyContent:'flex-end'}}><b>bio:</b></Col>
                                <Col style={{display:"flex", alignItems:'baseline'}}>
                                    <div>{userData.bio}</div>
                                    <button className='submitBtn' style={{ width: 'auto' }}>edit</button >
                                </Col>
                            </Row>


                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}