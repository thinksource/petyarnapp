import React from 'react'
import {AmplifySignOut, withAuthenticator} from '@aws-amplify/ui-react'
function MyPosts(props){
    const fetchPics = async (props) =>{
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
        <div>
            <AmplifySignOut />
            <h2> My profile </h2>
        </div>
    )
}

export default withAuthenticator(MyPosts)