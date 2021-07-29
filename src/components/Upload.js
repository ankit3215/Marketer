import React,{useMemo} from 'react'
import {useDropzone} from 'react-dropzone';
import uploadCloud from '../images/upload-cloud.png';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#A1A4B2',
  borderStyle: 'dashed',
  backgroundColor: '#FFFFFF',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  marginTop: '40px'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

function Upload(props) {
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
      } = useDropzone({accept: 'xlsx/*'});

      const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
      }), [
        isDragActive,
        isDragReject,
        isDragAccept
      ]);
    return (
        <div className="container">
        <div {...getRootProps({style})}>
          <input {...getInputProps()} />
          <img src={uploadCloud} alt='upload cloud'/>
        </div>
        </div> 
    )
}

export default Upload
