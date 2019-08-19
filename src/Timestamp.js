import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

export default ({timestamp}) => {
  if (!(timestamp instanceof Date)) timestamp = new Date(timestamp);
  return (
    <Text style={styles.timestamp}>
      {timestamp.getDate() + ' / ' + (timestamp.getMonth() + 1)}
    </Text>
  );
};

const styles = StyleSheet.create({
  timestamp: {
    fontSize: 14,
    fontWeight: '500',
  },
});

const MONTHS = [
  'Gen',
  'Feb',
  'Mar',
  'Apr',
  'Mag',
  'Giu',
  'Lug',
  'Ago',
  'Set',
  'Ott',
  'Nov',
  'Dic',
];

const DAYS = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
