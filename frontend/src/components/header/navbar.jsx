import { useSelector } from "react-redux";
import SessionInfo from "../Session/Info.jsx";
import {Link} from 'react-router-dom'
// import LoginFormModal from "../Session/LoginFormModal.jsx";
import './Navigation.css'


const Navigation = () => {

  const session = useSelector(state => state.session)
  
  return (
    <nav className="navigation">
      <Link to="/">
        <img src="https://i.ibb.co/rG5Wjqh/Logo.png"
        alt="Logo"
        id="Logo"/>
      </Link>
      <h1>Team Connect</h1>
      <SessionInfo session = {session}/> 
    
      {/* <LoginFormModal /> */}
    </nav>
  )
}

export default Navigation;

