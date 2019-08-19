import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

export default class MessageContainer extends Component {
  constructor(props) {
    super(props);
    this.refresh = props.refresh;
  }
  shouldComponentUpdate = () => this.refresh;
  render() {
    const {children} = this.props;
    return <View style={styles.container}>{children}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
