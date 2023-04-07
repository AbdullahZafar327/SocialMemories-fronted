import React,{useState,useRef} from 'react';
import {Typography , TextField , Button} from '@material-ui/core';
import {useDispatch} from 'react-redux'
import useStyles from './style'
import {commentPost} from '../../actions/posts'

const CommentSection = ({post}) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [comments,setComments] = useState(post?.comments)
    const [comment,setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));
    const commentsRef = useRef();
   
    const handleComment = async () =>{
     const finalComment = `${user?.data?.result?.name}:${comment}`
     const newComments = await dispatch(commentPost(finalComment,post?._id))
     setComments(newComments);
     setComment('');
     commentsRef.current.scrollIntoView({behavior:'smooth'})
   }

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
         <div className={classes.commentsInnerContainer}>
            <Typography gutterBottom variant='h6'>Comments</Typography>
            {comments.map((c,i)=>(
                <Typography gutterBottom variant='subtitle1' key={i}>
                  {c}
                </Typography>
            ))}
            <div ref={commentsRef}/>
         </div>
         {user?.data?.result?.name && (
         <div style={{width:'70%'}}>
         <Typography gutterBottom variant='h6'>write a comment</Typography>
         <TextField
           rows={4}
           fullWidth
           multiline
           label="Comment"
           variant='outlined'
           value={comment}
           onChange={(e)=>setComment(e.target.value)}
         />
         <Button style={{marginTop:'10px'}} disabled={!comment} variant='contained' color="primary" onClick={handleComment} fullWidth>
            post a comment
         </Button>
         </div>
         )}
      </div>
    </div>
  )
}

export default CommentSection
