import React, { useMemo, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import uploadCloud from '../images/upload-cloud.png'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { createTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import IconPark from '../images/icon-park.png'
import * as XLSX from 'xlsx'
import { addDocument } from '../services/firestoreServices'
import { useSelector, useDispatch } from 'react-redux'
import { clientList } from '../redux/actionCreators/clientAction'
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
  marginTop: '40px',
}

const activeStyle = {
  borderColor: '#2196f3',
}

const acceptStyle = {
  borderColor: '#00e676',
}

const rejectStyle = {
  borderColor: '#ff1744',
}

function Upload(props) {
  const user = useSelector((state) => state.auth.userInfo.userId)
  const [displayPreview, setDisplayPreview] = useState(false)
  const [successful, setSuccessful] = useState(false)
  const dispatch = useDispatch()
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    setDisplayPreview(true)

    //console.log(acceptedFiles);
  }, [])
  const theme = createTheme({
    palette: {
      action: {
        disabledBackground: '#e2d2e9',
        disabled: '#FFFFFF',
      },
    },
  })
  const useStyles = makeStyles(() => ({
    upload: {
      width: '200px',
      height: '48px',
      borderRadius: '10px',
      textAlign: 'center',
      marginTop: '20px',
      marginLeft: '75px',
      background: 'linear-gradient(269.51deg, #8F1FC4 1.37%, #5F048A 98.48%)',
      color: '#FFFFFF',
    },
  }))
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    onDrop,
    accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
  const classes = useStyles()

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  )
  const handleClick = (e) => {
    const file = acceptedFiles[0]
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(file)
      fileReader.onload = (e) => {
        const bufferArray = e.target.result
        const wb = XLSX.read(bufferArray, { type: 'buffer' })
        const wsname = wb.SheetNames[0]
        const ws = wb.Sheets[wsname]
        const data = XLSX.utils.sheet_to_json(ws)

        resolve(data)
      }
      // fileReader.onerror((error)=>{
      //   reject(error);
      // })
    })
    promise
      .then((d) => {
        console.log(d)
        d.forEach((row) => {
          addDocument('client', { ...row, addedBy: user })
        })

        dispatch(clientList())
        setSuccessful(true)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <div className='container'>
      {!displayPreview ? (
        <>
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <img src={uploadCloud} alt='upload cloud' />
            <h5>Select File</h5>
          </div>
          <p style={{ textAlign: 'center' }}>
            You can only upload <strong>.xlsx</strong> and <strong>.csv</strong>
          </p>
          <p>
            Note : Excel Upload needs a specific format to upload data. Please
            go through the given template before upload.
          </p>
        </>
      ) : !successful ? (
        <>
          <img src={IconPark} alt='icon park' style={{ marginLeft: '130px' }} />
          <p style={{ textAlign: 'center' }}>{acceptedFiles[0].name}</p>
        </>
      ) : (
        <>
          <img src={IconPark} alt='icon park' style={{ marginLeft: '130px' }} />
          <p>Your file has been uploaded successfully!</p>
        </>
      )}
      <ThemeProvider theme={theme}>
        <Button
          variant='contained'
          className={classes.upload}
          disabled={!displayPreview}
          onClick={handleClick}
        >
          {!successful ? 'UPLOAD' : 'NEW UPLOAD'}
        </Button>
      </ThemeProvider>
    </div>
  )
}

export default Upload
