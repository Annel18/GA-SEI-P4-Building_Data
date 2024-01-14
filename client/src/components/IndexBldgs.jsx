/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { getIndBuilding } from "../utils/loaders/buildingsLoader"

//! Styling 

import Col from 'react-bootstrap/Col'


export default function IndexBuildings({ id }) {
    //! States
    const [buildings, setBuildings] = useState([])

    useEffect(() => {
        async function buildingsRetrieve() {
            const buildings = await getIndBuilding(id)
            setBuildings(buildings)
        }
        buildingsRetrieve()
    }, [id])

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
                to={`/buildings/${buildings.id}`}
            >
                <div className="rails" style={{ height: '200px', paddingBottom: '3em' }}>
                    <div
                        className="thumbnail"
                        to={`/buildings/${buildings.id}`}
                        style={{ backgroundImage: `url(${buildings.building_img})` }}>
                    </div>
                    <div>
                        <h5>{buildings.building_code}</h5>
                        <p>{buildings.building_name}</p>
                    </div>
                </div>
            </Col>
        </>
    )
}