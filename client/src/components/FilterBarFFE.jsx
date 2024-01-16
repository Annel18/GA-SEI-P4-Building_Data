/* eslint-disable react/prop-types */
import axios from "axios"
import { useState, useEffect } from "react"
import IndexFfes from "./IndexFfes"
import UploadDivFFE from "./UploadDivFFE"

//! Styles
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import Modal from 'react-bootstrap/Modal'

export default function FilterBarFFE({ roomType_id, addItem }) {
    //! States
    const [searchData, setSearchData] = useState({ ffesDataSearch: [] })
    const [ffes, setFfes] = useState([])
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    //! Effects
    useEffect(() => {
        async function getFfesData() {
            try {
                const res = await axios.get('/api/ffes')
                const sortedData = res.data.sort((a, b) => a.ffe_code.localeCompare(b.ffe_code))
                setFfes(sortedData)
            } catch (error) {
                console.log(error)
            }
        }
        getFfesData()
    }, [])

    //! Functions
    async function search(e) {
        try {
            //stopping default behavior of form
            e.preventDefault()
            // Regular expression from input
            const inputValue = e.target.elements.searchField.value
            const pattern = new RegExp(inputValue, 'i')
            // Getting All ffes data and filtering it
            const res = await axios.get('/api/ffes')
            const rawFfesData = res.data.sort((a, b) => a.ffe_code.localeCompare(b.ffe_code))
            const filteredFfesData = rawFfesData.filter(item => pattern.test(item.ffe_name))
            setSearchData({ ffesDataSearch: filteredFfesData })
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
                            Add new FFE
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal-container">
                        <UploadDivFFE roomType_id={roomType_id}/>
                    </Modal.Body>
                </Modal>
            </div >
            {
                searchData.ffesDataSearch.length === 0
                    ? (
                        <section className='index-page'>
                            <Container fluid className="container-grid" style={{ padding: '5em' }}>
                                <Row /*className="items-list"*/
                                >
                                    {ffes.map(ffe => (
                                        <IndexFfes ffe_id={ffe.id} key={ffe.id} addItem={addItem} roomType_id={roomType_id} />
                                    ))}
                                </Row>
                            </Container>
                        </section>
                    )
                    : (
                        <section className='index-page'>
                            <Container fluid className="container-grid" style={{ padding: '5em' }}>
                                <Row /*className="items-list"*/>
                                    {searchData.ffesDataSearch.map(ffe => {
                                        <IndexFfes ffe_id={ffe.id} key={ffe.id} addItem={addItem} roomType_id={roomType_id} />
                                    })}
                                </Row>
                            </Container>
                        </section>
                    )
            }
        </>
    )
}