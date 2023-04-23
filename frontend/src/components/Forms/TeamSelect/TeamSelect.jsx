import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { requestAdd } from '../../../store/teams';
import { updateUser } from '../../../store/users';
import '../Form.scss';
import './TeamSelect.scss';
import { storeErrors } from '../../../store/errors';

const TeamSelect = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const sessionUserTeam = useSelector(state => state.teams[state.session.user?.id]);
    const teams = useSelector(state => state.teams);
    const [chosen, setChosen] = useState(sessionUserTeam?.id);   

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(requestAdd(chosen, sessionUser.id))
    };

    const handleQuit = (e) => {
        e.preventDefault();
        if(e.target.innerText === "Quit My Team"){
            e.target.innerText = "Click Again to Confirm"
            e.target.classList.toggle("alert")
            setTimeout(() => { 
                e.target.innerText = "Quit My Team"
                e.target.classList.toggle("alert")
            }, 5000);
        } else if(e.target.innerText === "Click Again to Confirm"){
            
            dispatch(updateUser({...sessionUser, teamId: null})).then(() => {
                history.push("/account")
            }).catch((err) => {
                storeErrors(err)
            })
        }
    };


    return(
        <div id = "team-select">
            <div className="FormDiv">
                <h2>Team Select</h2><br/>
            </div>
            {sessionUser && sessionUser.isManager &&
            <>
                <p>Managers cannot currently quit or change their team.</p>
            </>
            }
            {sessionUserTeam && !sessionUser.isManager &&
            <>
                <p>You must quit your current team in order to join a new one. This action cannot be undone.</p>
                <button id="quit-button" onClick={handleQuit}>
                    Quit My Team
                </button>
            </>
            }
            {!sessionUserTeam &&
                <form id="team-select-form" onSubmit={handleSubmit} className="Form">

                    <select default={0} onChange={(e) => setChosen(e.target.value)} className="Input">
                        <option value={0}>Pick a Team</option>
                        {
                            Object.values(teams).map(team => (
                                <option key={team.id} value={team.id}>{team.name}</option>
                            ))
                        }
                    </select>
    
                    <input type="submit" value="Request to Join" className="button-small" />
                </form>
            }

            <br/>
        </div>
    )
}

export default TeamSelect;