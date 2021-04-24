import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import BlogPostForm from '../components/BlogPostFrom';
import { Context as BlogContext } from '../context/BlogContext';

const CreateScreen = ({ navigation }) => {
  const { addBlogPost } = useContext(BlogContext);

  return (
    <BlogPostForm onSubmit={(title, content) => {
      addBlogPost(title, content, () => {
        navigation.pop();
      });
    }} />
  );
};

const styles = StyleSheet.create({});

export default CreateScreen;