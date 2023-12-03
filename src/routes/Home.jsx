import { useContext } from "react"
import { UserContext } from '../components/UserContextProvider'
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom"


export default function Home() {
    const { user, onChange } = useContext(UserContext)
    console.log(user)
    function handleLogout(){
        // Navigate('/notes')
        localStorage.clear()
        onChange(null)
    }
    const navigate = useNavigate();
    function handleNotes() {
        navigate('/notes')
    }
    return (
        <div>
            <header className=" flex flex-row ml-10 mt-4">
                <p>Hello {user.email}</p> 
                <NavLink to="/"> About</NavLink>
                <NavLink to="/notes"> Notes</NavLink>
                <NavLink to="/login" onClick={handleLogout}> Log out</NavLink>
            </header>
            <h1 className=" text-3xl font-bold">About me</h1>
            <h2>Email: {user.email}</h2>
            <h2>Sign up date: {Date}</h2>
            <button onClick={handleNotes}>Go to notes</button>
            <hr className=" w-30 mt-4" />
        <div className=" flex flex-row">
            <p className="text-xs">Create by Dikonov Timofey </p>
            <p className=" text-xs">BSU 2023</p>
        </div>
        </div>
    )
}
