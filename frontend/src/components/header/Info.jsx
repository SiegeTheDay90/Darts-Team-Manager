import { useDispatch } from 'react-redux';
import { logout } from '../../store/session.js';
import './Info.scss';

const SessionInfo = ({session}) => {
    const dispatch = useDispatch();

    const sessionUser = session.user;

    const logoutClick = (e) => {
        e.preventDefault();
        dispatch(logout());
    }
    
    return(
    <details id="user-card">
        <summary>
            <span>{sessionUser.firstname}</span> <i className="fa-solid fa-user"></i>
        </summary>
        <button className="black nav-session-button" onClick={logoutClick}>Logout</button>
    </details>
    )
}

export default SessionInfo;