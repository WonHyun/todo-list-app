import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';

export default class ExpiredTodo extends React.Component {
  constructor(props) {
    super(props);
  }

  _openAlert = () => {
    // making current selected expired todo's title
    let titleName = this.props.todo.title;
    if (titleName.length > 20) {
      titleName = titleName.substring(0, 20);
      titleName += '...';
    }
    Alert.alert(
      'Delete Todo',
      'Are you sure delete' + titleName + '?',
      [
        {text: 'Cancel'},
        {
          text: 'Ok',
          onPress: () => {
            this.props.deleteTodo(this.props.todo.id);
          },
        },
      ],
      {cancelable: true},
    );
  };

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this._openAlert}>
          <View style={styles.container}>
            <Text
              style={styles.showTextStyle}
              numberOfLines={1}
              ellipsizeMode="tail">
              Due To : {this.props.todo.dueDate} {this.props.todo.title}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ff5768',
    borderRadius: 10,
    padding: 5,
    marginVertical: 5,
  },
  showTextStyle: {
    fontSize: 15,
    padding: 5,
    color: '#fff',
  },
});
