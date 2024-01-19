/* eslint-disable react/prop-types */
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"

export default function NavTop({ userData, setUserData }) {
    const navigate = useNavigate()

    //! States
    const [redirection, setRedirection] = useState('')
    const [accountDrop, setAccoutDrop] = useState('')
    const [initials, setInitials] = useState('')

    useEffect (() =>{
    (!userData ? 
        setInitials('')
        : setInitials(userData.first_name.slice(0, 1).toUpperCase() + userData.last_name.slice(0, 1).toUpperCase()))
    },[userData])

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
            <nav className='navBarTop'>
                {!userData ? (
                    <>
                        <div className='navBarTop-menu'>
                            <Link className="nav-button" to="/" onClick={handleChange}>Home</Link>
                            <Link className="nav-button" to="/resources/" onClick={handleChange}>Resources</Link>
                            <Link className="nav-button" to="/about/" onClick={handleChange}>About</Link>
                        </div>
                        <div className='navBarTop-account'>
                            <FormControl sx={{ m: 1, minWidth: 160 }}>
                                <InputLabel id="demo-simple-select-autowidth-label" style={{ fontFamily: 'Termina Test', color:'white',fontWeight: '500', fontSize: 'small'}}>Register / Sign in</InputLabel>
                                <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    value={accountDrop}
                                    onChange={handleChangeAccount}
                                    autoWidth
                                    label="register"
                                    placeholder="Register/Sign in"
                                >
                                    {/* <MenuItem value=""><em>Settings</em></MenuItem> */}
                                    <MenuItem as={Link} style={{ fontFamily: 'Termina Test', color:'lightcoral'}} to="/register/" value={"register"}>Register</MenuItem>
                                    <MenuItem as={Link} style={{ fontFamily: 'Termina Test', color:'lightcoral'}} to="/login/" value={"login"}>Login in your account</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='navBarTop-menu'>
                            <Link className="nav-button" to="/buildings/" onClick={handleChange}>Home</Link>
                            <Link className="nav-button" to="/resources/" onClick={handleChange}>Resources</Link>
                            <Link className="nav-button" to="/about/" onClick={handleChange}>About</Link>
                            <FormControl sx={{ m: 1, minWidth: 180 }}>
                                <InputLabel style={{ fontFamily: 'Termina Test', color:'white',fontWeight: '500', fontSize: 'small'}} id="demo-simple-select-autowidth-label">DATA Collections</InputLabel>
                                <Select
                                    // className="nav-button"
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    value={redirection}
                                    onChange={handleChange}
                                    autoWidth
                                    label="DATA Collections"
                                    style={{ fontFamily: 'Termina Test' }}
                                >
                                    {/* <MenuItem className="nav-button" value=""><em>DATA Collections</em></MenuItem> */}
                                    <MenuItem as={Link} style={{ fontFamily: 'Termina Test', color:'lightcoral'}} to="/roomTypes/" value={"roomTypes"}>Room Types</MenuItem>
                                    <MenuItem as={Link} style={{ fontFamily: 'Termina Test', color:'lightcoral'}} to="/ffes/" value={"ffes"}>FFE</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className='navBarTop-account'>
                            <FormControl sx={{ m: 1, minWidth: 110 }}>
                                {initials &&
                                    <InputLabel id="demo-simple-select-autowidth-label" style={{ fontFamily: 'Termina Test', color:'white',fontWeight: '500', fontSize: 'small'}}>{initials}</InputLabel>
                                }
                                <Select
                                    // className="nav-button"
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    value={accountDrop}
                                    onChange={handleChangeAccount}
                                    autoWidth
                                    label="user"
                                    style={{ fontFamily: 'Termina Test' }}
                                >
                                    {/* <MenuItem value=""><em>Settings</em></MenuItem> */}
                                    <MenuItem as={Link} style={{ fontFamily: 'Termina Test', color:'lightcoral'}} to="/profile/" value={"profile"}>Profile</MenuItem>
                                    <MenuItem style={{ fontFamily: 'Termina Test', color:'lightcoral'}} value={"logout"} onClick={logOut} >Sign out</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </>
                )}
            </nav>
        </header>
    )
}