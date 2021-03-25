import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Auth, graphqlOperation, API, Storage} from 'aws-amplify';
import * as mutations from '../graphql/mutations';
const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
  });

export default function(props){
    const classes = useStyles();
    const [attr, setAttr] = useState(props.data);

    const deletePicture = async ()=>{
      const result= await Storage.remove(attr.filepath);
      console.log(result);
      const deleteitem = {}
      deleteitem.id = attr.id;
      console.log(deleteitem);
      delete attr.createdAt;
      delete attr.updatedAt;
      const dbres = await API.graphql({ query: mutations.deletePicture, variables: {input: deleteitem}});
      props.update();
    }

    return (
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={attr.title}
            height="140"
            image={attr.src}
            title={attr.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {attr.title}
            </Typography>

          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="default" onClick={deletePicture}>
            delete
          </Button>
        </CardActions>
      </Card>
    );
}