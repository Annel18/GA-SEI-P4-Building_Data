/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getIndRoomType } from "../utils/loaders/roomTypesLoader"

//! Styling 
import Col from 'react-bootstrap/Col'

export default function IndexRoomTypes({ roomType_id, addItem, selection }) {
    //! States
    const [roomTypes, setRoomTypes] = useState([])

    useEffect(() => {
        async function roomTypeRetrieve() {
            const roomType = await getIndRoomType(roomType_id)
            setRoomTypes(roomType)
        }
        roomTypeRetrieve()
    }, [roomType_id])

    //! JSX
    return (
        <>
            <Col
                className='single-container'
                as={Link}
                xs={12}
                s={6}
                md={4}
                lg={3}
                xl={2}
                to={`/roomTypes/${roomTypes.id}`}
            >
                <div className="rails" style={{ height: '200px', paddingBottom: '3em' }}>
                    <div
                        className="thumbnail"
                        to={`/roomTypes/${roomTypes.id}`}
                        style={{ backgroundImage: `url(${roomTypes.room_img})` }}>
                        <h3
                            style={{ display: addItem }}
                            onClick={(e) => {
                                e.preventDefault()
                                e.target.innerText === '✅'
                                const createdRoom = roomType_id
                                selection(createdRoom)
                            }
                            }
                        >☑️</h3>
                    </div>
                    <div>
                        <h5>{roomTypes.room_code}</h5>
                        <p>{roomTypes.room_name}</p>
                    </div>
                </div>
            </Col>
        </>
    )
}