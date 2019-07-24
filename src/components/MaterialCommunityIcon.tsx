import * as React from 'react';
import { StyleSheet, Text } from 'react-native';

let MaterialCommunityIcons: any;

try {
  // Optionally require vector-icons
  MaterialCommunityIcons = require('react-native-vector-icons/MaterialCommunityIcons')
    .default;
} catch (e) {
  if (
    // @ts-ignore
    global.__expo &&
    // @ts-ignore
    global.__expo.Icon &&
    // @ts-ignore
    global.__expo.Icon.MaterialCommunityIcons
  ) {
    // Snack doesn't properly bundle vector icons from subpath
    // Use icons from the __expo global if available
    // @ts-ignore
    MaterialCommunityIcons = global.__expo.Icon.MaterialCommunityIcons;
  } else {
    let isErrorLogged = false;

    // Fallback component for icons
    // @ts-ignore
    MaterialCommunityIcons = ({ name, color, size, ...rest }) => {
      /* eslint-disable no-console */
      if (!isErrorLogged) {
        if (
          !/(Cannot find module|Module not found|Cannot resolve module)/.test(
            e.message
          )
        ) {
          console.error(e);
        }

        console.warn(
          `Tried to use the icon '${name}' in a component from 'react-native-paper', but 'react-native-vector-icons' could not be loaded.`,
          `To remove this warning, try installing 'react-native-vector-icons' or use another method to specify icon: https://callstack.github.io/react-native-paper/icons.html.`
        );

        isErrorLogged = true;
      }

      return (
        <Text
          {...rest}
          style={[styles.icon, { color, fontSize: size }]}
          pointerEvents="none"
        >
          □
        </Text>
      );
    };
  }
}

const styles = StyleSheet.create({
  icon: {
    backgroundColor: 'transparent',
  },
});

export default MaterialCommunityIcons;
