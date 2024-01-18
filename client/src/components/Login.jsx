/* eslint-disable no-unused-vars */
import { useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import axios from "axios"
import { FormLabel } from '@mui/material'

export default function Login() {

    //! State
    const [userData, setUserData] = useOutletContext()
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()



    function authenticate(e) {
        e.preventDefault()
        // Defining variables for validation
        const formData = new FormData(e.target)
        const parsedData = Object.fromEntries(formData.entries())
        const formKeys = []
        let str = ''

        // validating every field has been fulfilled
        for (const [key, value] of Object.entries(parsedData)) {
            if (!value) formKeys.push(key)
        }
        if (formKeys.length > 0) {
            // If empty values were found we make a string with them to add to an error message
            formKeys.map(val => str = `${str}${val} ,`)
            str = str.substring(0, str.length - 2)
            return setErrorMessage('You need to fill in: \n' + str)
        } else {
            setErrorMessage('')
        }
        submitData(parsedData)
    }

    async function submitData(parsedData) {
        try {
            // Get logged in
            const res = await axios.post('/api/auth/login/', parsedData)
            console.log(res)
            // Save data
            const stagedData = res.data
            setUserData(stagedData)
            // Go to homepage
            navigate("/buildings/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="fieldset">
            {/* If user doesen't fill one or more of the fields a warning appears */}
            {errorMessage && <section className="errorMessage"><p>{errorMessage}</p></section>}
            <label>Sign-in if you already have an account</label>
            <form action="#" onSubmit={authenticate} className="form-container">
                <label hidden htmlFor="username">username</label>
                <input type="text" name="username" placeholder="Username" autoComplete="off" />
                <label hidden htmlFor="password">password</label>
                <input type="password" name="password" placeholder="Password" autoComplete="off"/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}