import { useEffect, useState } from 'react'
import { Outlet, useNavigation } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'

import NavTop from './components/NavBarTop'

export default  function App() {
    //! States
    let stage = sessionStorage.getItem('data')
    const [userData, setUserData] = useState(stage ? JSON.parse(stage) : '')
    const navigation = useNavigation()

    //! Effects
    useEffect(() => {
        sessionStorage.setItem('data', JSON.stringify(userData))
    }, [userData])

    return (
        <>
            <NavTop userData={userData} setUserData={setUserData} />
            <main>
                {
                    navigation.state === 'idle' ?
                        <Outlet context={[userData, setUserData]} />
                        :
                        <div className='centered'>
                            <Spinner animation='border' />
                        </div>
                }
            </main>
        </>
    )
}
