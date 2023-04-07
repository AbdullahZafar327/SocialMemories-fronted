import React, { useState,useEffect } from "react";
import useStyles from "./styles";
import { Paper, Typography, TextField, Button } from "@material-ui/core";
import FileBase  from 'react-file-base64'
import { useDispatch,useSelector } from "react-redux";
import { createPost,updatePost } from "../../actions/posts";


const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const post = useSelector((state)=> currentId ? state.posts.posts.find((message)=> message._id === currentId):null)
  const user = JSON.parse(localStorage.getItem('profile'))
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if(post) setPostData(post)
  }, [post])
  

  const handleSubmit = (e) => {
    e.preventDefault();

   if (currentId) {
      dispatch(updatePost(currentId,{...postData,name:user?.data?.result?.name || user?.result?.name}));
      clear();

    } else {
      dispatch(createPost({...postData,name:user?.data?.result?.name || user?.result?.name}))
      clear();
    }
    
    
  };

  const clear = () => {
    setCurrentId(null)

    setPostData({
    title: "",
    message: "",
    tags: "",
    selectedFile: ""
  })
  };

  if(!user){
    return(
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center" >
          Please Sign in to create your own memories and Like others
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Create a Memory</Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',')})}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>

        <Button
          variant="contained"
          className={classes.buttonSubmit}
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Post
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onSubmit={clear}
          fullWidth
        >
          clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
