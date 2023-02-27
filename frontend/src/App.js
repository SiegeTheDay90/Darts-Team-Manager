import { Route } from 'react-router-dom';
// import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchUsers } from "./store/users";




function App() {
  
  const dispatch = useDispatch();
  const users = useSelector(state => state.users)
  
  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  debugger
  console.log("APP COMPONENT")
  
  return (
    <div>
      <Route path="/users">
       <h1>Darts Manager</h1>
      </Route>
    </div>
  );
}

export default App;
