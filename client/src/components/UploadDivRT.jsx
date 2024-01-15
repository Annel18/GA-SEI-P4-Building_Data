/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function UploadDivRT() {
    // Get User ID
    const userData = useOutletContext()
    const navigate = useNavigate()
    const [uploadImg, setUploadImg] = useState('')
    const [inputs, setInputs] = useState({})

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setInputs(values => ({ ...values, [name]: value }))
    }

    // Disable button unless completed forms
    const keysArray = Object.keys(inputs)
    const count = keysArray
    const roomUploadField = document.querySelector('.roomUploadField')
    const submitBtn = document.querySelector('.submitBtn')
    if ((count.length === 5) && !roomUploadField.value !== true) {
        submitBtn.disabled = false
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        let json = Object.fromEntries(formData.entries());
        json = { ...json, room_img: uploadImg }
        submit(json)
    }

    async function submit(json) {
        try {
            const res = await axios.post('/api/roomTypes', json, {
                headers: {
                    Authorization: `Bearer ${userData.access}`,
                },
            })
            // const artID = res.data._id
            // push to artist collection
            // const artistCollection = [...personal_collection, artID]
            navigate(`/roomTypes/${res.data._id}`)
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
        <>
            {/* <section className='index-page'> */}
                        <form onSubmit={handleSubmit} method="POST">
                            <label hidden htmlFor="room_code">room_code</label>
                            <input type="text" name="room_code" placeholder='Code of Room Type' value={inputs.room_code || ''} onChange={handleChange} required />
                            <label hidden htmlFor="room_name">room_name</label>
                            <input type="text" name="room_name" placeholder='Name of Room Type' value={inputs.room_name || ''} onChange={handleChange} required />
                            <label hidden htmlFor="area">Width</label>
                            <input type="number" name="area" placeholder='Area in m2' value={inputs.area || ''} onChange={handleChange} required />
                            <label hidden htmlFor="height">Height</label>
                            <input type="number" name="height" placeholder='Height in mm' value={inputs.height || ''} onChange={handleChange} required />
                            <input type='file' className='roomUploadField' name='room_img' onChange={handleImageUpload} />
                            <input type="submit" className="submitBtn" value="Upload RoomType" disabled={true} />
                        </form>
            {/* </section> */}
        </>
    )
}
