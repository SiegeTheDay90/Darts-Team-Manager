import { useDispatch } from 'react-redux';
import { logout } from '../../store/session.js';
import './Info.css';

const SessionInfo = ({session}) => {
    const dispatch = useDispatch();

    const sessionUser = session.user;

    const logoutClick = (e) => {
        e.preventDefault();
        dispatch(logout());
    }

    const showLoginModal = (e) => {
        e.preventDefault();
        const modal = document.getElementById('OverlayContainer');
        modal.showModal();
        document.getElementById('App').style.overflow = "hidden";
    }
    
    return(
        <div id="user-card">
            {
                sessionUser 
                ? <>
                    Welcome, {sessionUser.username}
                    <br/>
                    <button className="black nav-session-button" onClick={logoutClick}>Logout</button>
                </>
                :   <span></span>
            }
        </div>
    )
}

export default SessionInfo;