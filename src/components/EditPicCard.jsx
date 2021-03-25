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
const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
  });

export default function(props){
    const classes = useStyles();

    return (
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={props.title}
            height="140"
            image={props.src}
            title={props.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.title}
            </Typography>

          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            edit
          </Button>
          <Button size="small" color="default">
            delete
          </Button>
        </CardActions>
      </Card>
    );
}