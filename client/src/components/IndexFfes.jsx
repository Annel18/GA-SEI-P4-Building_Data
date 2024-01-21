/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { getIndFfe } from "../utils/loaders/ffesLoader"

//! Styling 
import Col from 'react-bootstrap/Col'

export default function IndexFfes({ ffe_id, updateRT, display }) {
    //! States
    const [ffes, setFfes] = useState([])

    useEffect(() => {
        async function ffeRetrieve() {
            const ffe = await getIndFfe(ffe_id)
            setFfes(ffe)
        }
        ffeRetrieve()
    }, [ffe_id])



    //! JSX
    return (
        <>
            <Col
                className='ffe-list'
                key={ffe_id}
            >
                    <p>{ffes.ffe_code}</p>
                    <p>{ffes.ffe_name}</p>
                    <p>{ffes.ffe_group}</p>
                    <button
                        className='submitBtn'
                        style={{ display: display }}
                        onClick={(e) => {
                            e.preventDefault()
                            const addedFFE = ffe_id
                            updateRT(addedFFE)
                        }
                        }
                    >Add</button>
            </Col>
            {/* </div> */}
            {/* </div> */}
        </>
    )
}