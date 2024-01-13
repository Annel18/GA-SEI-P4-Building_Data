import axios from "axios"
import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
import IndexRoomTypes from "./IndexRoomTypes"

//! Styles
// import Col from "react-bootstrap/esm/Col"
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"

export default function FilterBarRT() {
    //! States
    const [searchData, setSearchData] = useState({ roomTypesDataSearch: [] })
    const [roomTypes, setRoomTypes] = useState([])

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
                searchData.roomTypesDataSearch.length === 0
                    ? (
                        <section className='index-page'>
                            <Container fluid className="container-grid">
                                <Row className="items-list">
                                    {roomTypes.map(roomType => (
                                        <IndexRoomTypes id={roomType.id} key={roomType.id} />
                                    ))}
                                </Row>
                            </Container>
                        </section>
                    )
                    : (
                        <section className='index-page'>
                            <Container fluid className="container-grid">
                                <Row className="items-list">
                                    {searchData.roomTypesDataSearch.map(roomType => (
                                        <IndexRoomTypes id={roomType.id} key={roomType.id} />
                                    ))}
                                </Row>
                            </Container>
                        </section>
                    )
            }
        </>
    )
}