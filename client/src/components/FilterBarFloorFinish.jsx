/* eslint-disable react/prop-types */
import axios from "axios"
import { useState, useEffect } from "react"

import IndexFloorFinishes from "./IndexFloorFinishes"
import UploadDivFloorFinish from "./UploadDivFloorFinish"

//! Styles
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import Modal from 'react-bootstrap/Modal'

export default function FilterBarFloorFinish({ roomType_id, addItem }) {
    //! States
    const [searchData, setSearchData] = useState({ dataSearch: [] })
    const [floorFinishes, setFloorFinishes] = useState([])
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    //! Effects
    useEffect(() => {
        async function getFloorFinishesData() {
            try {
                const res = await axios.get('/api/floorFinishes')
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
        <>
            <div className="filter-bar">
                <form onSubmit={search} className="filter-seach">
                    <input
                        type="text"
                        name="searchField"
                        placeholder="Search by name..."
                        className="search"
                    // onChange={(e) => setSearch(e.target.value)}
                    // value={search} 
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
                        <UploadDivFloorFinish roomType_id={roomType_id}/>
                    </Modal.Body>
                </Modal>
            </div >
            {
                searchData.dataSearch.length === 0
                    ? (
                        <section className='index-page'>
                            <Container fluid className="container-grid" style={{ padding: '5em' }}>
                                <Row /*className="items-list"*/
                                >
                                    {floorFinishes.map(floorFinish => (
                                        <IndexFloorFinishes spec_id={floorFinish.id} key={floorFinish.id} addItem={addItem} roomType_id={roomType_id} />
                                    ))}
                                </Row>
                            </Container>
                        </section>
                    )
                    : (
                        <section className='index-page'>
                            <Container fluid className="container-grid" style={{ padding: '5em' }}>
                                <Row /*className="items-list"*/>
                                    {searchData.specsDataSearch.map(floorFinish => {
                                        <IndexFloorFinishes spec_id={floorFinish.id} key={floorFinish.id} addItem={addItem} roomType_id={roomType_id} />
                                    })}
                                </Row>
                            </Container>
                        </section>
                    )
            }
        </>
    )
}