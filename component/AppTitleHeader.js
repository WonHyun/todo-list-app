import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Modal,
  Dimensions,
  ScrollView,
} from 'react-native';
import {Icon, Badge} from 'react-native-elements';
import ExpiredTodo from '../component/ExpiredTodo';

const {width} = Dimensions.get('window'); // current app width

export default class AppTitleHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
    };
  }

  //update todo compoent when props or state changed
  shouldComponentUpdate = (nextProps, nextState) => {
    const isChanged =
      this.props.expiredTodos !== nextProps.expiredTodos ||
      this.state !== nextState
        ? true
        : false;
    return isChanged;
  };

  // change modal visible that show expired todo's list
  _toggleModalVisible = () => {
    setTimeout(
      () =>
        this.setState(prevState => {
          return {
            isModalVisible: !prevState.isModalVisible,
          };
        }),
      0,
    );
  };

  // Are you sure delete all expired todos?
  _openClearAllAlert = () => {
    Alert.alert(
      'Delete All Expired Todo',
      'Are you sure delete all expired todo?',
      [
        {text: 'Cancel'},
        {
          text: 'Ok',
          onPress: () => {
            this.props.deleteManyTodo(this.props.expiredTodos);
          },
        },
      ],
      {cancelable: true},
    );
  };

  render() {
    return (
      <View>
        <Modal
          transparent={true}
          animationType="fade"
          visible={this.state.isModalVisible}
          onRequestClose={this._toggleModalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={this._toggleModalVisible}>
                <Icon name="close" />
              </TouchableOpacity>
              <View style={styles.modalContent}>
                <View style={styles.modalTitle}>
                  <Text style={styles.modalTitleText} numberOfLines={1}>
                    Expired TODOs
                  </Text>
                </View>
                <View style={styles.modalScroll}>
                  <ScrollView style={styles.modalScroll}>
                    {this.props.expiredTodos.map(todo => (
                      <ExpiredTodo
                        todo={todo}
                        deleteTodo={this.props.deleteTodo}
                      />
                    ))}
                  </ScrollView>
                </View>
                <View style={styles.modalButtonContainer}>
                  <TouchableOpacity onPress={this._openClearAllAlert}>
                    <Text>Delete All</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        <View style={styles.container}>
          <Text style={styles.title}>TO-DO LIST</Text>
          <TouchableOpacity onPress={this._toggleModalVisible}>
            {this.props.expiredTodos.length > 0 ? (
              <Badge
                badgeStyle={styles.countBadgeText}
                containerStyle={styles.countBadgeContainer}
                value={this.props.expiredTodos.length}
              />
            ) : (
              <View />
            )}
            <View style={styles.notificationIconStyle}>
              <Icon name="notifications" color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(20,20,20,0.5)',
  },
  modal: {
    flex: 1,
    width: width - 50,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    padding: 30,
    marginVertical: 100,
    elevation: 5,
  },
  modalCloseButton: {
    flex: 1,
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  modalContent: {
    flex: 10,
    alignItems: 'center',
  },
  modalTitle: {
    flex: 1,
    backgroundColor: '#00adca',
    borderRadius: 10,
    margin: 10,
    padding: 10,
    paddingHorizontal: 20,
    elevation: 3,
  },
  modalTitleText: {
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 24,
    fontFamily: 'sans-serif-light',
  },
  modalScroll: {
    flex: 5,
    marginBottom: 10,
  },
  modalButtonContainer: {
    flex: 1,
  },
  countBadgeText: {
    flex: 1,
    backgroundColor: 'red',
  },
  countBadgeContainer: {
    position: 'absolute',
    top: -6,
    right: -6,
    zIndex: 10,
  },
});
