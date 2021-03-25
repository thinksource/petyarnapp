import React, { useState, useEffect, createRef } from 'react'
import {AmplifySignOut, withAuthenticator} from '@aws-amplify/ui-react'
import {API, graphqlOperation, Storage} from 'aws-amplify';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Button from '@material-ui/core/Button';

import {listPictures} from '../graphql/queries';
import { Auth } from 'aws-amplify';
// import Modal from '@material-ui/core/Modal';
import ReactModal from 'react-modal';

import EditPicCard from '../components/EditPicCard';
import UpPicForm from '../components/UpPicForm';

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
    left: {
      display:'inline',
      float: 'left',
    },
    middle: {
      display: 'inline',
      textAlign: 'center'
    },
    right: {
      display:'inline',
      float: 'right',
    },    

  }));


function MyPosts(props){


    const classes = useStyles();
    const ref = createRef();
    const [piclist, setPiclist] = useState([]);
    const [open, setOpen] = useState(false);
    var userName = "";
    const handleOpen = () => {
      setOpen(true);
      console.log(open);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const onUpload = async ()=>{
      handleClose();
      setPiclist(await API.graphql(graphqlOperation(listPictures, {where : {owner: {_eq: userName}}})));
    }

    useEffect(()=>{
        fetchPics()
      }, []);
    const fetchPics = async (props) =>{

        try{
          const pictureData = await API.graphql(graphqlOperation(listPictures, {where : {owner: {_eq: userName}}}))
          const picturelist = pictureData.data.listPictures.items;
          
          console.log('picture list', picturelist);
          // const picarray=[];
          for(let p of picturelist){
            let fileAccessURL = await Storage.get(p.filepath);
            p.src = fileAccessURL;
            // picarray.push(p);
          }
          // picturelist.map(async (p)=>{
          //   const fileAccessURL = await Storage.get(p.filepath);
          //   console.log(fileAccessURL);
          //   p.src=fileAccessURL;
          // });
          setPiclist(picturelist);
          console.log('==========');
          console.log(piclist);
        }catch(error){
          console.log('error on fetching picture', error)
        }
      }

    return (
        <div>
            <div>
              <h2 className={classes.middle}> My profile Page</h2>
              <Button variant="contained" color="primary" className={classes.right} onClick={handleOpen}>
                Upload picture
              </Button>
              <ReactModal isOpen={open} onRequestClose={handleClose}
              appElement={document.getElementById('root')}
              > 
                <UpPicForm onUpload={onUpload} key="upPicForm"/>
                
              </ReactModal>
            </div>
            <div className={classes.root}>
            <GridList cellHeight={250} className={classes.gridList}>
            <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>
                <h4>My upload pictures</h4>
            </GridListTile>
            {piclist.map((tile) => (
                <GridListTile key={tile.id}>
                <EditPicCard src={tile.src} title={tile.title} owner={tile.owner} />
                </GridListTile>
            ))}
            </GridList>
            </div>
            <AmplifySignOut />
        </div>
    )
}

export default withAuthenticator(MyPosts)