import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Calendar} from 'react-native-calendars';

const {height, width} = Dimensions.get('window');

export default class TodoDetailView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
    };
    console.log(props);
  }

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

  render() {
    return (
      <View style={styles.container}>
        {this.props.isEditable ? (
          <TextInput
            style={styles.title}
            value={this.props.todo.title}
            onChangeText={text =>
              this.props.changeTitleText(this.props.todo.id, text)
            }
          />
        ) : (
          <Text style={styles.titleText}>{this.props.todo.title}</Text>
        )}

        <View style={styles.stateContainer}>
          <View style={styles.completeContainer}>
            <Text style={styles.text}>Completed : </Text>
            {this.props.todo.isCompleted ? (
              <Icon name="done" />
            ) : (
              <Icon name="close" />
            )}
          </View>

          <View style={styles.priorityContainer}>
            <Text style={styles.text}>Priority : </Text>
            {this.props.isEditable ? (
              <TextInput
                style={styles.text}
                value={this.props.todo.priority}
                onChangeText={text =>
                  this.props.changePriority(this.props.todo.id, text)
                }
              />
            ) : (
              <Text style={styles.text}>{this.props.todo.priority}</Text>
            )}
          </View>
        </View>
        <View style={styles.dueDateContainer}>
          <Text style={styles.text}>End Date :</Text>
          {this.props.todo.dueDate === '' ? (
            <Text style={styles.text}> Please choosing Due Date </Text>
          ) : (
            <Text> {this.props.todo.dueDate} </Text>
          )}
          <TouchableOpacity onPress={this._toggleModalVisible}>
            <Icon name="event" />
          </TouchableOpacity>
        </View>

        <Modal
          style={styles.calendarModalContainer}
          transparent={true}
          animationType="fade"
          visible={this.state.isModalVisible}
          onRequestClose={this._toggleModalVisible}>
          <View style={styles.calendarModal}>
            <TouchableOpacity
              style={styles.calendarCloseButton}
              onPress={this._toggleModalVisible}>
              <Icon name="close" />
            </TouchableOpacity>
            <Calendar
              current={() => {
                // eslint-disable-next-line no-lone-blocks
                {
                  this.props.dueDate === '' ? Date.now() : this.props.dueDate;
                }
              }}
              onDayPress={day => {
                this.props.changeDueDate(this.props.todo.id, day.dateString);
                this._toggleModalVisible();
              }}
            />
          </View>
        </Modal>
        {this.props.isEditable ? (
          <TextInput
            value={this.props.todo.description}
            onChangeText={text =>
              this.props.changeDescriptionText(this.props.todo.id, text)
            }
            placeholder="Type description"
            multiline={true}
          />
        ) : (
          <Text style={styles.descriptionText}>
            explain : {this.props.todo.description}
          </Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffe1a8',
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    fontSize: 20,
    borderBottomColor: '#723d46',
    borderBottomWidth: 1,
  },
  titleText: {
    fontSize: 20,
    borderBottomColor: '#723d46',
    borderBottomWidth: 1,
    padding: 5,
    paddingBottom: 10,
  },
  calendarModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarModal: {
    flex: 0.7,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    padding: 30,
    marginTop: 100,
    elevation: 5,
  },
  calendarCloseButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#723d46',
    borderBottomWidth: 1,
    padding: 5,
  },
  stateContainer: {
    flexDirection: 'row',
    padding: 5,
  },
  completeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
  },
  descriptionText: {
    fontSize: 15,
    padding: 5,
  },
});
