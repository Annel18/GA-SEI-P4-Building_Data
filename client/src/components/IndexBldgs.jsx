/* eslint-disable react/prop-types */
import { Link, useOutletContext } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { getIndBuilding } from "../utils/loaders/buildingsLoader"

//! Styling 

import Col from 'react-bootstrap/Col'
import axios from 'axios'


export default function IndexBuildings({ id, crossDisplay }) {
    //! States
    const [buildings, setBuildings] = useState([])
    const userData = useOutletContext()

    useEffect(() => {
        async function buildingsRetrieve() {
            const building = await getIndBuilding(id)
            setBuildings(building)
        }
        buildingsRetrieve()
    }, [id])

    async function deleteBldg(e) {
        e.preventDefault()
        try {
            const res = await axios.delete(`/api/buildings/${id}/`, {
                headers: {
                    Authorization: `Bearer ${userData[0].access}`
                }
            })
            setBuildings(res.data)
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
                // xs={12}
                // s={6}
                // md={4}
                // lg={3}
                // xl={2}
                to={`/buildings/${buildings.id}`}
            >
                <div className="rails" style={{ height: '200px', paddingBottom: '3em' }}>
                    <div
                        className="thumbnail"
                        to={`/buildings/${buildings.id}`}
                        style={{ backgroundImage: `url(${buildings.bldg_img})` }}>
                        <h3
                            style={{ display: crossDisplay }}
                            onClick={deleteBldg}
                        >❌</h3>
                    </div>
                    <div>
                        <h5>{buildings.bldg_code}</h5>
                        <p>{buildings.bldg_name}</p>
                    </div>
                </div>
            </Col>
        </>
    )
}