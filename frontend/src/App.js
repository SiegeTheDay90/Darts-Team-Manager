import { Route, Switch } from 'react-router-dom';
import './App.scss';
import Navigation from './components/Navigation/navbar.jsx';
import Map from './components/Map/Map';
import Splash from './pages/Splash/Splash.jsx'
import Team from './pages/Team/Team.jsx'
import ResetPassword from './components/Forms/ResetPassword/ResetPassword';
import RequestReset from './components/Forms/ResetPassword/RequestReset';
import AccountSettings from './components/Forms/AccountSettings/AccountSettings';
import NotFound from './pages/NotFound/NotFound';




function App() {
  
  return (
    <div className="App" id="App">
    <header>
        <Navigation />
    </header>
    <Switch>
      <Route exact path="/">
        <Splash />
      </Route>
      <Route path="/myteams">
        <Team />
      </Route>
      <Route path="/map">
        <Map />
      </Route>
      <Route path="/reset">
        <ResetPassword />
      </Route>
      <Route path="/request">
        <RequestReset />
      </Route>
      <Route path="/account">
        <AccountSettings />
      </Route>
      <Route path="*" component={NotFound} />
    </Switch>
      <footer>
        Developed by <a href="https://siegetheday90.github.io/personal-site/">Clarence Smith</a>
      </footer>
    </div>
  );
}

export default App;
