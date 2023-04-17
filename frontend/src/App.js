import { Route } from 'react-router-dom';
import './App.scss';
import Navigation from './components/Navigation/navbar.jsx';
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
      <footer>
        Developed by <a href="https://siegetheday90.github.io/personal-site/">Clarence Smith</a>
      </footer>
    </div>
  );
}

export default App;
