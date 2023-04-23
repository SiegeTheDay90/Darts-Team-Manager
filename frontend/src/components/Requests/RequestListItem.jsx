import { useDispatch } from 'react-redux';
import { addToTeam } from '../../store/users';
import { requestRemove } from '../../store/teams';


const RequestListItem = ({user, team}) => {

    const dispatch = useDispatch();

    function approveClick(){
        dispatch(addToTeam(user.id, team.id));
    }
    
    function rejectClick(){
        dispatch(requestRemove({userId: user.id, teamId: team.id}));
    }

    return(
        <li className="request-list-item">
            <p>{user.firstName +" "+user.lastName}</p>
            <p>{user.email}</p>
            <div className="buttons-container">
                <button className="approve" onClick={approveClick}>Approve</button>
                <button className="reject"onClick={rejectClick}>Reject</button>
            </div>
        </li>
    )

}

export default RequestListItem;