import React, { useState, useEffect } from 'react'
import PicCard from '../components/PicCard';
import {listPictures} from '../graphql/queries';
import {API, graphqlOperation, Storage} from 'aws-amplify';
import { makeStyles } from '@material-ui/core/styles';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 800,
      height: 450,
    },
  }));

export default function Home (porps){
    const classes = useStyles();
    const [piclist, setPiclist] = useState([]);
    const [page, setPage] = useState(1);
    
    const [nextToken, setNextToken] = useState(null);
    const [moredisable, setMoredisable] = useState(false);
    const perPage = 10;
    const handleMore = async (event) => {
      console.log(event);
      setPage(2);
      const ntoken = await fetchPics();
      // if (ntoken===null){
        // console.log("here  disabled")
        // setMoredisable(true);
      // } 
    };
    useEffect(()=>{
        fetchPics()
      }, []);
    const fetchPics = async () =>{
        try{
          // console.log(listPictures);
          let varjson={}
          var tmpnext = nextToken
          // if(page==1){
          //   const pageData = await API.graphql(graphqlOperation(listPictures, {limit:perPage}));
          //   tmpnext = pageData.data.listPictures.nextToken;
          //   // varjson = {limit: perPage};
          // }else{
          varjson = {limit: perPage, nextToken: tmpnext};
          // }
          const pictureData = await API.graphql(graphqlOperation(listPictures, {limit: perPage, nextToken: tmpnext}));
          console.log('nextToken:', pictureData.data.listPictures.nextToken);
          setNextToken(pictureData.data.listPictures.nextToken);
          console.log(pictureData);
          let picturelist = piclist;
          picturelist = [...picturelist, ...pictureData.data.listPictures.items];
          for(let p of picturelist){
            let fileAccessURL = await Storage.get(p.filepath);
            p.src = fileAccessURL;
            // picarray.push(p);
          }
          if (nextToken===null || piclist.length<perPage){
            setMoredisable(true);
          }
          console.log('picture list', picturelist);
          setPiclist([...picturelist]);
          console.log('==========');
          console.log(piclist);
          return pictureData.data.listPictures.nextToken; 
        }catch(error){
          console.log('error on fetching picture', error)
          // const pictureData = await API.graphql(graphqlOperation(listPictures, {limit: perPage}));
          // console.log('nextToken:', pictureData.data.listPictures.nextToken);
          // setNextToken(pictureData.data.listPictures.nextToken);
          // const picturelist = pictureData.data.listPictures.items;
          // for(let p of picturelist){
          //   let fileAccessURL = await Storage.get(p.filepath);
          //   p.src = fileAccessURL;
          //   // picarray.push(p);
          // }
          // console.log('picture list', picturelist);
          // setPiclist([...picturelist]);
          // console.log('==========');
          // console.log(piclist);
        }
        
      }
    return (
        <div className={classes.root}>
            <GridList cellHeight={250} className={classes.gridList}>
            <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>
                <ListSubheader component="div">All pictures</ListSubheader>
            </GridListTile>
            {piclist.map((tile) => (
                <GridListTile key={tile.id}>
                <PicCard data={tile}/>

                </GridListTile>
            ))}
            </GridList>
            <br/>
            <Button onClick={handleMore} variant="contained" color="primary" disabled={moredisable}>More Pictures</Button>
        </div> 
    );
}