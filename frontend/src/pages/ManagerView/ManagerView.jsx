import {useSelector} from 'react-redux';
import { Redirect } from 'react-router-dom';
import Requests from '../../components/Requests/Requests';
const ManagerView = () => {
    const sessionUser = useSelector(state => state.session.user);
    const team = useSelector(state => state.teams[state.session.user?.teamId])

    switch(!!sessionUser?.isManager){
        case false:
            return <Redirect to="/" />

        case true:
            return (
            <>
                <h1>
                    Manager Suite
                </h1>
                <Requests team={team}/>
                <br></br>
                <h2>
                    <u>Declare a new Manager</u>
                </h2>
            </>
            )
    }

}

export default ManagerView;