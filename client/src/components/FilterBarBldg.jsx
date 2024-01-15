import axios from "axios"
import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
import IndexBuildings from "./IndexBldgs"
// import NavBarTwo from "./NavBarTwo"
import FilterBarRT from "./FilterBarRT"
//! Styles
// import Col from "react-bootstrap/esm/Col"
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import Modal from 'react-bootstrap/Modal'


export default function FilterBarBldg() {
    //! States
    const [searchData, setSearchData] = useState({ buildingsDataSearch: [] })
    const [buildings, setBuildings] = useState([])
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    //! Effects
    useEffect(() => {
        async function getBuildingsData() {
            try {
                const res = await axios.get('/api/buildings')
                const sortedData = res.data.sort((a, b) => a.bldg_code.localeCompare(b.bldg_code))
                setBuildings(sortedData)
            } catch (error) {
                console.log(error)
            }
        }
        getBuildingsData()
    }, [])

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
            {/* <nav className='navBarTwo'>
                <Link className="nav-button">Projects</Link>
            </nav> */}
            <div className="filter-bar">
                <form onSubmit={search} >
                    <input
                        // className="filter-seach"
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
                            Select Room Type to add to Building or create new Room Type
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal-container">
                        <FilterBarRT />
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
                                        <IndexBuildings id={building.id} key={building.id} />
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
                                        <IndexBuildings id={building.id} key={building.id} />
                                    ))}
                                </Row>
                            </Container>
                        </section>
                    )
            }
        </>
    )
}