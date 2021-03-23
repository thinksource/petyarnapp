import React, { useState, useEffect } from 'react'
import picCard from '../components/picCard';
import {listPictures} from './graphql/queries';
export default function Home (porps){
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
                <ListSubheader component="div">December</ListSubheader>
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