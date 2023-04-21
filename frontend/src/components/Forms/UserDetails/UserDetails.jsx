import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateUser } from '../../../store/users';
import '../Form.scss';

const UserDetails = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const errors = useSelector(state => state.errors);
    const [firstName, setFirstName] = useState(sessionUser.firstName);
    const [lastName, setLastName] = useState(sessionUser.lastName);

    useEffect(() => {
        setFirstName(sessionUser.firstName);
        setLastName(sessionUser.lastName);
    }, [sessionUser]);

    useEffect(() => {
        if(errors[0]){
            const prevalentError = errors[0];
            let errorContainer;
            let inputField;
            switch(prevalentError.slice(0, 5)){
                case "First":
                    inputField = document.getElementById('InputFirstName');
                    errorContainer = document.getElementById('firstNameError');
                    break;
                case "Last ":
                    inputField = document.getElementById('InputLastName');
                    errorContainer = document.getElementById('lastNameError');
                    break;
                default:
                    alert("Uncaught Error in Update");
            }
            if(errorContainer && inputField){
                errorContainer.innerHTML = prevalentError+'.';
                errorContainer.style.display = "block";
                inputField.style.background = "#ffdddd";
                inputField.style.border = "1px solid #bb0000";
            }
        }
    }, [errors]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser({...sessionUser, firstName, lastName}))
    }



    return(
        <div id = "user-details">
            <div className="FormDiv">
                <h2>User Details</h2><br/>
            </div>
            
            <form id="user-details-form" onSubmit={handleSubmit} className="Form">

                <div className="InputContainer">
                    <label htmlFor="InputFirstName">First name</label>
                    <input id="InputFirstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="Input"/>
                    <span className="error" id="firstNameError"></span>
                </div>

                <div className="InputContainer">
                    <label htmlFor="InputLastName">Last name</label>
                    <input id="InputLastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="Input"/>
                    <span className="error" id="lastNameError"></span>
                </div>

                <input type="submit" value="Update Detail(s)" className="button-small" disabled={!firstName && !lastName}/>
            </form>
            <br/>
            <Link to="/request">Reset Password</Link>
        </div>
    )
}

export default UserDetails;