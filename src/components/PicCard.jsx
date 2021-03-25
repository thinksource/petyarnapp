import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import {Auth, graphqlOperation, API, Storage} from 'aws-amplify';
import {updatePicture} from '../graphql/mutations';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,

    },
  });

export default function(props){
    const classes = useStyles();
    const [attr, setAttr] = useState(props.data);

    const addFavorite = async ()=>{
      try {
      const picdata = {};
      // picdata.description = attr.description;
      // picdata.filepath = attr.filepath;
      picdata.id = attr.id;
      // picdata.owner = attr.owner;
      // picdata.title = attr.title;
      picdata.likecount = attr.likecount+1;
      console.log(picdata);
      const picupdate = await API.graphql(graphqlOperation(updatePicture, {input: picdata}));
      console.log(picupdate);
      picupdate.data.updatePicture.src=attr.src;
      setAttr(picupdate.data.updatePicture);
      }catch(error){
        console.log('error on adding Like to pic', error);
      }
    }

    console.log(props);
    return (
      <Card className={classes.root}>
          
          <CardMedia
            component="img"
            alt={attr.title}
            height="140"
            image={attr.src}
            title={attr.title}
          />
          <CardContent>
            <Typography variant="body2" component="p">
              {attr.title} 
            </Typography>
          </CardContent>
        <CardActionArea>
        <CardActions>
        <IconButton aria-label="add to favorites" onClick={addFavorite}>
          <FavoriteIcon />
        </IconButton>
        {attr.likecount}
        </CardActions>
        </CardActionArea>
      </Card>
    );
}