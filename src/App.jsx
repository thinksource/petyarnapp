 // eslint-disable-next-line
import logo from './logo.svg';
import './App.css';
import Amplify, {API, graphqlOperation, Storage} from 'aws-amplify';
import awsconfig from './aws-exports';
import {AmplifySignOut, withAuthenticator} from '@aws-amplify/ui-react'
import {listPictures} from './graphql/queries';
import { useEffect, useState } from 'react';
Amplify.configure(awsconfig);



function App() {
  
  const [piclist, setPiclist] = useState([])

  useEffect(()=>{
    fetchPics()
  }, []);

  const fetchPics = async () =>{
    try{
      console.log(listPictures);
      const pictureData = await API.graphql(graphqlOperation(listPictures, {limit: 10}))
      const picturelist = pictureData.data.listPictures.items;
      console.log('picture list', picturelist);
      setPiclist(picturelist);
    }catch(error){
      console.log('error on fetching picture', error)
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <AmplifySignOut />
        <h2>My App Content</h2>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
