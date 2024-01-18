import axios from "axios"
import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
import IndexBuildings from "./IndexBldgs"
//! Styles
// import Col from "react-bootstrap/esm/Col"
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import Modal from 'react-bootstrap/Modal'
import UploadDivBldg from "./UploadDivBldg"


export default function PageBuildings() {
    //! States
    const [searchData, setSearchData] = useState({ buildingsDataSearch: [] })
    const [buildings, setBuildings] = useState([])
    const [toDelete, setToDelete] = useState(false)
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    //! Effects
    useEffect(() => {
        async function getBuildingsData() {
            try {
                const res = await axios.get('/api/buildings/')
                const sortedData = res.data.sort((a, b) => a.bldg_code.localeCompare(b.bldg_code))
                setBuildings(sortedData)
            } catch (error) {
                console.log(error)
            }
        }
        getBuildingsData()
    }, [open, toDelete])

    //! Functions
    async function search(e) {
        try {
            //stopping default behavior of form
            e.preventDefault()
            // Regular expression from input
            const inputValue = e.target.elements.searchField.value
            const pattern = new RegExp(inputValue, 'i')
            // Getting All buildings data and filtering it
            const res = await axios.get('/api/buildings')
            const rawBuildingsData = res.data.sort((a, b) => a.bldg_code.localeCompare(b.bldg_code))
            const filteredBuildingsData = rawBuildingsData.filter(item => pattern.test(item.bldg_name))
            setSearchData({ buildingsDataSearch: filteredBuildingsData })
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
                        // className="filter-seach"
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
                            Add new Building
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal-container">
                        <UploadDivBldg />
                    </Modal.Body>
                </Modal>
            </div>
            {
                searchData.buildingsDataSearch.length === 0
                    ? (
                        <section className='index-page'>
                            <Container fluid className="container-grid">
                                <Row className="items-list">
                                    {buildings.map(building => (
                                        <IndexBuildings id={building.id} key={building.id} crossDisplay={true} setToDelete={setToDelete}/>
                                    ))}
                                </Row>
                            </Container>
                        </section>
                    )
                    : (
                        <section className='index-page'>
                            <Container fluid className="container-grid">
                                <Row className="items-list">
                                    {searchData.buildingsDataSearch.map(building => (
                                        <IndexBuildings id={building.id} key={building.id} crossDisplay={true} setToDelete={setToDelete}/>
                                    ))}
                                </Row>
                            </Container>  
                        </section>
                    )
            }
        </>
    )
}