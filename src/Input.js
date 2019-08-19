import React, {Component} from 'react';
import {TextInput, StyleSheet, View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Text} from './Text';
import uuid from 'uuid';

export default class Input extends Component {
  static propTypes = {
    onSend: PropTypes.func.isRequired,
    user: PropTypes.object,
  };

  state = {
    value: '',
  };

  onSend = () => {
    this.state.value &&
      this.props.onSend({
        user: this.props.user,
        id: uuid.v4(),
        text: this.state.value,
        timestamp: new Date(),
      });
    this.setState({value: ''});
  };

  onChangeText = value => this.setState({value});

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.toolbar}>
          <TextInput
            style={styles.input}
            multiline
            placeholder={'Send a message'}
            value={this.state.value}
            onChangeText={this.onChangeText}
          />
          <TouchableOpacity style={styles.btn} onPress={this.onSend}>
            <Text style={styles.btnText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
  },
  toolbar: {
    marginVertical: 8,
    marginHorizontal: 8,
    padding: 6,
    flexDirection: 'row',
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
  },
  btnText: {
    fontSize: 14,
    color: '#0645AD',
  },
  btn: {
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 4,
  },
  input: {
    flex: 1,
    fontSize: 17,
    padding: 4,
  },
});
