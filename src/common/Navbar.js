import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import { useSelector } from 'react-redux'
import Overlay from './Overlay'
import { makeStyles, Typography, Input, Button, Card,
  CardContent,
  } from "@material-ui/core";
import { uploadFile } from "../services/fireStorage";
import db from "../services/firestoreServices";
import { toast, ToastContainer } from "react-toastify";
import firebase from "../firebase";

const styles = makeStyles((theme) => ({
  root: {
    minWidth: 270 ,
    background: "#E8A87C"
  },
  link: {
    textDecoration: "none",
  },
  button: {
    padding: "1em",
    textTransform: "capitalize",
  },
  heading: {
    fontWeight: 500,
  },
  large: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));



const Navbar = ({ page }) => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const auth = useSelector((state) => state.auth);
  const [status, setStatus] = useState(false);
  const classes = styles();
  const [fileUrl, setFileUrl] = useState(null);
  const [fileUrl1, setFileUrl1] = useState(null);
  const userId = auth.userInfo.userId;

  let names = "";
  let phones = "";

  useEffect(() => {
    setName(names);
    setPhone(phones);
   
  }, [ names, phones]);


  const submitHandler = async (e) => {
    e.preventDefault();
    const ref = firebase
      .firestore()
      .collection("userInfo")
      .doc(userId.toString());
    await ref
      .update({
        displayName: name,
        email: auth.userInfo.email,
        displayPhone: phone
      })
      .then(() => {
        toast.success("Updated Successfully");
      })
      .catch((err) => {
        toast.warn(err);
      });
  };


  const onFileChange = async (e) => {
    
    const file = e.target.files[0];
    if(!file) return;

    const name = file.name;
    const fileUrl = await uploadFile(file, `profilePic/${name}`);

    

    const doc = db.collection("userInfo").doc(userId.toString());

    await doc
      .update({
        imageUrl: fileUrl,
      })
      .then(() => {
        setFileUrl(fileUrl);
        console.log("url updated in database");
      })
      .catch(() => {
        console.log("some error occured");
      });

      await doc.get().then((docRef) => {
        setFileUrl1(docRef.data().url);
      });
  };


  return (
    <>
      <ul onClick={() => setStatus(true)}>
        <li className='nav1'>{page}</li>

        <li className='nav2' style={{ float: 'right' }}>
          {auth.userInfo.displayName}
        </li>
        <li className='nav3' style={{ float: 'right' }}>
        <Avatar  className={classes.large}
    src = {fileUrl || auth.userInfo.imageUrl}/>
        </li>
      </ul>
     <Overlay status={status} onClose={() => setStatus(false)}>
     <div>
       <center>
         <Card className={classes.root}>
           <CardContent>
       <form onSubmit={submitHandler}>
          <Typography variant="h3">ᴜᴘᴅᴀᴛᴇ ʏᴏᴜʀ ᴘʀᴏꜰɪʟᴇ</Typography>
          
          <Typography>Email</Typography>
          <Input
            type="email"
            required="true"
            value={auth.userInfo.email}
            disabled
          />
          <br />
          <br />
          <Typography>Name</Typography>
          <Input
            type="text"
            required="true"
            value={auth.userInfo.displayName}
            onChange={(e) => setName(e.target.value)}
          />
           <br />
           <br />
          <Typography>Phone</Typography>
          <Input
            type="number"
            required="true"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <br />
          
     <Typography>Set Image</Typography>
          <input type="file" accept="image/*" onChange={onFileChange} />
          {fileUrl1 && (
            <img
              src={fileUrl1}
              alt="profile img"
              style={{ width: "100px", height: "100px" }}
            />
          )}
          <br />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="small"
            compo
            className={classes.button}
          >
            Update
          </Button>
          </form>
          </CardContent>
          </Card>
          </center>
          <ToastContainer />
      </div>
      </Overlay>
    </>
  )
}

Navbar.propTypes = {}
export default Navbar;
