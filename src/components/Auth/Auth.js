import React, {useState,useEffect} from 'react'
import { Container, Paper,Typography , Avatar , Grid ,Button } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input'
import { useNavigate } from 'react-router-dom';
import useStyles from './styles'
import Icon from './icon'
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import {useDispatch} from 'react-redux'
import {signUp , signIn} from '../../actions/auth'
import { AUTH } from '../../constants/index.js';


const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;


const Auth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const classes =  useStyles()
    const [showPassword , setShowPassword] = useState(false)
    const [isSignUp , setisSignUp] = useState(false)
    const [formData , setFormData] = useState({firstName:'' , lastName:'', email:'', password:'',confirmPassword:''})

    const switchMode = () =>{

      setisSignUp((prevSignUp)=> !prevSignUp)
      handleShowPassword(false)
       
    }

    const handleSubmit = (e) =>{
      e.preventDefault();
      if(isSignUp){
        dispatch(signUp(formData , navigate))
      }else{
        dispatch(signIn(formData , navigate))
      }
    }

    const handleChange = (e) =>{
     setFormData({...formData , [e.target.name]:e.target.value})
    }

    useEffect(() => {
      const initClient = () => {
            gapi.client.init({
            clientId,
            scope: ''
          });
       };
       gapi.load('client:auth2', initClient);
   });
  
    const onSuccess = async (res) =>{
       const result = res?.profileObj;
       const token = res?.tokenId;
      
       try {
          dispatch({type: AUTH, data:{result , token}})
          navigate('/')
       } catch (error) {
           console.log(error)
       }
    }


    const onFailure = () =>{
      console.log('google login failded try again later')
    }
    const handleShowPassword = () => setShowPassword((prevPassword)=> !prevPassword)

  return (
   <Container component="main" maxWidth="xs">
     <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
       <LockOutlinedIcon/>
        </Avatar>
        <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit} > 
            <Grid container spacing={2}>
              {
                isSignUp && (
                    <>
                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half></Input>
                    <Input name="lastName" label="Last Name" handleChange={handleChange}  half ></Input>
                    </>
                )
              }
              <Input name="email" label="Email Address" handleChange={handleChange}  type="email"/>
              <Input name="password" label="Password" handleChange={handleChange}  type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>
              {isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
            </Grid>

            {/* Google Authentication System is here */}
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
             {isSignUp ? 'Sign up' : 'Sign In'}
            </Button>
            <GoogleLogin
              clientId={clientId} 
              render={renderProps => (
                <Button onClick={renderProps.onClick} fullWidth color="primary" variant="contained" className={classes.googleButton} disabled={renderProps.disabled} startIcon={<Icon/>}>Login With Google</Button>
              )}
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
              />
            <Grid container justifyContent="flex-end" > 
                 <Grid item>
                   <Button onClick={switchMode}>
                {isSignUp ? 'Already have an account ? Sign In': 'Dont have an account? Sign Up'}
                   </Button>
                 </Grid>
            </Grid>
        </form>
     </Paper>
   </Container>
  )
}

export default Auth
