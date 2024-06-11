import { Outlet } from "react-router-dom"
import UseOrderContextProvider from "../context/UseOrderContext"

const LayoutRoot = () => {
  return (
    <UseOrderContextProvider>
        <Outlet/>

    </UseOrderContextProvider>
    
  )
}

export default LayoutRoot
