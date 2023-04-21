// import { useEffect} from 'react';
// import { useDispatch } from 'react-redux';
// import { addToTeam, updateTeam } from '../../store/users';


const RequestListItem = ({user, team}) => {


    return(
        <li className="request-list-item">
            <p>{user.firstName +" "+user.lastName}</p>
            <p>{user.email}</p>
            <div className="buttons-container">
                <button className="approve">Approve</button>
                <button className="reject">Reject</button>
            </div>
        </li>
    )

}

export default RequestListItem;