import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';

export default class AppTitleHeader extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>TO-DO LIST</Text>
        <TouchableOpacity style={styles.notificationIconStyle}>
          <Icon name="notifications" color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  title: {
    fontSize: 40,
    fontFamily: 'sans-serif-light',
    color: '#fff',
    marginHorizontal: 30,
  },
  notificationIconStyle: {
    padding: 5,
    backgroundColor: '#00adca',
    borderRadius: 30,
  },
});
