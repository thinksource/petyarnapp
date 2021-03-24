import React, { useState, useEffect } from 'react'
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
import Modal from '@material-ui/core/Modal';

import editPicCard from '../components/editPicCard';
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

    useEffect(()=>{
        fetchPics()
      }, []);
    const fetchPics = async (props) =>{
        const tokens = await Auth.currentSession();
        console.log(tokens);
        userName = tokens.getIdToken().payload['cognito:username']
        console.log(userName);
        try{
          const pictureData = await API.graphql(graphqlOperation(listPictures, {where : {owner: {_eq: userName}}}))
          const picturelist = pictureData.data.listPictures.items;
          
          console.log('picture list', picturelist);
          setPiclist(picturelist);
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
              <Modal open={open} onClose={handleClose}> 
                <UpPicForm hiddenvalue ={userName}/>
              </Modal>
            </div>
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
            <AmplifySignOut />
        </div>
    )
}

export default withAuthenticator(MyPosts)