/* @flow */

import * as React from 'react';
import createReactContext, { type Context } from 'create-react-context';

type Props = {
  /**
   * React elements containing radio buttons
   */
  children: React.Node,
  /**
   * Function to execute on selection change
   */
  onValueChange: (value: string) => mixed,
  /**
   * Value of currently selected Radio
   */
  value: string,
};

type Ctx = {
  value: string,
  onValueChange: (item: string) => mixed,
  passed: boolean,
};

/**
 * RadioGroup allows the selection of a single RadioButton
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { View } from 'react-native';
 * import { RadioGroup, RadioButton } from 'react-native-paper';
 *
 * export default class MyComponent extends Component {
 *   state = {
 *     value: 'first',
 *   };
 *
 *   render() {
 *     return(
 *       <RadioGroup
 *         onValueChange={value => this.setState({ value })}
 *         value={this.state.value}
 *       >
 *         <View>
 *           <RadioButton value="first" />
 *         </View>
 *         <View>
 *           <RadioButton value="second" />
 *         </View>
 *       </RadioGroup>
 *     )
 *   }
 * }
 *```
 */

export const RadioGroupContext: Context<Ctx> = createReactContext({
  value: '',
  passed: false,
  onValueChange: () => {},
});

class RadioGroup extends React.Component<Props> {
  render() {
    const { value, onValueChange, children } = this.props;

    return (
      <RadioGroupContext.Provider
        value={{ value, onValueChange, passed: true }}
      >
        {children}
      </RadioGroupContext.Provider>
    );
  }
}

export default RadioGroup;
