/* eslint-disable react/prop-types */
// import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'


import { getIndFfe } from "../utils/loaders/ffesLoader"

//! Styling 
// import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default function IndexFfes({ id }) {
    //! States
    const [ffes, setFfes] = useState([])

    useEffect(() => {
        async function ffeRetrieve() {
            const ffe = await getIndFfe(id)
            setFfes(ffe)
        }
        ffeRetrieve()
    }, [id])

    //! JSX
    return (
        <>
            {/* <div
                className='single-container'
                Link helps the individual ffe page function
                as={Link}
                xs={12}
                s={6}
                md={4}
                lg={3}
                xl={2}
                to={`/ffes/${ffes.id}`}
            > */}
            {/* <div /*className="rails" style={{ height: '200px', paddingBottom: '3em' }} */}
            {/* <div
                        className="thumbnail"
                        to={`/ffes/${ffes.id}`}
                        style={{ backgroundImage: `url(${ffes.ffe_img})` }}>
                    </div> */}
            <Row>
                <div style={{display:'flex', justifyContent:'space-between', borderTop:'1px solid black'}}>
                    <h5>{ffes.ffe_code}</h5>
                    <p>{ffes.ffe_name}</p>
                    <h5>{ffes.ffe_group}</h5>
                </div>
            </Row>
            {/* </div> */}
            {/* </div> */}
        </>
    )
}