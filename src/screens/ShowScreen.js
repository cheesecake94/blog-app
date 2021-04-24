import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';
import { EvilIcons } from '@expo/vector-icons';

const ShowScreen = ({ navigation }) => {
  const blogPostId = navigation.getParam('id');
  const { state } = useContext(BlogContext);

  const blogPost = state.find(blogPost => blogPost.id === blogPostId);

  return (
    <View>
      <Text style={styles.title}>{blogPost.title}</Text>
      <Text style={styles.content}>{blogPost.content}</Text>
    </View>
  );
};

ShowScreen.navigationOptions = ({ navigation }) => {
  const blogPostId = navigation.getParam('id');
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Edit', { id: blogPostId })}>
        <EvilIcons style={styles.editIcon} name="pencil" size={30} />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20
  },
  content: {
    fontSize: 15
  },
  editIcon: {
    marginRight: 4
  }
});

export default ShowScreen;