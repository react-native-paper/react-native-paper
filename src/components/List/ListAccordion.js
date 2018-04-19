/* @flow */

import color from 'color';
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TouchableRipple from '../TouchableRipple';
import Icon from '../Icon';
import Text from '../Typography/Text';
import withTheme from '../../core/withTheme';
import type { Theme } from '../../types';

type Props = {
  /**
   * Title text for the list accordion.
   */
  title: React.Node,
  /**
   * Description text for the list accordion.
   */
  description?: React.Node,
  /**
   * Icon name or Component to display for the `ListAccordion`.
   */
  icon?: React.Node,

  /**
   * Content of the section.
   */
  children: React.Node,

  /**
   * @optional
   */
  theme: Theme,
  style?: any,
};

type State = {
  expanded: boolean,
};

/**
 * `ListAccordion` is an expandable list item.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { ListAccordion, ListItem, Checkbox } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <ListAccordion
 *     title="Accordion"
 *     icon="folder"
 *   >
 *     <ListItem title="First item" />
 *     <ListItem title="Second item" />
 *   </ListAccordion>
 * );
 * ```
 */
class ListAccordion extends React.Component<Props, State> {
  state = {
    expanded: false,
  };

  _handlePress = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  };

  render() {
    const { icon, title, description, children, theme, style } = this.props;
    const titleColor = color(theme.colors.text)
      .alpha(0.87)
      .rgb()
      .string();
    const descriptionColor = color(theme.colors.text)
      .alpha(0.54)
      .rgb()
      .string();

    return (
      <React.Fragment>
        <TouchableRipple
          style={[styles.container, style]}
          onPress={this._handlePress}
        >
          <View style={styles.row}>
            {icon ? (
              <View
                style={[
                  styles.item,
                  styles.icon,
                  description && styles.multiline,
                ]}
              >
                <Icon
                  name={icon}
                  size={24}
                  color={
                    this.state.expanded
                      ? theme.colors.primary
                      : descriptionColor
                  }
                />
              </View>
            ) : null}
            <View style={[styles.item, styles.content]}>
              <Text
                numberOfLines={1}
                style={[
                  styles.title,
                  {
                    color: this.state.expanded
                      ? theme.colors.primary
                      : titleColor,
                  },
                ]}
              >
                {title}
              </Text>
              {description && (
                <Text
                  numberOfLines={2}
                  style={[
                    styles.description,
                    {
                      color: descriptionColor,
                    },
                  ]}
                >
                  {description}
                </Text>
              )}
            </View>

            <View style={[styles.item, description && styles.multiline]}>
              <MaterialIcons
                name={
                  this.state.expanded
                    ? 'keyboard-arrow-up'
                    : 'keyboard-arrow-down'
                }
                color={titleColor}
                size={24}
              />
            </View>
          </View>
        </TouchableRipple>
        {this.state.expanded
          ? React.Children.map(children, child => {
              if (icon && !child.props.icon && !child.props.avatar) {
                return React.cloneElement(child, {
                  style: { paddingLeft: 64 },
                });
              }
              return child;
            })
          : null}
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  row: {
    flexDirection: 'row',
  },
  icon: {
    width: 40,
  },
  multiline: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
  },
  description: {
    fontSize: 14,
  },
  item: {
    margin: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default withTheme(ListAccordion);
