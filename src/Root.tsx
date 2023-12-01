import { Outlet } from "react-router-dom"
import Navbar from "./components/navbar/Navbar"

import './Root.css'

const Root: React.FC = () => {
  return (
    <>
        <Navbar />
        <div className="container">
            <Outlet></Outlet>
        </div>
    </>
  )
}

export default Root