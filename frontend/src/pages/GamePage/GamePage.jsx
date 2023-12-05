import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import Game from '../../components/Game/Game';
import VenueMap from '../../components/Map/Map';
import '../Team/Team.scss';

const GamePage = () => {
    const { gameId } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const users = useSelector(state => state.users);
    const team = useSelector(state => state.teams[state.session.user?.teamId]);
    const game = useSelector(state => state.games[gameId]);
   
    
    
    function res_status(user_id){
        if (game?.reserved.includes(user_id)){
            return "green fa-solid fa-check"
        } else if(game?.reserved.includes(-user_id)) {
            return "red fa-solid fa-xmark"
        } else {
            return "purple fa-solid fa-question"
        }
    }
    
    
    
    if(!sessionUser){
        return <Redirect to="/"></Redirect>
    } else if(!team){
        return <Redirect to="/account"></Redirect>    
    } else {
        return (
        <>
            <div className="main-header">
                <h2>{team?.name || `Team Not Found for ${sessionUser?.firstName}`}</h2>
                <span className="detail record">{team?.wins}W - {team?.losses}L - {team?.draws}D</span>
                <details id="members-list"><summary>Members</summary>
                    {Object.values(users).filter((user) => user.teamId === team.id).map((user) => (
                        <li key={user.id}>{user.firstName +" "+user.lastName[0]+"."} <i className={res_status(user.id)}></i></li>
                    ))}
                </details>
            </div>
            <div className="main-content">
                <Game game={game} />
            </div>
            <div className="main-footer">
                {game ? <VenueMap game={game} /> : null}
            </div>
        </>
        )
    }
}


export default GamePage;