import createDataContext from './createDataContext';
import jsonServerService from '../services/jsonServerService';

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'get_blog_posts':
      return action.payload;
    case 'add_blog_post':
      return [...state, action.payload];
    case 'edit_blog_post':
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });
    case 'delete_blog_post':
      return state.filter(blogPost => blogPost.id !== action.payload);
    default:
      return state;
  }
};

const getBlogPosts = (dispatch) => {
  return async () => {
    const response = await jsonServerService.get('/blogPosts');
    dispatch({ type: 'get_blog_posts', payload: response.data });
  };
};

const addBlogPost = (dispatch) => {
  return async (title, content, callback) => {
    const response = await jsonServerService.post('/blogPosts', { title, content });
    dispatch({ type: 'add_blog_post', payload: response.data });
    if (callback) {
      callback();
    }
  };
};

const editBlogPost = (dispatch) => {
  return async (id, title, content, callback) => {
    const response = await jsonServerService.put(`/blogPosts/${id}`, { title, content });
    dispatch({ type: 'edit_blog_post', payload: response.data });
    if (callback) {
      callback();
    }
  };
};

const deleteBlogPost = (dispatch) => {
  return async (id) => {
    await jsonServerService.delete(`/blogPosts/${id}`);
    dispatch({ type: 'delete_blog_post', payload: id });
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { getBlogPosts, addBlogPost, editBlogPost, deleteBlogPost },
  []);