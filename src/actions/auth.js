import * as api from '../api/index'
import { AUTH } from '../constants/index.js'



export const signIn = (formData,navigate) =>async(dispatch)=>{

  try {
    const data = await api.signIn(formData)
    console.log(data)
    dispatch({type: AUTH, data})
    navigate('/')
  } catch (error) {
    console.log({message: error.message})
  }
}

export const signUp = (formData,navigate) => async (dispatch) =>{
  
  try {
    const  { data } = await api.signUp(formData)
    dispatch({type: AUTH , data})
    navigate('/')
  } catch (error) {
    console.log({message:error.message})
  }
}

