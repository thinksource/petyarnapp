import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import {Auth, graphqlOperation, API, Storage} from 'aws-amplify';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { v4 as uuid } from 'uuid';
import {createPicture} from '../graphql/mutations';
import { makeStyles, unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
import ImageUploader from 'react-images-upload';
const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  function getModalStyle() {
    const top = 50;
    const left = 50; 
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
export default function({onUpload, hiddenvalue}){
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [imgData, setImgData] = useState();
    const uploadImg = async ()=>{
        if(ImageData){
            const pic = imgData[0];
            const title = document.getElementById('title').value;
            const tokens = await Auth.currentSession();
            const userName = tokens.getIdToken().payload['cognito:username']
            console.log(pic);
            console.log(pic.size);
            const buffer= await pic.arrayBuffer();
            const filename = title+'_'+userName+'.'+pic.type.split('\/')[1]
            console.log(filename);
            const { key } = await Storage.put(filename, buffer, {contentType: pic.type, level:'public'});
            console.log(key);
            const imageInput ={
                id: uuid(),
                title,
                description: '',
                owner: userName,
                filepath: key,
                likecount: 0
            }
            const result = await API.graphql(graphqlOperation(createPicture, {input: imageInput}));
            console.log(result);
        }
    }
    const formik = useFormik({
        initialValues: {
          title: '',
          pictures:[]
        },
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
      });
    const onDrop = (picture)=>{
        console.log(picture);
        setImgData(picture);
    }
    return (
        <form onSubmit={formik.handleSubmit}>
            <div style={modalStyle} className={classes.paper}>
            <h3>Upload Picture</h3>
            <label htmlFor="title">Title:&nbsp;</label>
            <input type="text" id="title" name='title' onChange={formik.handleChange} value={formik.values.title} id="title"></input>
            {/* <input type="file" id="title" name='title' onChange={onDrop} id='testpic'></input> */}
            <ImageUploader
                withIcon={true}
                withPreview={true}
                buttonText='Choose images'
                onChange={onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
                singleImage={true}
                
            />
            <Button variant="contained" color="primary" onClick={uploadImg}>upload</Button>
            </div>
            
        </form>
    );
}