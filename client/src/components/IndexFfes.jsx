/* eslint-disable react/prop-types */
// import { Link } from 'react-router-dom'
// import axios from 'axios'
import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useOutletContext } from 'react-router-dom'

import { getIndFfe } from "../utils/loaders/ffesLoader"
// import { getIndRoomType } from "../utils/loaders/roomTypesLoader"

//! Styling 
// import Col from 'react-bootstrap/Col'
import Col from 'react-bootstrap/Col'

export default function IndexFfes({ ffe_id, updateRT, display }) {
    //! States
    const [ffes, setFfes] = useState([])
    // const [roomTypes, setRoomTypes] = useState([])
    // const userData = useOutletContext()
    // const navigate = useNavigate()

    useEffect(() => {
        async function ffeRetrieve() {
            const ffe = await getIndFfe(ffe_id)
            setFfes(ffe)
        }
        ffeRetrieve()
    }, [ffe_id])

    // useEffect(() => {
    //     async function roomTypeRetrieve() {
    //         const roomType = await getIndRoomType(roomType_id)
    //         setRoomTypes(roomType)
    //     }
    //     roomTypeRetrieve()
    // }, [roomType_id])



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