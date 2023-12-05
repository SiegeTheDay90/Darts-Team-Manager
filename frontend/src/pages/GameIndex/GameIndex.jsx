import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Game from '../../components/Game/Game';
import VenueMap from '../../components/Map/Map';
import '../Team/Team.scss';

const GameIndex = () => {
    const sessionUser = useSelector(state => state.session.user);
    const users = useSelector(state => state.users);
    const team = useSelector(state => state.teams[state.session.user?.teamId]);
    const teams = useSelector(state => state.teams);
    const games = useSelector(state => state.games);

    const userGames = games ? Object.values(games).filter((game) => {
        return game.homeTeamId == sessionUser?.id || game.awayTeamId == sessionUser?.id
    }).sort((a, b) => {
        a = new Date(a.date);
        b = new Date(b.date);
        return b - a;
    }) : [];
   
    
    const month_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    
    return (
        <>
            <div className="main-header">
                <h2>{team?.name || `Team Not Found for ${sessionUser?.firstName}`}</h2>
                <span className="detail record">{team?.wins}W - {team?.losses}L - {team?.draws}D</span>
            </div>
            <div className="main-content">
                <ol>
                    {userGames.map(game => {
                        const year = game.date.slice(0, 4);
                        const day = game.date.slice(8);
                        const month = month_names[parseInt(game.date.slice(5,7))-1];
                        return <li key={game.id} style={{listStyle:"unset", marginBottom: "10px"}}>
                                    <Link to={`/games/${game.id}`}>{teams[game.awayTeamId].name +" @ "+teams[game.homeTeamId].name}</Link>
                                    <p style={{marginTop: "3px"}}>{month +" "+day+", "+year}</p>
                                </li>
                    })}
                </ol>
            </div>
        </>
    )
}


export default GameIndex;