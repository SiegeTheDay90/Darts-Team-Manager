import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../store/session.js';
import './Info.scss';

const SessionInfo = ({session}) => {
    const dispatch = useDispatch();

    const sessionUser = session.user;

    const menuClick = (e) => {
        if(e.currentTarget.open && e.target.parentElement.id !== 'summary' && e.target.id !== 'summary'){
            e.currentTarget.open=false
        }
    }

    const logoutClick = (e) => {
        e.preventDefault();
        dispatch(logout());
    }
    
    return(
    <details id="user-card" onClick={menuClick}>
        <summary id="summary">
            <span>{sessionUser.firstName}</span> <i className="fa-solid fa-user"></i>
        </summary>
        <NavLink to="/account"><li className="nav-li">Account</li></NavLink>
        {sessionUser.isManager && <NavLink to="/myteams"><li className="nav-li">My Team</li></NavLink>}
        {sessionUser.isManager && <NavLink to="/manage"><li className="nav-li">Manage Team</li></NavLink>}
        <hr></hr>
        <button className="black nav-session-button" onClick={logoutClick}>Logout</button>
    </details>
    )
}

export default SessionInfo;