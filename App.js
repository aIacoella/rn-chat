import React, {Component} from 'react';
import {Text, View} from 'react-native';
import RNChat from './src/RNChat';
import {messages, User1, messages2, generateMessages} from './src/RNChat/Data';
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
    text: '',
  };

  loadEarlier = () => {
    this.setState({loading: true});
    setTimeout(() => {
      this.setState(state =>
        update(state, {
          data: {$push: generateMessages(100, '2019-08-10', '2019-08-18')},
          loading: {$set: false},
        }),
      );
    }, 500);
  };

  onChangeText = text => this.setState({text});

  render() {
    const {data, loading, text} = this.state;
    return (
      <View style={{flex: 1}}>
        <RNChat
          text={text}
          onChangeText={this.onChangeText}
          onSend={this.onSend}
          data={data}
          user={User1}
          loadEarlier={this.loadEarlier}
          loading={loading}
          syntax={{message: {text: 'testo'}}}
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
