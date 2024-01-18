/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

import { useState } from 'react'

export default function UploadEditRT({ edit }) {
    const [inputs, setInputs] = useState({})

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        let json = Object.fromEntries(formData.entries())
        edit(json)
    }

    return (
        <>
            {/* <section className='index-page'> */}
            <form onSubmit={handleSubmit} method="POST">
                <label hidden htmlFor="room_code">room_code</label>
                <input type="text" name="room_code" placeholder='Code of Room Type' value={inputs.room_code || ''} onChange={handleChange} required />
                <label hidden htmlFor="room_name">room_name</label>
                <input type="text" name="room_name" placeholder='Name of Room Type' value={inputs.room_name || ''} onChange={handleChange} required />
                <button type="submit" className="submitBtn">Upload Changes</button>
            </form>
            {/* </section> */}
        </>
    )
}
