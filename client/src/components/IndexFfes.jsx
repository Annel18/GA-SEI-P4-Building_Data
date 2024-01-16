/* eslint-disable react/prop-types */
// import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'

import { getIndFfe } from "../utils/loaders/ffesLoader"
import { getIndRoomType } from "../utils/loaders/roomTypesLoader"

//! Styling 
// import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default function IndexFfes({ ffe_id, addItem, roomType_id }) {
    //! States
    const [ffes, setFfes] = useState([])
    const [roomTypes, setRoomTypes] = useState([])
    const userData = useOutletContext()
    const navigate = useNavigate()

    useEffect(() => {
        async function ffeRetrieve() {
            const ffe = await getIndFfe(ffe_id)
            setFfes(ffe)
        }
        ffeRetrieve()
    }, [ffe_id])

    useEffect(() => {
        async function roomTypeRetrieve() {
            const roomType = await getIndRoomType(roomType_id)
            setRoomTypes(roomType)
        }
        roomTypeRetrieve()
    }, [roomType_id])

    async function updateRT(addedFFE) {

        try {
            const res = await axios.patch(`/api/roomTypes/${roomType_id}/`, { roomTypes: addedFFE }, {
                headers: {
                    Authorization: `Bearer ${userData[0].access}`
                }
            })
            const newData = { ...res.data, access: userData[0].access }
            setRoomTypes(newData)
            navigate(`/roomTypes/${roomType_id}/`)
        } catch (error) {
            console.log(error)
        }
    }

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
                to={`/ffes/${ffes.ffe_id}`}
            > */}
            {/* <div /*className="rails" style={{ height: '200px', paddingBottom: '3em' }} */}
            {/* <div
                        className="thumbnail"
                        to={`/ffes/${ffes.ffe_id}`}
                        style={{ backgroundImage: `url(${ffes.ffe_img})` }}>
                    </div> */}
            <Row>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid black' }}>
                    <h3
                        style={{ display: addItem }}
                        onClick={(e) => {
                            e.preventDefault()
                            const { ffes } = roomTypes
                            const ffeIdArray = []
                            ffes.forEach(object => {
                                ffeIdArray.push(object.id)
                            })
                            const addedFFE = [...ffeIdArray, ffe_id]
                            updateRT(addedFFE)
                        }
                        }
                    >✅</h3>
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