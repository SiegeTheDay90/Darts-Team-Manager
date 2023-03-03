import { Route } from 'react-router-dom';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchUsers } from "./store/users";
import Navigation from './components/header/navbar.jsx';
import Splash from './pages/Splash/Splash.jsx'




function App() {
  
  const dispatch = useDispatch();
  const users = useSelector(state => state.users)
  
  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  
  return (
    <div className="App" id="App">
      <Route path ="/">
        <header>
            <Navigation />
        </header>
      </Route>
      <Route exact path="/">
        <Splash />
      </Route>
      <Route path="/myteam">
        <h1>Darts Manager</h1>
      </Route>
      <Route path="/teams">
        <h1>Teams Page</h1>
      </Route>
    </div>
  );
}

export default App;
