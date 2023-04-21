import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../store/users';
import "./Request.scss"
import RequestListItem from './RequestListItem';



const Requests = ({team}) => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
    const requests = team?.requested
    useEffect(() => {
        debugger
        dispatch(fetchUsers(requests))
    }, [requests, dispatch])

    return(
        
        <ol>
            {team && requests.map((request) => {
                switch(!!users[request]){
                    case true:
                        return(
                            < RequestListItem key={request} user={users[request]} team={team} />
                        )
                    default:
                        break;
                }
            })}
        </ol>
    )

}

export default Requests;