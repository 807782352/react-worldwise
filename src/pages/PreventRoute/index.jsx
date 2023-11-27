import { useEffect } from "react";
import { useAuth } from "../../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";

export default function PreventRoute({children}) {
    const {isAuthenticated} = useAuth();

    const navigate = useNavigate();

    useEffect(()=>{
       !isAuthenticated && navigate("/"); 
    }, [isAuthenticated])

    return isAuthenticated && children;
}
