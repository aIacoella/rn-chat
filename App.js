import React, {Component} from 'react';
import {Text, View} from 'react-native';
import RNChat from './src/RNChat';
import {messages, User1, messages2} from './src/Data';
import update from 'immutability-helper';

export default class App extends Component {
  /*componentDidMount() {
    setTimeout(() => {
      this.setState(state =>
        update(state, {
          data: {$push: messages2},
        }),
      );
    }, 3000);
  }*/

  state = {
    data: messages,
    loading: false,
  };

  loadEarlier = () => {
    this.setState({loading: true});
    setTimeout(() => {
      this.setState(state =>
        update(state, {
          data: {$push: messages2},
          loading: {$set: false},
        }),
      );
    }, 3000);
  };

  render() {
    const {data, loading} = this.state;
    return (
      <View style={{flex: 1}}>
        <RNChat
          data={data}
          user={User1}
          onSend={this.onSend}
          loadEarlier={this.loadEarlier}
          loading={loading}
        />
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
