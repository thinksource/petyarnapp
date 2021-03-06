 // eslint-disable-next-line
import './App.css';
import Amplify, {API, graphqlOperation, Storage} from 'aws-amplify';
import awsconfig from './aws-exports';

import { useEffect, useState } from 'react';
import {BrowserRouter,Switch,Route,Link} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header"
import MyPosts from "./pages/MyPosts"
Amplify.configure(awsconfig);



function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/myposts">
            <MyPosts />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
