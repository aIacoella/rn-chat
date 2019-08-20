import React, {PureComponent} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import Bubble from './Bubble';
import SystemMessage from './SystemMessage';
import Settings from './Settings';

export default class MessagesBoard extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
    user: PropTypes.object,
    loadEarlier: PropTypes.func,
    loading: PropTypes.bool,
    onBubbleLongPress: PropTypes.func,
  };

  renderMessage = ({item, index}) => {
    const {user: owner, data} = this.props;

    let timestamp = item[Settings.TIMESTAMP];
    const user = item[Settings.USER];
    const system = item[Settings.SYSTEM];

    timestamp = timestamp instanceof Date ? timestamp : new Date(timestamp);
    let showDate = index == data.length - 1;
    if (!showDate) {
      const currentDate = timestamp.getDate();
      const nextDate =
        data[index + 1][Settings.TIMESTAMP] instanceof Date
          ? data[index + 1][Settings.TIMESTAMP].getDate()
          : new Date(data[index + 1][Settings.TIMESTAMP]).getDate();
      showDate = currentDate !== nextDate;
    }

    if (system) return <SystemMessage {...item} />;

    const continuation =
      data[index + 1] &&
      data[index + 1][Settings.USER] &&
      !showDate &&
      data[index + 1][Settings.USER][Settings.USER_ID] ===
        user[Settings.USER_ID];

    return (
      <Bubble
        refresh={showDate}
        item={item}
        showDate={showDate}
        continuation={continuation}
        userMade={owner[Settings.USER_ID] === user[Settings.USER_ID]}
        onLongPress={this.onLongPress}
      />
    );
  };

  render() {
    const {data, loadEarlier, loading} = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.list}
          data={data}
          renderItem={this.renderMessage}
          keyExtractor={this.keyExtractor}
          inverted
          removeClippedSubviews={true}
          keyboardShouldPersistTaps={'always'}
          onEndReachedThreshold={0.25}
          onEndReached={!loading && loadEarlier}
          ListFooterComponent={this.renderLoadingEarlier}
        />
      </View>
    );
  }

  renderLoadingEarlier = () => {
    if (this.props.renderLoadingEarlier) this.props.renderLoadingEarlier();
    else
      return <ActivityIndicator style={styles.loadingEarlier} size={'large'} />;
  };

  onLongPress = () => {
    if (this.props.onBubbleLongPress) this.props.onBubbleLongPress();
    else Alert.alert('Pressed');
  };

  keyExtractor = item => item[Settings.MESSAGE_ID];
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  list: {
    paddingHorizontal: 15,
  },
  loadingEarlier: {
    marginVertical: 10,
    color: '#F5F5F5',
    alignSelf: 'center',
  },
});
