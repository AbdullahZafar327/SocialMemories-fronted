import axios from 'axios'
const url = 'http://localhost:5000'

axios.interceptors.request.use(config =>{
    if(localStorage.getItem('profile')){
        const token = localStorage.getItem('profile')
        config.headers['Authorization'] = `Bearer ${JSON.parse(token).data.token}`
    }
    return config;
   })
   
export const fetchPost  = (id) => axios.get(`${url}/posts/${id}`)
export const fetchPosts = (page) => axios.get(`${url}/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => axios.get(`${url}/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const createPost = (newPost) =>axios.post(`${url}/posts`,newPost)
export const updatePost = (id,updatedPost) => axios.patch(`${url}/posts/${id}`,updatedPost)
export const deletePost = (id) => axios.delete(`${url}/posts/${id}`)
export const likePost = (id) => axios.patch(`${url}/posts/${id}/likePost`);
export const comment = (value,id) => axios.post(`${url}/posts/${id}/commentPost`,{value});


export const signIn = (formData) =>axios.post(`${url}/users/signin`,formData)
export const signUp = (formData) =>axios.post(`${url}/users/signup`,formData)
