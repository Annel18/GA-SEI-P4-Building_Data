/* eslint-disable react/prop-types */
import axios from 'axios'
import { Link, useOutletContext } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getIndBuilding } from "../utils/loaders/buildingsLoader"

//! Styling 
import Col from 'react-bootstrap/Col'


export default function IndexBuildings({ id, crossDisplay, setToDelete }) {
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
                as={Link}
                to={`/buildings/${buildings.id}`}
                key={buildings.id}
                xs={12}
                s={8}
                md={6}
                lg={4}
                xl={2}
            >
                <div className="rails">
                    {!buildings.bldg_img
                        ?
                        <div
                            className="thumbnail imagePlaceHolder"
                            to={`/buildings/${buildings.id}`}>
                            <h3
                                style={{ display: crossDisplay }}
                                onClick={deleteBldg}
                            >╳</h3>
                        </div>
                        :
                        <div
                            className="thumbnail"
                            to={`/buildings/${buildings.id}`}
                            style={{ backgroundImage: `url(${buildings.bldg_img})` }}>
                            <h3
                                style={{ display: crossDisplay }}
                                onClick={deleteBldg}
                            >╳</h3>
                        </div>
                    }
                    <div>
                        <h5>{buildings.bldg_code}</h5>
                        <p>{buildings.bldg_name}</p>
                    </div>
                </div>
            </Col>
        </>
    )
}