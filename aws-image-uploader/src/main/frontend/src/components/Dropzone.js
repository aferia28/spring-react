import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import * as Constant from './../constants/constants'
import axios from 'axios';

export function Dropzone({ userProfileId }) {
  const onDrop = useCallback(acceptedFiles => {
    
    const file = acceptedFiles[0];
    console.log(file);

    const formData = new FormData();
    formData.append('file', file);

    axios.post(
        Constant.UPLOAD_USERPROFILE_IMAGE(userProfileId),
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    ).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });

  }, [])
  
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}