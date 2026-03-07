import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

function ProtectedRoute({children}) {

    const{isAuth,loading} =useAuth()

    if(loading) return <p>loding....</p>
 
    if (!isAuth) return <Navigate to='/login' replace/>

  return children

}

export default ProtectedRoute