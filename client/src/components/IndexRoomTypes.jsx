/* eslint-disable react/prop-types */
import { Link, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { getIndRoomType } from "../utils/loaders/roomTypesLoader"
import { getIndBuilding } from "../utils/loaders/buildingsLoader"
import { useOutletContext } from 'react-router-dom'

//! Styling 
import Col from 'react-bootstrap/Col'
import axios from 'axios'

export default function IndexRoomTypes({ roomType_id, addRoom, bldg_id }) {
    //! States
    const [roomTypes, setRoomTypes] = useState([])
    const [buildings, setBuildings] = useState([])
    const userData = useOutletContext()
    // const [style, setStyle] = useState('display')

    useEffect(() => {
        async function roomTypeRetrieve() {
            const roomType = await getIndRoomType(roomType_id)
            setRoomTypes(roomType)
        }
        roomTypeRetrieve()
    }, [roomType_id])

    useEffect(() => {
        async function buildingsRetrieve() {
            const building = await getIndBuilding(bldg_id)
            setBuildings(building)
        }
        buildingsRetrieve()
    }, [bldg_id])

    async function updateBldg(e) {
        e.preventDefault()
        try {
            const res = await axios.patch(`/api/buildings/${bldg_id}/`, {roomTypes: e}, {
                headers: {
                    Authorization: `Bearer ${userData[0].access}`
                }
            })
            const newData = {...res.data, access: userData[0].access}
            setBuildings(res.data)
            Navigate(`/buildings/${bldg_id}`)
        } catch (error) {
            console.log(error)
        }
    }

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
                            style={{ display: addRoom }}
                            onClick={updateBldg}
                        >✅</h3>
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