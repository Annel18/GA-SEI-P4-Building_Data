import Login from "./Login"
import RegisterUser from "./RegisterUser"
export default function Home() {

    return (
        <>
            <div className="form-container">
                <legend>Register</legend>
                <RegisterUser />
                <legend>or Sign-in if you have an account already</legend>
                <Login />
            </div>
        </>
    )
}