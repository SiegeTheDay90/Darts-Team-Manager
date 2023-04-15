import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import './NextGame.scss';
import { reserveGame } from '../../store/games';

const NextGame = ({game}) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [r, setR] = useState(game?.reserved.includes(sessionUser?.id))
    const home = useSelector(state => state.teams[game?.home_team_id]);
    const away = useSelector(state => state.teams[game?.away_team_id]);
    if(!game){
        return <h1>Loading...</h1>
    }
    const year = game.date.slice(0, 4);
    const day = game.date.slice(8);
    const month_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = month_names[parseInt(game.date.slice(5,7))-1];
    
    function reserveClick(e){
        dispatch(reserveGame(game.id, sessionUser.id)).then(() => {
            setR(!r)
        })
    }
    
    return (
        <div className="form checkin">
            <div className="checkin-header">
                <h2>{away?.name} @ {home.name}</h2>
                <span className="detail">{month} {day}, {year}</span>
            </div>
            <div className="checkin-main">
                <div id="attendance-button" className={r ? "green" : "red"} onClick={reserveClick}>
                    {r ? "You're In!" : "Not In"}
                </div>
            </div>
        </div>
    )
}

export default NextGame