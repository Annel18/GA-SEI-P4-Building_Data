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

    const handleChange = (event) => {
        setRedirection(event.target.value);
    }

    //! Functions
    function logOut() {
        localStorage.clear()
        sessionStorage.clear()
        setUserData('')
        navigate('/')
    }

    return (
        <header>
            <nav>
                <Link className="nav-button" to="/">Home</Link>
                <Link className="nav-button" to="/resources/">Resources</Link>
                <Link className="nav-button" to="/about/">About</Link>
                <Link className="nav-button" to="/login/">Sign in</Link>
                {!userData.username ? (
                    <>
                    </>
                ) : (
                    <>
                        <FormControl sx={{ m: 1, minWidth: 200 }}>
                            <InputLabel style={{ fontFamily: 'Termina Test' }} id="demo-simple-select-autowidth-label">DATA Collections</InputLabel>
                            <Select
                                className="nav-button"
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={redirection}
                                onChange={handleChange}
                                autoWidth
                                label="DATA Collections"
                                style={{ fontFamily: 'Termina Test' }}
                            >
                                <MenuItem className="nav-button" value="">
                                    <em>DATA Collections</em>
                                </MenuItem>
                                <MenuItem as={Link} className="nav-button" to="/roomTypes/" value={"roomTypes"}>Room Types</MenuItem>
                                <MenuItem as={Link} className="nav-button" to="/ffes/" value={"ffes"}>FFE</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={redirection}
                                onChange={handleChange}
                                label={userData.username}
                            >
                                <MenuItem value="">
                                    <em>{userData.username}</em>
                                </MenuItem>
                                <MenuItem as={Link} className="nav-button" to="/roomTypes/" value={"profile"}>Profile</MenuItem>
                                <MenuItem className="nav-button" value="logOut" onClick={logOut}>Sign out</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                )}
            </nav>
        </header>
    )
}