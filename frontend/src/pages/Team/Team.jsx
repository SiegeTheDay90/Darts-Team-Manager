import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NextGame from '../../components/NextGame/NextGame';
import VenueMap from '../../components/Map/Map';
import './Team.scss';

const Team = () => {
    const sessionUser = useSelector(state => state.session.user);
    const users = useSelector(state => state.users);
    const team = useSelector(state => state.teams[state.session.user?.teamId]);
    const nextGame = useSelector(state => state.games[state.teams[state.session.user?.teamId]?.nextGame]);

    
    
    if(!sessionUser){
        return <Redirect to="/"></Redirect>
    }

    function res_status(user_id){
        if (nextGame?.reserved.includes(user_id)){
            return "green fa-solid fa-check"
        } else if(nextGame?.reserved.includes(-user_id)) {
            return "red fa-solid fa-xmark"
        } else {
            return "purple fa-solid fa-question"
        }
    }


    
    return (
    <>
        <div className="main-header">
            <h2>{team?.name || `Team Not Found for ${sessionUser?.firstName}`}</h2>
            <span className="detail record">{team?.wins}W - {team?.losses}L - {team?.draws}D</span>
            <details id="members-list"><summary>Members</summary>
                {Object.values(users).filter((user) => user.teamId == team.id).map((user) => (
                    <li key={user.id}>{user.firstName +" "+user.lastName[0]+"."} <i className={res_status(user.id)}></i></li>
                ))}
            </details>
        </div>
        <div className="main-content">
            <NextGame game={nextGame} />
        </div>
        <div className="main-footer">
            {nextGame ? <VenueMap game={nextGame} /> : null}
        </div>
    </>
    )
}


export default Team;