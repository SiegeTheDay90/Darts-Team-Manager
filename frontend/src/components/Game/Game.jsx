import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { reserveGame } from '../../store/games';
import './Game.scss';

const NextGame = ({game}) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [attClass, setAttClass] = useState("none")
    const home = useSelector(state => state.teams[game?.homeTeamId]);
    const away = useSelector(state => state.teams[game?.awayTeamId]);
    
    useEffect(() => {
        setAttClass(
            function(){
                if(game?.reserved.includes(sessionUser?.id)) {
                    return "reserved"
                } else if (game?.reserved.includes(-sessionUser?.id)){
                    return "unreserved"
                } else {
                    return "none"
                }
            }()
        )
    }, [sessionUser?.id, game])

    if(!game){
        return <h1>Loading...</h1>
    }
    const year = game.date.slice(0, 4);
    const day = game.date.slice(8);
    const month_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = month_names[parseInt(game.date.slice(5,7))-1];
    
    function reserveClick(e){
        dispatch(reserveGame(game.id, sessionUser.id))
    }
    
    return (
        <div className="form checkin">
            <div className="checkin-header">
                <h2 style={{marginBottom: "7px", fontWeight: "bolder"}}>Game</h2>
                <h2>{away?.name} @ {home.name}</h2>
                <span className="detail">{month} {day}, {year}</span>
            </div>
            <div className="checkin-main">
                <span className={attClass + " attendance-button"} onClick={reserveClick} />
                <span className="caption">click to change your attendance status</span>
            </div>
        </div>
    )
}

export default NextGame