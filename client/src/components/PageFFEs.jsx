/* eslint-disable react/prop-types */
import axios from "axios"
import { useState, useEffect } from "react"
import { useOutletContext } from "react-router-dom"

import IndexFfes from "./IndexFfes"
import UploadDivFFE from "./UploadDivFFE"
//! Styles
import Row from "react-bootstrap/esm/Container"
import Modal from 'react-bootstrap/Modal'

export default function PageFFEs({ roomType_id, display, updateRT }) {
    //! States
    const [searchData, setSearchData] = useState({ ffesDataSearch: [] })
    const [ffes, setFfes] = useState([])
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const [userData] = useOutletContext()
    const isUserLoggedIn = userData && userData.access



    //! Effects
    useEffect(() => {
        async function getFfesData() {
            try {
                const res = await axios.get('/api/ffes/')
                const sortedData = res.data.sort((a, b) => a.ffe_code.localeCompare(b.ffe_code))
                setFfes(sortedData)
            } catch (error) {
                console.log(error)
            }
        }
        getFfesData()
    }, [open])

    //! Functions
    async function search(e) {
        try {
            //stopping default behavior of form
            e.preventDefault()
            // Regular expression from input
            const inputValue = e.target.elements.searchField.value
            const pattern = new RegExp(inputValue, 'i')
            // Getting All ffes data and filtering it
            const res = await axios.get('/api/ffes/')
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
            {isUserLoggedIn ?
                <>
                    <div className="filter-bar">
                        <form onSubmit={search}>
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
                                    Add new FFE
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="modal-container">
                                <UploadDivFFE roomType_id={roomType_id} updateRT={updateRT} />
                            </Modal.Body>
                        </Modal>
                    </div >
                    {
                        searchData.ffesDataSearch.length === 0
                            ? (
                                <section className='index-page'>
                                    <Row fluid className="container-grid">
                                        <div className='ffe-list'><h5>Code</h5><h5>Name</h5><h5>GROUP</h5><h5 style={{ display: display }}>add</h5></div>
                                        {ffes.filter(ffe => ffe.owner === userData.id).length > 0 && (
                                            <h3 className="page-title section-separation" style={{ paddingTop: '0' }}>My FFEs</h3>
                                        )}
                                        {ffes
                                            .filter(roomType => roomType.owner === userData.id)
                                            .map(ffe => (
                                                <IndexFfes ffe_id={ffe.id} key={ffe.id} roomType_id={roomType_id} updateRT={updateRT} display={display} />
                                            ))}
                                        <h3 className="page-title section-separation" style={{ paddingTop: '0' }}>Template FFEs</h3>
                                        {ffes
                                            .filter(ffe => ffe.owner === 1)
                                            .map(ffe => (
                                                <IndexFfes ffe_id={ffe.id} key={ffe.id} roomType_id={roomType_id} updateRT={updateRT} display={display} crossDisplay={'none'} />
                                            ))}
                                    </Row>
                                </section>
                            )
                            : (
                                <section className='index-page'>
                                    <Row fluid className="container-grid">
                                        <div className='ffe-list'><h5>Code</h5><h5>Name</h5><h5>GROUP</h5><h5 style={{ display: display }}>add</h5></div>
                                        {ffes.filter(ffe => ffe.owner === userData.id).length > 0 && (
                                            <h3 className="page-title section-separation" style={{ paddingTop: '0' }}>My FFEs</h3>
                                        )}
                                        {searchData.ffesDataSearch
                                            .filter(roomType => roomType.owner === userData.id)
                                            .map(ffe => (
                                                <IndexFfes ffe_id={ffe.id} key={ffe.id} roomType_id={roomType_id} updateRT={updateRT} display={display} />
                                            ))}
                                        <h3 className="page-title section-separation" style={{ paddingTop: '0' }}>Template FFEs</h3>
                                        {searchData.ffesDataSearch
                                            .filter(ffe => ffe.owner === 1)
                                            .map(ffe => (
                                                <IndexFfes ffe_id={ffe.id} key={ffe.id} roomType_id={roomType_id} updateRT={updateRT} display={display} crossDisplay={'none'} />
                                            ))}
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