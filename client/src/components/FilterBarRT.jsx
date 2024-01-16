/* eslint-disable react/prop-types */
import axios from "axios"
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

export default function FilterBarRT({ bldg_id, addItem }) {
    //! States
    const [searchData, setSearchData] = useState({ roomTypesDataSearch: [] })
    const [roomTypes, setRoomTypes] = useState([])
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const [value, setValue] = useState('')

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    //! Effects
    useEffect(() => {
        async function getRoomTypesData() {
            try {
                const res = await axios.get('/api/roomTypes')
                const sortedData = res.data.sort((a, b) => a.room_code.localeCompare(b.room_code))
                setRoomTypes(sortedData)
            } catch (error) {
                console.log(error)
            }
        }
        getRoomTypesData()
    }, [])

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
                <button onClick={handleOpen}>✚</button>
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
                        <UploadDivRT bldg_id={bldg_id} />
                    </Modal.Body>
                </Modal>
            </div>
            {
                searchData.roomTypesDataSearch.length === 0
                    ? (
                        <section className='index-page'>
                            <Container fluid className="container-grid">
                                <FormControl style={{ marginBottom: '2em' }}>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        value={value}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel value="add" control={<Radio />} label="Add to Building" />
                                        <FormControlLabel value="create" control={<Radio />} label="Create duplicate" />
                                    </RadioGroup>
                                </FormControl>
                                <Row className="items-list">
                                    {roomTypes.map(roomType => (
                                        <IndexRoomTypes roomType_id={roomType.id} key={roomType.id} addItem={addItem} bldg_id={bldg_id} addType={value} sglRT={roomType}/>
                                    ))}
                                </Row>
                            </Container>
                        </section>
                    )
                    : (
                        <section className='index-page'>
                            <Container fluid className="container-grid">
                            <FormControl style={{ marginBottom: '2em' }}>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        value={value}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel value="add" control={<Radio />} label="Add to Building" />
                                        <FormControlLabel value="create" control={<Radio />} label="Create duplicate" />
                                    </RadioGroup>
                                </FormControl>
                                <Row className="items-list">
                                    {searchData.roomTypesDataSearch.map(roomType => (
                                        <IndexRoomTypes roomType_id={roomType.id} key={roomType.id} addItem={addItem} bldg_id={bldg_id} addType={value} sglRT={roomType}/>
                                    ))}
                                </Row>
                            </Container>
                        </section>
                    )
            }
        </>
    )
}