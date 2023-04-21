import { useSelector, useDispatch } from 'react-redux';
import './CheckInForm.scss';

const CheckInForm = ({game}) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const home = useSelector(state => state.teams[game?.homeTeamId]);
    const away = useSelector(state => state.teams[game?.awayTeamId]);
    if(!game){
        return <h1>Loading...</h1>
    }
    const year = game.date.slice(0, 4);
    const day = game.date.slice(8);
    const month_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = month_names[parseInt(game.date.slice(5,7))-1];
    return (
        <div className="form checkin">
            <div className="checkin-header">
                <h2>{away?.name} @ {home.name}</h2>
                <span className="detail">{month} {day}, {year}</span>
            </div>
            <div className="checkin-main">
                <form onSubmit={(e)=>{e.preventDefault()}}>
                    <label>
                        <input type="checkbox" className="checkin-box" name="reserved" />I'm in
                    </label>
                    
                    <div className="round-div">
                    <details><summary>Round 1</summary>
                        <label>
                            <input type="checkbox" className="checkin-box" name="games[1]" />301 Singles
                        </label><br/>
                        <label>
                            <input type="checkbox" className="checkin-box" name="games[2]" />301 Singles
                        </label><br/>
                        <label>
                            <input type="checkbox" className="checkin-box" name="games[3]" />501 Doubles
                        </label><br/>
                        <label>
                            <input type="checkbox" className="checkin-box" name="games[4]" />501 Doubles
                        </label>
                    </details>
                    </div>
                    <div className="round-div">
                        <details><summary>Round 2</summary>
                        <label>
                            <input type="checkbox" className="checkin-box" name="games[5]" />Cricket NP
                        </label><br/>
                        <label>
                            <input type="checkbox" className="checkin-box" name="games[6]" />Cricket Singles
                        </label><br/>
                        <label>
                            <input type="checkbox" className="checkin-box" name="games[7]" />Cricket Doubles
                        </label><br/>
                        <label>
                            <input type="checkbox" className="checkin-box" name="games[8]" />Cricket Doubles
                        </label>
                        </details>
                    </div>
                    <div className="round-div">
                        <details><summary>Round 3</summary>
                        <label>
                            <input type="checkbox" className="checkin-box" name="games[9]" />601 Triples
                        </label><br/>
                        <label>
                            <input type="checkbox" className="checkin-box" name="games[10]" />601 Triples
                        </label><br/>
                        <label>
                            <input type="checkbox" className="checkin-box" name="games[11]" />601 Triples
                        </label>
                        </details>
                    </div>
                    <div className="round-div">
                        <details><summary>Round 4</summary>
                        <label>
                            <input type="checkbox" className="checkin-box" name="games[12]" />501 Doubles
                        </label><br/>
                        <label>
                            <input type="checkbox" className="checkin-box" name="games[13]" />501 Doubles
                        </label><br/>
                        <label>
                            <input type="checkbox" className="checkin-box" name="games[14]" />501 Doubles
                        </label><br/>
                        <label>
                            <input type="checkbox" className="checkin-box" name="games[14]" />501 Doubles
                        </label>
                        </details>
                    </div>
                    <div className="round-div">
                        <details><summary>Round 5</summary>
                        <label>
                            <input type="checkbox" className="checkin-box" name="games[15]" />Cricket Doubles
                        </label><br/>
                        <label>
                            <input type="checkbox" className="checkin-box" name="games[16]" />Cricket Doubles
                        </label><br/>
                        <label>
                            <input type="checkbox" className="checkin-box" name="games[17]" />Cricket Doubles
                        </label><br/>
                        <label>
                            <input type="checkbox" className="checkin-box" name="games[18]" />Cricket Doubles
                        </label>
                        </details>
                    </div>
                    <div className="round-div">
                        <details><summary>Round 6</summary>
                        <label>
                            <input type="checkbox" className="checkin-box" name="games[19]" />601 Triples
                        </label><br/>
                        <label>
                            <input type="checkbox" className="checkin-box" name="games[20]" />601 Triples
                        </label><br/>
                        <label>
                            <input type="checkbox" className="checkin-box" name="games[21]" />601 Triples
                        </label>
                        </details>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CheckInForm