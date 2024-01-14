import axios from "axios"
import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
import IndexBuildings from "./IndexBldgs"

//! Styles
// import Col from "react-bootstrap/esm/Col"
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"

export default function FilterBarBldg() {
    //! States
    const [searchData, setSearchData] = useState({ buildingsDataSearch: [] })
    const [buildings, setBuildings] = useState([])

    //! Effects
    useEffect(() => {
        async function getBuildingsData() {
            try {
                const res = await axios.get('/api/buildings')
                const sortedData = res.data.sort((a, b) => a.building_code.localeCompare(b.building_code))
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
            const rawBuildingsData = res.data.sort((a, b) => a.building_code.localeCompare(b.building_code))
            const filteredBuildingsData = rawBuildingsData.filter(item => pattern.test(item.building_name))
            setSearchData({ buildingsDataSearch: filteredBuildingsData })
        } catch (error) {
            console.log(error)
        }
    }

    //! JSX
    return (
        <>
            <form onSubmit={search} className="admin-search">
                <input
                    type="text"
                    name="searchField"
                    placeholder="Search by name..."
                    className="search"
                // onChange={(e) => setSearch(e.target.value)}
                // value={search} 
                />
            </form>
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