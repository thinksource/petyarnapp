import React, { useState, useEffect } from 'react'
import {AmplifySignOut, withAuthenticator} from '@aws-amplify/ui-react'
import {API, graphqlOperation, Storage} from 'aws-amplify';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';


import {listPictures} from '../graphql/queries';
import { Auth } from 'aws-amplify';


import editPicCard from '../components/editPicCard';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
  }));

function MyPosts(props){
    const classes = useStyles();
    const [piclist, setPiclist] = useState([])
    useEffect(()=>{
        fetchPics()
      }, []);
    const fetchPics = async (props) =>{
        const tokens = await Auth.currentSession();
        const userName = tokens.getIdToken().payload['cognito:username']
        try{
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