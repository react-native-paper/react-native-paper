import * as React from 'react';

type Props = {
  /**
   * Function to execute on selection change.
   */
  onValueChange: (value: string | number) => void;
  /**
   * Value of the currently selected radio button.
   */
  value: string | number;
  /**
   * React elements containing radio buttons.
   */
  children: React.ReactNode;
};

export type RadioButtonContextType = {
  value: string | number;
  onValueChange: (item: string | number) => void;
};

export const RadioButtonContext = React.createContext<RadioButtonContextType>(
  null as any
);

/**
 * Radio button group allows to control a group of radio buttons.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="medium" src="screenshots/radio-button-group-android.gif" />
 *  <figcaption>Android</figcaption>
 *   </figure>
 *   <figure>
 *     <img class="medium" src="screenshots/radio-button-group-ios.gif" />
 *  <figcaption>iOS</figcaption>
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { View } from 'react-native';
 * import { RadioButton, Text } from 'react-native-paper';
 *
 * export default class MyComponent extends React.Component {
 *   state = {
 *     value: 'first',
 *   };
 *
 *   render() {
 *     return(
 *       <RadioButton.Group
 *         onValueChange={value => this.setState({ value })}
 *         value={this.state.value}
 *       >
 *         <View>
 *           <Text>First</Text>
 *           <RadioButton value="first" />
 *         </View>
 *         <View>
 *           <Text>Second</Text>
 *           <RadioButton value="second" />
 *         </View>
 *       </RadioButton.Group>
 *     )
 *   }
 * }
 *```
 */
class RadioButtonGroup extends React.Component<Props> {
  static displayName = 'RadioButton.Group';

  render() {
    const { value, onValueChange, children } = this.props;

    return (
      <RadioButtonContext.Provider value={{ value, onValueChange }}>
        {children}
      </RadioButtonContext.Provider>
    );
  }
}

export default RadioButtonGroup;
