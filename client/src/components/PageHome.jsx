import Login from "./Login"
import RegisterUser from "./RegisterUser"
export default function PageHome() {

    return (
        <section className="hero">
            <RegisterUser />
            <Login />
        </section>
    )
}