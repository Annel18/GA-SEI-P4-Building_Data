/* eslint-disable react/prop-types */
import axios from 'axios'
import { Link, useOutletContext } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getIndRoomType } from "../utils/loaders/roomTypesLoader"

//! Styling 
import Col from 'react-bootstrap/Col'

export default function IndexRoomTypes({ roomType_id, display, selection, crossDisplay, setToDelete, key }) {
    //! States
    const [roomTypes, setRoomTypes] = useState([])
    const userData = useOutletContext()

    useEffect(() => {
        async function roomTypeRetrieve() {
            const roomType = await getIndRoomType(roomType_id)
            setRoomTypes(roomType)
        }
        roomTypeRetrieve()
    }, [roomType_id])

    async function deleteRoomType(e) {
        e.preventDefault()
        try {
            const res = await axios.delete(`/api/roomTypes/${roomType_id}/`, {
                headers: {
                    Authorization: `Bearer ${userData[0].access}`
                }
            })
            setRoomTypes(res.data)
            setToDelete(true)
        } catch (error) {
            console.log(error)
        }
    }

    //! JSX
    return (
        <>
            <Col
                className='single-container'
                key={key}
                as={Link}
                xs={12}
                s={6}
                md={4}
                lg={3}
                xl={2}
                to={`/roomTypes/${roomTypes.id}`}
            >
                <div className="rails">
                    {!roomTypes.room_img
                        ?
                        <div
                            className="thumbnail imagePlaceHolder"
                            to={`/roomTypes/${roomTypes.id}`}>
                            <button
                                style={{ display: display }}
                                className='submitBtn'
                                onClick={(e) => {
                                    e.preventDefault()
                                    const createdRoom = roomType_id
                                    selection(createdRoom)
                                }
                                }
                            >Add</button>
                            <button
                                className='submitBtn'
                                style={{ display: crossDisplay }}
                                onClick={deleteRoomType}
                            >╳</button>
                        </div>
                        :
                        <div
                            className="thumbnail"
                            to={`/roomTypes/${roomTypes.id}`}
                            style={{ backgroundImage: `url(${roomTypes.room_img})` }}>
                            <button
                                style={{ display: display }}
                                className='submitBtn'
                                onClick={(e) => {
                                    e.preventDefault()
                                    const createdRoom = roomType_id
                                    selection(createdRoom)
                                }
                                }
                            >Add</button>
                            <button
                                className='submitBtn'
                                style={{ display: crossDisplay }}
                                onClick={deleteRoomType}
                            >╳</button>
                        </div>
                    }
                    <div>
                        <h5>{roomTypes.room_code}</h5>
                        <p>{roomTypes.room_name}</p>
                    </div>
                </div>
            </Col>
        </>
    )
}