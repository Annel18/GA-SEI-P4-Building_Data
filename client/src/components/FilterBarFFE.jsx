import axios from "axios"
import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
import IndexFfes from "./IndexFfes"

//! Styles
// import Col from "react-bootstrap/esm/Col"
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"

export default function FilterBarFFE() {
    //! States
    const [searchData, setSearchData] = useState({ ffesDataSearch: [] })
    const [ffes, setFfes] = useState([])

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
            {
                searchData.ffesDataSearch.length === 0
                    ? (
                        <section className='index-page'>
                            <Container fluid className="container-grid" style={{ padding: '5em' }}>
                                <Row /*className="items-list"*/
                                >
                                    {ffes.map(ffe => (
                                        <IndexFfes id={ffe.id} key={ffe.id} />
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
                                        <IndexFfes id={ffe.id} key={ffe.id} />
                                    })}
                                </Row>
                            </Container>
                        </section>
                    )
            }
        </>
    )
}