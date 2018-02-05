/* @flow */

import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Colors, Button, withTheme } from 'react-native-paper';
import type { Theme } from 'react-native-paper/types';

type Props = {
  theme: Theme,
};

type State = {
  loading: boolean,
};

class ButtonExample extends React.Component<Props, State> {
  static title = 'Button';

  state = {
    loading: true,
  };

  render() {
    const uri = {
      // Callstack company avatar from github.
      uri: 'https://avatars0.githubusercontent.com/u/17571969?v=3&s=400',
    };
    const source = require('../assets/chameleon.jpg');
    const { theme: { colors: { background } } } = this.props;
    const dummyFunction = () => {}; // There's no ripple effect without a valid onPress prop.
    return (
      <View style={[styles.container, { backgroundColor: background }]}>
        <View style={styles.row}>
          <Button onPress={dummyFunction}>Simple</Button>
          <Button primary onPress={dummyFunction}>
            Primary
          </Button>
          <Button color={Colors.pink500} onPress={dummyFunction}>
            Custom
          </Button>
        </View>
        <View style={styles.row}>
          <Button raised onPress={dummyFunction}>
            Raised
          </Button>
          <Button raised primary onPress={dummyFunction}>
            Primary
          </Button>
          <Button raised color={Colors.pink500} onPress={dummyFunction}>
            Custom
          </Button>
        </View>
        <View style={styles.row}>
          <Button icon="add-a-photo" onPress={dummyFunction}>
            Icon
          </Button>
          <Button
            raised
            primary
            icon="file-download"
            loading={this.state.loading}
            onPress={() =>
              this.setState(state => ({ loading: !state.loading }))
            }
          >
            Loading
          </Button>
        </View>
        <View style={styles.row}>
          <Button disabled icon="my-location" onPress={dummyFunction}>
            Disabled
          </Button>
          <Button disabled loading raised onPress={dummyFunction}>
            Loading
          </Button>
        </View>
        <View style={styles.row}>
          <Button raised icon={uri} onPress={dummyFunction}>
            Remote image
          </Button>
          <Button raised icon={source} onPress={dummyFunction}>
            Required asset
          </Button>
          <Button
            icon={
              <Image
                source={source}
                style={{ width: 16, height: 16, borderRadius: 10 }}
              />
            }
            raised
            onPress={dummyFunction}
          >
            Custom component
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
  },

  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
});

export default withTheme(ButtonExample);
