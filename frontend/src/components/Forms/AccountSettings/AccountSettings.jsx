import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import '../Form.scss';
import './AccountSettings.scss';

const AccountSettings = () => {
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
                case "Email":
                    inputField = document.getElementById('InputEmail');
                    errorContainer = document.getElementById('emailError');
                    break;
                case "First":
                    inputField = document.getElementById('InputFirstName');
                    errorContainer = document.getElementById('firstNameError');
                    break;
                case "Passw":
                    inputField = document.getElementById('InputPassword');
                    errorContainer = document.getElementById('passwordError');
                    break;
                default:
                    alert("Uncaught Error in Sign Up");
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
    }



    return(
        <div id = "account-settings">
            <div className="FormDiv">
                <h2>Account Settings</h2><br/>
            </div>
            
            <form id="account-settings-form" onSubmit={handleSubmit} className="Form">

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

                <input type="submit" value="Update" className="button-large" disabled={!firstName && !lastName}/>
            </form>
            <br/>
            <Link to="/request">Reset Password</Link>
        </div>
    )
}

export default AccountSettings;