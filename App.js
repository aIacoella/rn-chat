import React, {Component} from 'react';
import {Text, View} from 'react-native';
import RNChat from './src/RNChat';
import {messages, User1, messages2} from './src/Data';
import update from 'immutability-helper';

export default class App extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.setState(state =>
        update(state, {
          data: {$push: messages2},
        }),
      );
    }, 3000);
  }

  state = {
    data: messages,
  };

  render() {
    const {data} = this.state;
    return (
      <View style={{flex: 1}}>
        <RNChat data={data} user={User1} onSend={this.onSend} />
      </View>
    );
  }

  onSend = message => {
    this.setState(state =>
      update(state, {
        data: {$unshift: [message]},
      }),
    );
  };
}
