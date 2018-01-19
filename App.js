import React, { Component } from 'react';
import {
  View
} from 'react-native';

import KeyboardAwareAnimatedScrollView from './src/index';

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAwareAnimatedScrollView />
      </View>
    );
  }
}