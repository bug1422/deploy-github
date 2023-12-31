import "./styles/style.css"
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from 'universal-cookie'
export const Admin = () => {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const [isLogged, setIsLogged] = useState(false)
    useEffect(() => {
        let cookie = cookies.get('jwt_authorization')
        if (cookie !== undefined) {
            setIsLogged(true)
        }
        else {
            navigate('/auth/login', { replace: true })
        }
    }, [])
    return (
        <>
            {isLogged && <Outlet />}
        </>
    )
}