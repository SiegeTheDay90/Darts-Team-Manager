import { Route } from 'react-router-dom';
import './App.scss';
import Navigation from './components/header/navbar.jsx';
import Map from './components/Map/Map';
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
      <Route path="/map">
        <Map />
      </Route>
    </div>
  );
}

export default App;
