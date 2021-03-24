import React from 'react'
import {AmplifySignOut, withAuthenticator} from '@aws-amplify/ui-react'

import {listPictures} from './graphql/queries';
import { Auth } from 'aws-amplify';
import editPicCard from '../components/editPicCard';
function MyPosts(props){
    const tokens = await Auth.currentSession();
    const userName = tokens.getIdToken().payload['cognito:username']
    const fetchPics = async (props) =>{
        try{
          console.log(listPictures);
          const pictureData = await API.graphql(graphqlOperation(listPictures, {filter: {owner: userName}}))
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
            <h2> My profile Page</h2>
            <div className={classes.root}>
            <GridList cellHeight={180} className={classes.gridList}>
            <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>
                <ListSubheader component="div">My upload pictures</ListSubheader>
            </GridListTile>
            {piclist.map((tile) => (
                <GridListTile key={tile.img}>
                <editPicCard src={tile.filepath} tile={tile.title} owner={tile.owner} />
                </GridListTile>
            ))}
            </GridList>
        </div> 
        </div>
    )
}

export default withAuthenticator(MyPosts)