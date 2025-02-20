import { Navigate } from "react-router-dom"

const ProtectedRoute = ({children}) => {
    if(localStorage.getItem("tkn")==null){
        return <Navigate to={"/login"}/>
      }
  
    return (
    <div>
      {children}
    </div>
  )
}

export default ProtectedRoute
