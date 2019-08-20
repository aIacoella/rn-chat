import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from './Text';

export default ({text, styleSystemMessage, ...rest}) => {
  return (
    <Text style={[styles.systemMessage, styleSystemMessage]} {...rest}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  systemMessage: {
    textAlign: 'center',
    fontSize: 13,
    color: '#303030',
    alignSelf: 'center',
  },
});
