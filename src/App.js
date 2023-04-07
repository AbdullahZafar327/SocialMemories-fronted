import React from 'react'
import { BrowserRouter ,Routes , Route , Navigate} from 'react-router-dom'
import { Container } from '@material-ui/core'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import PostDetails from './components/postDetails/PostDetails.jsx'

const App = () => {
 const user = JSON.parse(localStorage.getItem('profile'))
  return (
    <BrowserRouter>
   <Container maxWidth="xl" style={{margin:'4px 0px'}} >
    <Navbar/>
    <Routes>
      <Route path="/" element={<Navigate to="/posts"/>}/>
      <Route path="/posts" element={<Home/>}/>
      <Route path="/posts/search" element={<Home/>}/>
      <Route path="/posts/:id" element={<PostDetails/>}/>
      <Route path="/auth" element={!user ? <Auth/>: <Navigate to="/posts" />}/>
    </Routes>
   </Container>
   </BrowserRouter>
  )
}

export default App
