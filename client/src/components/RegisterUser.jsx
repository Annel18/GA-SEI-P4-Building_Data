import { useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import axios from "axios"

import { FormLabel } from '@mui/material'

export default function RegisterUser() {
    // State
    const [errorMessage, setErrorMessage] = useState('')
    // navigation
    const navigate = useNavigate()
    // State from App
    const data = useOutletContext()
    const setUserData = data[1]

    async function register(parsedData) {
        try {
            // Get registered in
            const res = await axios.post('/api/auth/register/', parsedData)
            // Save data
            setUserData(res.data)
            // Go to homepage
            login(parsedData)

        } catch (error) {
            console.log(error)
        }
    }


    async function login(parsedData) {
        try {
            // Get logged in
            const res = await axios.post('/api/auth/login/', parsedData)
            // Save data
            const stagedData = res.data
            setUserData(stagedData)
            // Go to homepage
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }


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
            return setErrorMessage('Seems you have missed some fields: \n' + str)
        } else {
            setErrorMessage('')
        }
        // Client side authentication
        if (parsedData.password !== parsedData.password_confirmation) {
            return setErrorMessage('Password confirmation must match password')
        }
        parsedData.usertype = parsedData.usertype === 'artist' ? 1 : 2
        register(parsedData)
    }

    return (
        <fieldset>
            {/* If user doesen't fill one or more of the fields a warning appears */}
            {errorMessage && <section className="errorMessage"><p>{errorMessage}</p></section>}
            <FormLabel>Register</FormLabel>
            <form action="#" onSubmit={authenticate}>
                <input type="text" name="name" placeholder="First and Last Name *" />
                <input type="text" name="username" placeholder="Username *" />
                <input type="text" name="email" placeholder="Email *" />
                <input type="password" name="password" placeholder="Password *" />
                <input type="password" name="password_confirmation" placeholder="Confirm Password *" />
                <button type="submit">Join!</button>
            </form>
        </fieldset>
    )
}