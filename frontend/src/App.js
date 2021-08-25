import React, { useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Wiki from './components/Wiki';
import LoginModal from './components/Navbar/LoginModal';
import Problems from './components/Problems';
import Problem from './components/Problem';
import cipherService from './services/ciphers';
import userService from './services/user';

const App = () => {
  const [user, setUser] = useState(null);
  const [ciphers, setCiphers] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const localUser = JSON.parse(loggedUserJSON);
      setUser(localUser);
      userService.setToken(localUser.token);
    }

    const completedJSON = window.localStorage.getItem('completedProblems');
    if (completedJSON) {
      const completedProblems = JSON.parse(completedJSON);
      setCompleted(completedProblems);
    } else {
      window.localStorage.setItem(
        'completedProblems',
        JSON.stringify(completed)
      );
    }
  }, []);

  useEffect(async () => {
    const returnedCiphers = await cipherService.getAll();
    setCiphers(returnedCiphers);
  }, []);

  const match = useRouteMatch('/problems/:id');
  const cipher = match ? ciphers.find((c) => c.id === match.params.id) : null;
  const loginModal = (
    <LoginModal user={user} setUser={setUser} setCompleted={setCompleted} />
  );

  return (
    <>
      <Navbar loginModal={loginModal} />
      <Switch>
        <Route path="/problems/:id">
          <Problem
            user={user}
            cipher={cipher}
            completed={completed}
            setCompleted={setCompleted}
          />
        </Route>
        <Route path="/problems">
          <Problems ciphers={ciphers} completed={completed} />
        </Route>
        <Route path="/wiki">
          <Wiki />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </>
  );
};

export default App;
