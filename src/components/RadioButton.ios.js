/* @flow */

import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import color from 'color';
import Icon from './Icon';
import TouchableRipple from './TouchableRipple';
import withTheme from '../core/withTheme';
import { RadioGroupContext } from './RadioGroup';
import type { Theme } from '../types';

type Props = {
  /**
   * Value of the radio button
   */
  value: string,
  /**
   * Whether radio is checked.
   */
  checked?: boolean,
  /**
   * Whether radio is disabled.
   */
  disabled?: boolean,
  /**
   * Function to execute on press.
   */
  onPress?: Function,
  /**
   * Custom color for radio.
   */
  color?: string,
  /**
   * @optional
   */
  theme: Theme,
};

/**
 * Radio buttons allow the selection a single option from a set
 */
class RadioButton extends React.Component<Props> {
  render() {
    return (
      <RadioGroupContext.Consumer>
        {context => {
          const { disabled, onPress, theme, ...rest } = this.props;

          const checkedColor = disabled
            ? theme.colors.disabled
            : this.props.color || theme.colors.accent;

          let rippleColor;

          const { passed, value, onValueChange } = context;
          const checked = passed
            ? value === this.props.value
            : this.props.checked;

          if (disabled) {
            rippleColor = 'rgba(0, 0, 0, .16)';
          } else {
            rippleColor = color(checkedColor)
              .fade(0.32)
              .rgb()
              .string();
          }
          return (
            <TouchableRipple
              {...rest}
              borderless
              rippleColor={rippleColor}
              onPress={
                disabled
                  ? undefined
                  : passed ? () => onValueChange(this.props.value) : onPress
              }
              style={styles.container}
            >
              <View style={styles.iconContainer}>
                {checked && (
                  <Icon
                    allowFontScaling={false}
                    name={checked && 'done'}
                    size={24}
                    style={[styles.icon, { color: checkedColor }]}
                  />
                )}
              </View>
            </TouchableRipple>
          );
        }}
      </RadioGroupContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
  },
  icon: {
    margin: 6,
  },
  iconContainer: {
    height: 36,
  },
});

export default withTheme(RadioButton);
