import { Route } from 'react-router-dom';
import './App.scss';
import Navigation from './components/header/navbar.jsx';
import Splash from './pages/Splash/Splash.jsx'
import Team from './pages/Team/Team.jsx'




function App() {
  
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
      <Route path="/myteams">
        <Team user = {null} />
      </Route>
    </div>
  );
}

export default App;
