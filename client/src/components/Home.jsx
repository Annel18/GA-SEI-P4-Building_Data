import Login from "./Login"
import RegisterUser from "./RegisterUser"
export default function Home() {

    return (
        <section className="hero">
            <RegisterUser />
            <Login />
        </section>
    )
}