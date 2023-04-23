import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link, useHistory } from 'react-router-dom';
import { login, signup } from '../../../store/session.js';
import { storeErrors } from '../../../store/errors.js';
import './LoginForm.scss';
import '../Form.scss';

const LoginForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const errors = useSelector(state => state.errors);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    
    const [formType, setFormType] = useState('login');


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
        if(formType==='login'){
            if(!credential){
                dispatch(storeErrors({errors:["Email can't be blank"]}));
            } else {
                const user = {credential, password};
                dispatch(login(user));
            }
        } else if(formType==='signup'){
            const confirm = document.getElementById('ConfirmPassword');
            if(password === confirm.value){
                const user = {firstName, lastName, email, password};
                dispatch(signup(user)).then(() => dispatch(login(user))).then(() => history.push('/account'));
            } else {
                document.getElementById('confirmError').style.display = "block";
            }
        }
    }

    const demoClick = (e) => {
        e.preventDefault();
        dispatch(login({credential: 'demo@user.io', password: 'password'}))
    }

    if(sessionUser){
        return <Redirect to="/myteams" />
    }

    return(
        <>
        {formType==='login' && 
        <div id="LoginForm">
            <div className="FormDiv">
                <h2>Sign in</h2><br/>
                <button className='button-small' onClick={() => setFormType('signup')}>Register</button>
            </div>

            <form onSubmit={handleSubmit} className="Form">

                <div className="InputContainer">
                    <label htmlFor="InputEmail">Email</label>
                    <input id="InputEmail" value={credential} onChange={(e) => setCredential(e.target.value)} className="Input" require="true"/>
                    <span className="error" id="emailError"></span>
                </div>

                <div className="InputContainer">
                <label htmlFor="InputPassword">Password</label>
                <input id="InputPassword" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="Input" />
                <span className="error" id="passwordError"></span>
                </div>
                <Link to="/request">Forgot Password</Link>
                <div className="button-container">
                    <input className="button-large" type="submit" value="Sign in" disabled={!password}/>
                    <input className="button-large demo-button" type="button" value="Demo User" onClick={demoClick}/>
                </div>
            </form>
        </div>}
        {formType==='signup' && 
        <div id="LoginForm">

        <div className="FormDiv">
            <h2>Sign up</h2><br/>
            <button className='button-small' onClick={() => setFormType('login')}>Log In</button>
        </div>
        
        <form id="signUpForm" onSubmit={handleSubmit} className="Form">
            <div className="InputContainer">
                <label htmlFor="InputEmail">Email <span style={{color: "#dd0000"}}>*</span></label>
                <input id="InputEmail" value={email} onChange={(e) => setEmail(e.target.value)} className="Input"/>
                <span className="error" id="emailError"></span>
            </div>

            <div className="InputContainer">
                <label htmlFor="InputFirstName">First name <span style={{color: "#dd0000"}}>*</span></label>
                <input id="InputFirstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="Input"/>
                <span className="error" id="firstNameError"></span>
            </div>

            <div className="InputContainer">
                <label htmlFor="InputLastName">Last name </label>
                <input id="InputLastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="Input"/>
                <span className="error" id="lastNameError"></span>
            </div>

            <div className="InputContainer">
                <label htmlFor="InputPassword">Password <span style={{color: "#dd0000"}}>*</span></label>
                <input id="InputPassword" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="Input"/>
                <span className="error" id="passwordError"></span>
            </div>
            <div className="InputContainer">
                <label htmlFor="InputPassword"> Confirm Password <span style={{color: "#dd0000"}}>*</span></label>
                <input id="ConfirmPassword" type="password" className="Input"/>
                <span className="error" id="confirmError">Passwords do not match.</span>
            </div>


            <input type="submit" value="Register" className="button-large" disabled={!password || !firstName || !email}/>
        </form>
        </div>}
        </>
    )
}

export default LoginForm;