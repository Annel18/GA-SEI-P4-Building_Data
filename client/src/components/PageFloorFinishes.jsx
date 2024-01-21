/* eslint-disable react/prop-types */
import axios from "axios"
import { useState, useEffect } from "react"
import { useOutletContext } from "react-router-dom"

import IndexFloorFinishes from "./IndexFloorFinishes"
import UploadDivFloorFinish from "./UploadDivFloorFinish"

//! Styles
import Row from "react-bootstrap/esm/Row"
import Modal from 'react-bootstrap/Modal'

export default function PageFloorFinishes({ roomType_id, display, updateRoomTypeWithFloorFinish }) {
    //! States
    const [searchData, setSearchData] = useState({ dataSearch: [] })
    const [floorFinishes, setFloorFinishes] = useState([])
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const [userData] = useOutletContext()
    const isUserLoggedIn = userData && userData.access

    //! Effects
    useEffect(() => {
        async function getFloorFinishesData() {
            try {
                const res = await axios.get('/api/floorFinishes/')
                const sortedData = res.data.sort((a, b) => a.spec_code.localeCompare(b.spec_code))
                setFloorFinishes(sortedData)
            } catch (error) {
                console.log(error)
            }
        }
        getFloorFinishesData()
    }, [])

    //! Functions
    async function search(e) {
        try {
            //stopping default behavior of form
            e.preventDefault()
            // Regular expression from input
            const inputValue = e.target.elements.searchField.value
            const pattern = new RegExp(inputValue, 'i')
            // Getting All floor finishes data and filtering it
            const res = await axios.get('/api/floorFinishes/')
            const rawData = res.data.sort((a, b) => a.spec_code.localeCompare(b.spec_code))
            const filteredData = rawData.filter(item => pattern.test(item.spec_name))
            setSearchData({ dataSearch: filteredData })
        } catch (error) {
            console.log(error)
        }
    }

    //! JSX
    return (
        <>{isUserLoggedIn ?
            <>
                <div className="filter-bar">
                    <form onSubmit={search} className="filter-seach">
                        <input
                            type="text"
                            name="searchField"
                            placeholder="Search by name..."
                            className="search"
                        />
                    </form>
                    <button onClick={handleOpen}>✚</button>
                    <Modal
                        size="lg"
                        show={open}
                        onHide={handleClose}
                        aria-labelledby="example-modal-sizes-title-lg"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-lg">
                                Add new Floor Finish
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="modal-container">
                            <UploadDivFloorFinish roomType_id={roomType_id} />
                        </Modal.Body>
                    </Modal>
                </div >
                {
                    searchData.dataSearch.length === 0
                        ? (
                            <section className='index-page'>
                                <Row fluid className="container-grid" style={{ padding: '5em' }}>
                                    {floorFinishes
                                        .filter(roomType => roomType.owner === userData.id)
                                        .map(floorFinish => (
                                            <IndexFloorFinishes spec_id={floorFinish.id} key={floorFinish.id} display={display} roomType_id={roomType_id} updateRoomTypeWithFloorFinish={updateRoomTypeWithFloorFinish} />
                                        ))}
                                </Row>
                            </section>
                        )
                        : (
                            <section className='index-page'>
                                <Row fluid className="container-grid" style={{ padding: '5em' }}>
                                    {searchData.specsDataSearch
                                        .filter(roomType => roomType.owner === userData.id)
                                        .map(floorFinish => {
                                            <IndexFloorFinishes spec_id={floorFinish.id} key={floorFinish.id} display={display} roomType_id={roomType_id} updateRoomTypeWithFloorFinish={updateRoomTypeWithFloorFinish} />
                                        })}
                                </Row>
                            </section>
                        )
                }
            </>
            :
            <h1>404 PAGE NOT FOUND</h1>}
        </>
    )
}