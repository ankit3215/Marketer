import React,{useMemo} from 'react'
import {useDropzone} from 'react-dropzone';
import uploadCloud from '../images/upload-cloud.png';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles';

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
    const theme = createMuiTheme({
        palette: {
          action: {
            disabledBackground: '#5F048A',
            disabled: '#FFFFFF'
          }
        }
      });
    const useStyles = makeStyles(() => ({
        upload: {
            width: '200px',
            height: '48px',
            opacity: '0.4',
            borderRadius: '10px',
            textAlign: 'center',
            marginTop: '20px',
            marginLeft: '75px'
            
        },
      }))
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
      } = useDropzone({accept: 'xlsx/*'});
    const classes = useStyles()


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
          <h5>Select File</h5>
        </div>
        <p style={{textAlign: 'center'}}>You can only upload <strong>.xlsx</strong> and <strong>.csv</strong></p>
        <p>Note : Excel Upload needs a specific format to upload data. Please go through the given template before upload.</p>
        <ThemeProvider theme={theme}>
            <Button variant="contained" className={classes.upload} disabled>UPLOAD</Button>
        </ThemeProvider>
        </div> 
    )
}

export default Upload
