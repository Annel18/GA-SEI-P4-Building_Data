/* eslint-disable react/prop-types */
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"

export default function NavTop({ userData, setUserData }) {
    const navigate = useNavigate()

    //! States
    const [redirection, setRedirection] = useState('')
    const [accountDrop, setAccoutDrop] = useState('')

    const handleChangeAccount = (event) => {
        setAccoutDrop(event.target.value)
        setRedirection('')
    }

    const handleChange = (event) => {
        setRedirection(event.target.value)
        setAccoutDrop('')
    }

    //! Functions
    function logOut() {
        localStorage.clear()
        sessionStorage.clear()
        setAccoutDrop('')
        setUserData('')
        navigate('/')
    }

    return (
        <header>
            <nav>
                <Link className="nav-button" to="/" onClick={handleChange}>Home</Link>
                <Link className="nav-button" to="/resources/" onClick={handleChange}>Resources</Link>
                <Link className="nav-button" to="/about/" onClick={handleChange}>About</Link>
                {!userData ? (
                    <>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 160 }}>
                            <InputLabel /*id="demo-simple-select-autowidth-label"*/ style={{ fontFamily: 'Termina Test' }}>Register / Sign in</InputLabel>
                            <Select
                                /*labelId="demo-simple-select-autowidth-label"*/
                                /*id="demo-simple-select-autowidth"*/
                                value={accountDrop}
                                onChange={handleChangeAccount}
                                autoWidth
                                label="register"
                                placeholder="Register/Sign in"
                            >
                                {/* <MenuItem value="">
                                    <em>Settings</em>
                                </MenuItem> */}
                                <MenuItem as={Link} className="nav-button" to="/register/" value={"register"}>Register</MenuItem>
                                <MenuItem as={Link} className="nav-button" to="/login/" value={"login"}>Login in your account</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                ) : (
                    <>
                        <FormControl sx={{ m: 1, minWidth: 180 }}>
                            <InputLabel style={{ fontFamily: 'Termina Test' }} /*id="demo-simple-select-autowidth-label"*/>DATA Collections</InputLabel>
                            <Select
                                className="nav-button"
                                /*labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"*/
                                value={redirection}
                                onChange={handleChange}
                                autoWidth
                                label="DATA Collections"
                                style={{ fontFamily: 'Termina Test' }}
                            >
                                {/* <MenuItem className="nav-button" value="">
                                    <em>DATA Collections</em>
                                </MenuItem> */}
                                <MenuItem as={Link} className="nav-button" to="/roomTypes/" value={"roomTypes"}>Room Types</MenuItem>
                                <MenuItem as={Link} className="nav-button" to="/ffes/" value={"ffes"}>FFE</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 110 }}>
                            <InputLabel  /*id="demo-simple-select-autowidth-label"*/ style={{ fontFamily: 'Termina Test' }}>Account</InputLabel>
                            <Select
                                className="nav-button"
                                /*labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"*/
                                value={accountDrop}
                                onChange={handleChangeAccount}
                                autoWidth
                                label="user"
                                style={{ fontFamily: 'Termina Test' }}
                            >
                                {/* <MenuItem value=""><em>Settings</em></MenuItem> */}
                                <MenuItem as={Link} className="nav-button" to="/profile/" value={"profile"}>Profile</MenuItem>
                                <MenuItem className="nav-button" value={"logout"} onClick={logOut}>Sign out</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                )}
            </nav>
        </header>
    )
}