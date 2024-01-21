/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { getIndFloorFinish } from "../utils/loaders/floorFinishesLoader"

//! Styling 
import Col from 'react-bootstrap/Col'

export default function IndexFloorFinishes({ spec_id, display, updateRoomTypeWithFloorFinish}) {
    //! States
    const [floorFinishes, setfloorFinishes] = useState([])

    useEffect(() => {
        async function floorFinishRetrieve() {
            const floorFinish = await getIndFloorFinish(spec_id)
            setfloorFinishes(floorFinish)
        }
        floorFinishRetrieve()
    }, [spec_id])

    //! JSX
    return (
        <>
            <Col className='roomType-list'
                key={spec_id}
                >
                    <p>{floorFinishes.spec_code}</p>
                    <p>{floorFinishes.spec_name}</p>
                    <button
                        className='submitBtn'
                        style={{ display: display }}
                        onClick={(e) => {
                            e.preventDefault()
                            const addedFloorFinish = spec_id
                            updateRoomTypeWithFloorFinish(addedFloorFinish)
                        }
                        }
                    >Add</button>
            </Col>
        </>
    )
}