import { useSelector } from "react-redux";
import SessionInfo from "./Info.jsx";
import {Link} from 'react-router-dom'
import './Navigation.scss'


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
      {session.user && <SessionInfo session = {session}/> }
    
    </nav>
  )
}

export default Navigation;

