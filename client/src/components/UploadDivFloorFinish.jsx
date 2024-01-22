/* eslint-disable react/prop-types */
import axios from 'axios'
import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'

export default function UploadDivFloorFinish({ updateRoomTypeWithFloorFinish }) {
    // Get User ID
    const userData = useOutletContext()
    const [inputs, setInputs] = useState({})

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        let json = Object.fromEntries(formData.entries());
        submit(json)
    }

    async function submit(json) {
        try {
            const res = await axios.post('/api/floorFinishes/', json, {
                headers: {
                    Authorization: `Bearer ${userData[0].access}`,
                },
            })
            const flooringFinishID = res.data.id
            updateRoomTypeWithFloorFinish(flooringFinishID)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            {/* <section className='index-page'> */}
            <form onSubmit={handleSubmit} method="POST">
                <label hidden htmlFor="spec_code">spec_code</label>
                <input type="text" name="spec_code" placeholder='Spec code' value={inputs.spec_code || ''} onChange={handleChange} required />
                <label hidden htmlFor="spec_name">spec_name</label>
                <input type="text" name="spec_name" placeholder='Spec name' value={inputs.spec_name || ''} onChange={handleChange} required />
                <button type="submit" className="submitBtn">Upload Floor Finishes Specifications</button>
            </form>
            {/* </section> */}
        </>
    )
}
