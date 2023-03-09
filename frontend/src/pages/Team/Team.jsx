// import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CheckInForm from '../../components/Forms/CheckInForm';
import { restoreSession } from '../../store/session';
import './Team.scss';

const Team = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const users = useSelector(state => state.users);
    const history = useHistory();
    if(!sessionUser){
        history.push('/')
    }
    

    const team = useSelector(state => state.teams[sessionUser?.team_id]);
    const nextGame = useSelector(state => state.games[team?.nextGame]);
    if(!team){
        dispatch(restoreSession);
    }


    
    return (
    <>
        <div className="main-header">
            <h2>{team?.name || `Team Not Found for ${sessionUser?.firstname}`}</h2>
            <span className="detail record">{team?.wins}W - {team?.losses}L - {team?.draws}D</span>
            <details id="members-list"><summary>Members</summary>
                {Object.values(users).map((user) => (
                    <li key={user.id}>{user.firstname +" "+user.lastname[0]+"."}</li>
                ))}
            </details>
        </div>
        <div className="main-content">
            <CheckInForm game={nextGame} />
        </div>
    </>
    )
}

export default Team;