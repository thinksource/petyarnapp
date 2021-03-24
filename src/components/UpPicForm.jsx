import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import {Auth, Storage} from 'aws-amplify';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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

        const pic = formik.pictures[0];
        const title = document.getElementById('title').value;
        const tokens = await Auth.currentSession();
        const userName = tokens.getIdToken().payload['cognito:username']
        console.log(pic);
        const filename = title+'_'+userName+'.'+pic.type.split('\/')[1]
        console.log(filename);
        const { key } = await Storage.put(filename, pic, {contentType: pic.type});
        const imageInput ={
            title,
            owner: userName,
            filePath: key,
            like: 0
        }
        await API.graphqlOperation()

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
        formik.pictures = picture;
        // // const pi= document.getElementById('testpic')
        // // console.log(pi.data);
        // console.log()
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