import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

export default ({timestamp}) => {
  return (
    <Text style={styles.timestamp}>
      {timestamp.getDate() +
        ' ' +
        MONTHS[timestamp.getMonth()] +
        ' ' +
        timestamp.getFullYear()}
    </Text>
  );
};

export const renderTime = timestamp => {
  return (
    addZeros(String(timestamp.getHours())) +
    ':' +
    addZeros(String(timestamp.getMinutes()))
  );
};

export const addZeros = str => {
  if (str.length < 2) return '0' + str;
  else return str;
};

const styles = StyleSheet.create({
  timestamp: {
    fontSize: 14,
    fontWeight: '500',
    alignSelf: 'center',
    marginVertical: 4,
  },
});

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DAYS = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
