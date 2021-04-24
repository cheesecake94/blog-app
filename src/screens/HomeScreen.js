import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const { state, deleteBlogPost } = useContext(BlogContext);

  return (
    <View style={styles.container}>
      <FlatList
        data={state}
        keyExtractor={(post) => post.title}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate('Show', { id: item.id })}>
              <View style={styles.row}>
                <Text style={styles.title}>{item.title}</Text>
                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                  <Feather style={styles.deleteIcon} name="trash" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }} />
    </View>
  );
};

HomeScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Create')}>
        <Feather style={styles.addIcon} name="plus" size={30} />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: 'gray'
  },
  title: {
    fontSize: 18
  },
  deleteIcon: {
    fontSize: 24
  },
  addIcon: {
    marginRight: 4
  }
});

export default HomeScreen;