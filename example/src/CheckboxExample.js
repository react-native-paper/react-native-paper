/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import {
  Paragraph,
  Checkbox,
  Colors,
  TouchableRipple,
  withTheme,
} from 'react-native-paper';

class CheckboxExample extends Component {
  static title = 'Checkbox';
  static propTypes = {
    theme: PropTypes.object.isRequired,
  };

  state = {
    checkedNormal: true,
    checkedCustom: true,
  };

  render() {
    const { theme: { colors: { background } } } = this.props;
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: background,
          },
        ]}
      >
        <TouchableRipple
          onPress={() =>
            this.setState(state => ({
              checkedNormal: !state.checkedNormal,
            }))}
        >
          <View style={styles.row}>
            <Paragraph>Normal</Paragraph>
            <View pointerEvents="none">
              <Checkbox checked={this.state.checkedNormal} />
            </View>
          </View>
        </TouchableRipple>

        <TouchableRipple
          onPress={() =>
            this.setState(state => ({
              checkedCustom: !state.checkedCustom,
            }))}
        >
          <View style={styles.row}>
            <Paragraph>Custom</Paragraph>
            <View pointerEvents="none">
              <Checkbox
                color={Colors.blue500}
                checked={this.state.checkedCustom}
              />
            </View>
          </View>
        </TouchableRipple>
        <View style={styles.row}>
          <Paragraph>Checked (Disabled)</Paragraph>
          <Checkbox checked disabled />
        </View>
        <View style={styles.row}>
          <Paragraph>Unchecked (Disabled)</Paragraph>
          <Checkbox checked={false} disabled />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingVertical: 8,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

export default withTheme(CheckboxExample);
