import React, { useState, useEffect } from 'react'
import picCard from '../components/picCard';
import {listPictures} from '../graphql/queries';
import {API, graphqlOperation, Storage} from 'aws-amplify';
import { makeStyles } from '@material-ui/core/styles';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';

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

export default function Home (porps){
    const classes = useStyles();
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
        <div className={classes.root}>
            <GridList cellHeight={180} className={classes.gridList}>
            <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>
                <ListSubheader component="div">All pictures</ListSubheader>
            </GridListTile>
            {piclist.map((tile) => (
                <GridListTile key={tile.img}>
                <picCard src={tile.filepath} tile={tile.title} owner={tile.owner}  />

                </GridListTile>
            ))}
            </GridList>
        </div> 
    );
}