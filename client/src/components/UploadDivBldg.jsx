/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

export default function UploadDivBldg() {
    // Get User ID
    const userData = useOutletContext()
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
        let json = Object.fromEntries(formData.entries());
        json = { ...json, bldg_img: uploadImg }
        submit(json)
    }

    async function submit(json) {
        try {
            await axios.post('/api/buildings/', json, {
                headers: {
                    Authorization: `Bearer ${userData[0].access}`,
                },
            })
            // const artID = res.data._id
            // push to artist collection
            // const artistCollection = [...personal_collection, artID]
            // navigate(`/buildings/${res.data.id}`)
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
        inputs.bldg_img = uploadImg
    }, [uploadImg])


    return (
        <>
            <form onSubmit={handleSubmit} method="POST">
                <label hidden htmlFor="bldg_code">bldg_code</label>
                <input type="text" name="bldg_code" placeholder='Building Code' value={inputs.bldg_code || ''} onChange={handleChange} required />
                <label hidden htmlFor="bldg_name">bldg_name</label>
                <input type="text" name="bldg_name" placeholder='Building Name' value={inputs.bldg_name || ''} onChange={handleChange} required />
                <label hidden htmlFor="bldg_description">bldg_description</label>
                <input type="text" name="bldg_description" placeholder='Description' value={inputs.bldg_description || ''} onChange={handleChange} required />
                <input type='file' className='uploadField' name='bldg_img' onChange={handleImageUpload} />
                <button type='submit'>Upload Building</button>
                {/* <input type="submit" className="submitBtn" value="Upload Building" /> */}
            </form>
        </>
    )
}
