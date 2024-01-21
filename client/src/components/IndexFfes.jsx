/* eslint-disable react/prop-types */
import axios from 'axios'
import { useOutletContext } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getIndFfe } from "../utils/loaders/ffesLoader"

//! Styling 
import Col from 'react-bootstrap/Col'

export default function IndexFfes({ ffe_id, updateRT, display, crossDisplay, setToDelete }) {
    //! States
    const [ffes, setFfes] = useState([])
    const [userData] = useOutletContext()

    useEffect(() => {
        async function ffeRetrieve() {
            const ffe = await getIndFfe(ffe_id)
            setFfes(ffe)
        }
        ffeRetrieve()
    }, [ffe_id])

    async function deleteFFE(e) {
        e.preventDefault()
        try {
            const res = await axios.delete(`/api/ffes/${ffe_id}/`, {
                headers: {
                    Authorization: `Bearer ${userData.access}`
                }
            })
            setFfes(res.data)
            setToDelete(true)
        } catch (error) {
            console.log(error)
        }
    }

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
                <button
                    className='submitBtn'
                    style={{ display: crossDisplay }}
                    onClick={deleteFFE}
                >╳</button>
            </Col>
            {/* </div> */}
            {/* </div> */}
        </>
    )
}