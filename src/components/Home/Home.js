import React ,{useState,useEffect}from 'react'
import {Container, Grid , Grow , Paper, AppBar , TextField , Button} from '@material-ui/core'
import {useNavigate , useLocation} from 'react-router-dom'
import ChipInput from 'material-ui-chip-input'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import {useDispatch} from 'react-redux'
import {getPosts , getPostsBySearch} from '../../actions/posts'
import Pagination from '../Pagination/Pagination'
import useStyles from './styles'


function useQuery(){
  return new URLSearchParams(useLocation().search)
}
const Home = () => {
    const [currentId , setCurrentId] = useState(null);
    const [search , setSearch] = useState('');
    const [tags , setTags] = useState([]);
    const dispatch = useDispatch();
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery')
    const classes = useStyles()

    useEffect(()=>{
      dispatch(getPosts())
    },[dispatch])

  const searchPost = () =>{
    if(search.trim() || tags){
      dispatch(getPostsBySearch({search , tags: tags.join(',')}))
      navigate(`/posts/search?searchQuery=${search || 'none'}&&tags=${tags.join(',')}`)
    }else{
      navigate('/')
    }
  }
  const handleKeyPress = (e) =>{
   if(e.keycode === 13){
      searchPost()
   }
  }

  const handleAdd = (tag) => setTags([...tags ,tag])
  const handleDelete  = (tagToDelete) => setTags(tags.filter((tag)=> tag !== tagToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
          <Grid container justifyContent="space-between" alignItems='stretch' spacing={3} className={classes.gridContainer}>
             <Grid item xs={12} sm={6} md={9}>
               <Posts setCurrentId={setCurrentId}/>
             </Grid>
             <Grid item xs={12} sm={6} md={3}>
              <AppBar className={classes.appBarSearch} position="static" color="inherit">
                <TextField 
                name="search"
                variant='outlined'
                label="Search Memories"
                fullWidth
                onKeyPress={handleKeyPress}
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                />
                <ChipInput
                value={tags}
                style={{margin:'10px 0'}}
                variant="outlined"
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                />
                <Button onClick={searchPost} variant="contained" className={classes.searchButton} color="primary">
                  Search
                </Button>
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
              <Paper elevation={6}>
                <Pagination page={page}/>
              </Paper>
             </Grid>
          </Grid>
      </Container>
    </Grow>
  )
}

export default Home
