import * as React from 'react';
import { View, ViewStyle, StyleSheet, StyleProp, Animated } from 'react-native';
import Surface from './Surface';
import Text from './Typography/Text';
import Button from './Button';
import Icon, { IconSource } from './Icon';
import { withTheme } from '../core/theming';
import { Theme, $RemoveChildren } from '../types';
import shadow from '../styles/shadow';

const ELEVATION = 1;
const DEFAULT_MAX_WIDTH = 960;

type Props = $RemoveChildren<typeof Surface> & {
  /**
   * Whether banner is currently visible.
   */
  visible: boolean;
  /**
   * Content that will be displayed inside banner.
   */
  children: string;
  /**
   * Icon to display for the `Banner`. Can be an image.
   */
  icon?: IconSource;
  /**
   * Action items to shown in the banner.
   * An action item should contain the following properties:
   *
   * - `label`: label of the action button (required)
   * - `onPress`: callback that is called when button is pressed (required)
   *
   * To customize button you can pass other props that button component takes.
   */
  actions: Array<{
    label: string;
    onPress: () => void;
  }>;
  /**
   * Style of banner's inner content.
   * Use this prop to apply custom width for wide layouts.
   */
  contentStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  /**
   * @optional
   */
  theme: Theme;
};

type State = {
  position: Animated.Value;
  layout: {
    height: number;
    measured: boolean;
  };
};

type NativeEvent = {
  nativeEvent: {
    layout: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  };
};

/**
 * Banner displays a prominent message and related actions.
 *
 * <div class="screenshots">
 *   <img class="medium" src="screenshots/banner.gif" />
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Image } from 'react-native';
 * import { Banner } from 'react-native-paper';
 *
 * export default class MyComponent extends React.Component {
 *   state = {
 *     visible: true,
 *   };
 *
 *   render() {
 *     return (
 *       <Banner
 *         visible={this.state.visible}
 *         actions={[
 *           {
 *             label: 'Fix it',
 *             onPress: () => this.setState({ visible: false }),
 *           },
 *           {
 *             label: 'Learn more',
 *             onPress: () => this.setState({ visible: false }),
 *           },
 *         ]}
 *         icon={({ size }) =>
 *           <Image
 *             source={{ uri: 'https://avatars3.githubusercontent.com/u/17571969?s=400&v=4' }}
 *             style={{
 *               width: size,
 *               height: size,
 *             }}
 *           />
 *         }
 *       >
 *         There was a problem processing a transaction on your credit card.
 *       </Banner>
 *     );
 *   }
 * }
 * ```
 */
class Banner extends React.Component<Props, State> {
  state = {
    position: new Animated.Value(this.props.visible ? 1 : 0),
    layout: {
      height: 0,
      measured: false,
    },
  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps.visible !== this.props.visible) {
      this.toggle();
    }
  }

  private handleLayout = ({ nativeEvent }: NativeEvent) => {
    const { height } = nativeEvent.layout;

    this.setState({ layout: { height, measured: true } });
  };

  private toggle = () => {
    if (this.props.visible) {
      this.show();
    } else {
      this.hide();
    }
  };

  private show = () => {
    const { animation } = this.props.theme;
    Animated.timing(this.state.position, {
      duration: 250 * animation.scale,
      toValue: 1,
    }).start();
  };

  private hide = () => {
    const { animation } = this.props.theme;
    Animated.timing(this.state.position, {
      duration: 200 * animation.scale,
      toValue: 0,
    }).start();
  };

  render() {
    const {
      visible,
      icon,
      children,
      actions,
      contentStyle,
      style,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      theme,
      ...rest
    } = this.props;
    const { position, layout } = this.state;

    // The banner animation has 2 parts:
    // 1. Blank spacer element which animates its height to move the content
    // 2. Actual banner which animates its translateY
    // In initial render, we position everything normally and measure the height of the banner
    // Once we have the height, we apply the height to the spacer and switch the banner to position: absolute
    // We need this because we need to move the content below as if banner's height was being animated
    // However we can't animated banner's height directly as it'll also resize the content inside
    const height = Animated.multiply(position, layout.height);

    const translateY = Animated.multiply(
      Animated.add(position, -1),
      layout.height
    );
    return (
      <Surface
        {...rest}
        style={[styles.container, shadow(ELEVATION) as ViewStyle, style]}
      >
        <View style={[styles.wrapper, contentStyle]}>
          <Animated.View style={{ height }} />
          <Animated.View
            onLayout={this.handleLayout}
            style={[
              layout.measured || !visible
                ? // If we have measured banner's height or it's invisible,
                  // Position it absolutely, the layout will be taken care of the spacer
                  [styles.absolute, { transform: [{ translateY }] }]
                : // Otherwise position it normally
                  null,
              !layout.measured && !visible
                ? // If we haven't measured banner's height yet and it's invisible,
                  // hide it with opacity: 0 so user doesn't see it
                  { opacity: 0 }
                : null,
            ]}
          >
            <View style={styles.content}>
              {icon ? (
                <View style={styles.icon}>
                  {/*
                  // @ts-ignore */}
                  <Icon source={icon} size={40} />
                </View>
              ) : null}
              <Text style={styles.message}>{children}</Text>
            </View>
            <View style={styles.actions}>
              {actions.map(({ label, ...others }, i) => (
                <Button
                  key={/* eslint-disable-line react/no-array-index-key */ i}
                  compact
                  mode="text"
                  style={styles.button}
                  {...others}
                >
                  {label}
                </Button>
              ))}
            </View>
          </Animated.View>
        </View>
      </Surface>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    elevation: ELEVATION,
  },
  wrapper: {
    overflow: 'hidden',
    alignSelf: 'center',
    width: '100%',
    maxWidth: DEFAULT_MAX_WIDTH,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: 8,
    marginTop: 16,
    marginBottom: 0,
  },
  icon: {
    margin: 8,
  },
  message: {
    flex: 1,
    margin: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 4,
  },
  button: {
    margin: 4,
  },
});

export default withTheme(Banner);
