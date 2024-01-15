/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'

import { getIndRoomType } from "../utils/loaders/roomTypesLoader"
import { getIndBuilding } from "../utils/loaders/buildingsLoader"

//! Styling 
import Col from 'react-bootstrap/Col'
import axios from 'axios'

export default function IndexRoomTypes({ roomType_id, addRoom, bldg_id }) {
    //! States
    const [roomTypes, setRoomTypes] = useState([])
    const [buildings, setBuildings] = useState([])
    const userData = useOutletContext()
    const navigate = useNavigate()
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

    async function updateBldg(addedRoom) {

        try {
            const res = await axios.patch(`/api/buildings/${bldg_id}/`, {roomTypes: addedRoom}, {
                headers: {
                    Authorization: `Bearer ${userData[0].access}`
                }
            })
            const newData = {...res.data, access: userData[0].access}
            setBuildings(newData)
            navigate(`/buildings/${bldg_id}/`)
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
                            onClick={(e)=>{
                                e.preventDefault()
                                const {roomTypes}= buildings
                                const roomTypeIDArray = []
                                roomTypes.forEach(object => {
                                    roomTypeIDArray.push(object.id)
                                })
                                console.log(roomTypeIDArray)
                                // console.log(roomTypesIDList)
                                const addedRoom = [...roomTypeIDArray, roomType_id]
                                console.log(addedRoom)
                                updateBldg(addedRoom)}
                            }
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