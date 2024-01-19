/* eslint-disable react/prop-types */
import axios from "axios"
import { useOutletContext } from 'react-router-dom'
import { useState, useEffect } from "react"
import IndexRoomTypes from "./IndexRoomTypes"
import UploadDivRT from "./UploadDivRT"

//! Styles
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import Modal from 'react-bootstrap/Modal'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'

export default function PageRoomTypes({ building, display, updateBldg, selection, createRT, addType, handleChangeRoomUploadType }) {
    //! States
    const [searchData, setSearchData] = useState({ roomTypesDataSearch: [] })
    const [roomTypes, setRoomTypes] = useState([])
    const [toDelete, setToDelete] = useState(false)
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const [userData] = useOutletContext()

    //! Effects
    useEffect(() => {
        async function getRoomTypesData() {
            try {
                const res = await axios.get('/api/roomTypes/')
                const sortedData = res.data.sort((a, b) => a.room_code.localeCompare(b.room_code))
                setRoomTypes(sortedData)
            } catch (error) {
                console.log(error)
            }
        }
        getRoomTypesData()
    }, [open, toDelete])

    //! Functions
    async function search(e) {
        try {
            //stopping default behavior of form
            e.preventDefault()
            // Regular expression from input
            const inputValue = e.target.elements.searchField.value
            const pattern = new RegExp(inputValue, 'i')
            // Getting All roomTypes data and filtering it
            const res = await axios.get('/api/roomTypes')
            const rawRoomTypesData = res.data.sort((a, b) => a.room_code.localeCompare(b.room_code))
            const filteredRoomTypesData = rawRoomTypesData.filter(item => pattern.test(item.room_name))
            setSearchData({ roomTypesDataSearch: filteredRoomTypesData })
        } catch (error) {
            console.log(error)
        }
    }

    //! JSX
    return (
        <>
            <div className="filter-bar">
                <form onSubmit={search} >
                    <input
                        type="text"
                        name="searchField"
                        placeholder="Search by name..."
                        className="search"
                    />
                </form>
                <button onClick={handleOpen} style={{ display: display }}>✚</button>
                <Modal
                    size="lg"
                    show={open}
                    onHide={handleClose}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Add new Room Type
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal-container">
                        <UploadDivRT building={building} updateBldg={updateBldg} selection={selection} createRT={createRT} />
                    </Modal.Body>
                </Modal>
            </div>
            {
                searchData.roomTypesDataSearch.length === 0
                    ? (
                        <section className='index-page'>
                            <Container fluid className="container-grid">
                                <FormControl style={{ marginBottom: '2em', display: display }}>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        value={addType}
                                        onChange={handleChangeRoomUploadType}
                                    >
                                        <FormControlLabel value="create" control={<Radio />} label="Add duplicate" />
                                    </RadioGroup>
                                </FormControl>
                                <Row className="items-list">
                                    <h3 className="page-title section-separation" style={{ paddingTop: '0' }}>Template Rooms</h3>
                                    {roomTypes
                                        .filter(building => building.owner === 1)
                                        .map(roomType => (
                                            <IndexRoomTypes key={roomType.id} roomType_id={roomType.id} display={display} selection={selection} crossDisplay={'none'} />
                                        ))}
                                    <h3 className="page-title section-separation" style={{ paddingTop: '0' }}>My Rooms</h3>
                                    {roomTypes
                                        .filter(building => building.owner === userData.id)
                                        .map(roomType => (
                                            <IndexRoomTypes key={roomType.id} roomType_id={roomType.id} display={display} selection={selection} crossDisplay={true} setToDelete={setToDelete} />
                                        ))}
                                </Row>
                            </Container>
                        </section>
                    )
                    : (
                        <section className='index-page'>
                            <Container fluid className="container-grid">
                                <FormControl style={{ marginBottom: '2em', display: display }}>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        value={addType}
                                        onChange={handleChangeRoomUploadType}
                                    >
                                        <FormControlLabel value="create" control={<Radio />} label="Add duplicate" />
                                    </RadioGroup>
                                </FormControl>
                                <Row className="items-list">
                                    <h3 className="page-title section-separation" style={{ paddingTop: '0' }}>Template Rooms</h3>
                                    {searchData.roomTypesDataSearch
                                        .filter(building => building.owner === 1)
                                        .map(roomType => (
                                            <IndexRoomTypes key={roomType.id} roomType_id={roomType.id} display={display} selection={selection} crossDisplay={'none'}/>
                                        ))}
                                    <h3 className="page-title section-separation" style={{ paddingTop: '0' }}>My Rooms</h3>
                                    {searchData.roomTypesDataSearch
                                        .filter(building => building.owner === userData.id)
                                        .map(roomType => (
                                            <IndexRoomTypes key={roomType.id} roomType_id={roomType.id} display={display} selection={selection} crossDisplay={true} setToDelete={setToDelete}/>
                                        ))}
                                </Row>
                            </Container>
                        </section>
                    )
            }
        </>
    )
}