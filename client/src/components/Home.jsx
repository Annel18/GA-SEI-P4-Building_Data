import Login from "./Login"
import RegisterUser from "./RegisterUser"
export default function Home() {

    return (
        <>
            <div className="form-container">
                <RegisterUser />
            </div>
            <div className="form-container">
                <Login />
            </div>
        </>
    )
}