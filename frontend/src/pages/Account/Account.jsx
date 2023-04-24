import {useSelector} from 'react-redux';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import UserDetails from '../../components/Forms/UserDetails/UserDetails';
import TeamSelect from '../../components/Forms/TeamSelect/TeamSelect';
import './Account.scss'
const Account = () => {
    const sessionUser = useSelector(state => state.session.user);

    switch(!!sessionUser){
        case false:
            return <Redirect to="/"></Redirect>

        case true:
            return (
                <>
                    <h1>
                        {sessionUser.firstName}'s Account
                    </h1>
                    <UserDetails />
                    <TeamSelect />
                </>
            )

        default:
            return <p>None</p>
    }

}

export default Account;