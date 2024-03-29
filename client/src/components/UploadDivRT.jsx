/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'

export default function UploadDivRT({ selection }) {
    // Get User ID
    const [userData] = useOutletContext()
    // const navigate = useNavigate()
    const [uploadImg, setUploadImg] = useState('')
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
        json = { ...json, room_img: uploadImg }
        submit(json)
    }

    async function submit(json) {
        try {
            const res = await axios.post('/api/roomTypes/', json, {
                headers: {
                    Authorization: `Bearer ${userData.access}`,
                },
            })
            const roomTypeId = res.data.id
            selection(roomTypeId)
        } catch (error) {
            console.log(error)
        }
    }


    // Cloudinary Upload
    async function handleImageUpload(e) {
        const preset = import.meta.env.VITE_UPLOAD_PRESET
        const file = e.target.files[0]
        const endPoint = import.meta.env.VITE_UPLOAD_URL
        const data = new FormData()
        data.append('file', file)
        data.append('upload_preset', preset)
        const { data: { secure_url } } = await axios.post(endPoint, data)
        setUploadImg(secure_url)
    }

    // Adds image ready for form upload
    useEffect(() => {
        inputs.room_img = uploadImg
    }, [uploadImg])


    return (
        <form onSubmit={handleSubmit} method="POST">
            <label hidden htmlFor="room_code">room_code</label>
            <input type="text" name="room_code" placeholder='Code of Room Type' value={inputs.room_code || ''} onChange={handleChange} required />
            <label hidden htmlFor="room_name">room_name</label>
            <input type="text" name="room_name" placeholder='Name of Room Type' value={inputs.room_name || ''} onChange={handleChange} required />
            <label hidden htmlFor="area">Area</label>
            <input type="number" name="area" placeholder='Area in m2' value={inputs.area || ''} onChange={handleChange} required />
            <label hidden htmlFor="height">Height</label>
            <input type="number" name="height" placeholder='Height in mm' value={inputs.height || ''} onChange={handleChange} required />
            <input type='file' className='uploadField' name='room_img' onChange={handleImageUpload} />
            <button type="submit" className="submitBtn">Upload RoomType</button>
        </form>
    )
}
