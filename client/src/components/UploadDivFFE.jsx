/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

export default function UploadDivFFE() {
    // Get User ID
    const userData = useOutletContext()
    // const navigate = useNavigate()
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
            const res = await axios.post('/api/ffes/', json, {
                headers: {
                    Authorization: `Bearer ${userData[0].access}`,
                },
            })
            const roomTypeId = res.data._id
            console.log(roomTypeId)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            {/* <section className='index-page'> */}
            <form onSubmit={handleSubmit} method="POST">
                <label hidden htmlFor="ffe_code">ffe_code</label>
                <input type="text" name="ffe_code" placeholder='FFE code' value={inputs.ffe_code || ''} onChange={handleChange} required />
                <label hidden htmlFor="ffe_name">ffe_name</label>
                <input type="text" name="ffe_name" placeholder='FFE name' value={inputs.ffe_name || ''} onChange={handleChange} required />
                <label hidden htmlFor="ffe_group">ffe_group</label>
                <input type="text" name="ffe_group" placeholder='FFE group' value={inputs.ffe_group || ''} onChange={handleChange} required />
                <input type="submit" className="submitBtn" value="Upload FFE" disabled={false} />
            </form>
            {/* </section> */}
        </>
    )
}
