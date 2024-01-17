/* eslint-disable react/prop-types */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'

import { getIndFloorFinish } from "../utils/loaders/floorFinishesLoader"
import { getIndRoomType } from "../utils/loaders/roomTypesLoader"

//! Styling 
import Row from 'react-bootstrap/Row'

export default function IndexFloorFinishes({ spec_id, addItem, roomType_id }) {
    //! States
    const [floorFinishes, setfloorFinishes] = useState([])
    const [roomTypes, setRoomTypes] = useState([])
    const userData = useOutletContext()

    useEffect(() => {
        async function floorFinishRetrieve() {
            const floorFinish = await getIndFloorFinish(spec_id)
            setfloorFinishes(floorFinish)
        }
        floorFinishRetrieve()
    }, [spec_id])

    useEffect(() => {
        async function roomTypeRetrieve() {
            const roomType = await getIndRoomType(roomType_id)
            setRoomTypes(roomType)
        }
        roomTypeRetrieve()
    }, [roomType_id])

    async function updateRT(addedFloorFinish) {

        try {
            const res = await axios.patch(`/api/roomTypes/${roomType_id}/`, { floorFinishes: addedFloorFinish }, {
                headers: {
                    Authorization: `Bearer ${userData[0].access}`
                }
            })
            const newData = { ...res.data, access: userData[0].access }
            setRoomTypes(newData)
            // navigate(`/roomTypes/${roomType_id}/`)
        } catch (error) {
            console.log(error)
        }
    }

    //! JSX
    return (
        <>
            <Row>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid black' }}>
                    <button
                        className='submitBtn'
                        style={{ display: addItem }}
                        onClick={(e) => {
                            e.preventDefault()
                            const { floorFinishes } = roomTypes
                            const arrayOfId = []
                            floorFinishes.forEach(object => {
                                arrayOfId.push(object.id)
                            })
                            const addedFloorFinish = [...arrayOfId, spec_id]
                            updateRT(addedFloorFinish)
                        }
                        }
                    >Add</button>
                    <h5>{floorFinishes.spec_code}</h5>
                    <p>{floorFinishes.spec_name}</p>
                </div>
            </Row>
        </>
    )
}