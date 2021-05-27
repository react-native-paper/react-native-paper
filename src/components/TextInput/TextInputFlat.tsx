import * as React from 'react';
import {
  View,
  Animated,
  TextInput as NativeTextInput,
  StyleSheet,
  I18nManager,
  Platform,
  TextStyle,
} from 'react-native';
import color from 'color';
import InputLabel from './Label/InputLabel';
import TextInputAdornment, {
  TextInputAdornmentProps,
} from './Adornment/TextInputAdornment';
import type { RenderProps, ChildTextInputProps } from './types';

import {
  MAXIMIZED_LABEL_FONT_SIZE,
  MINIMIZED_LABEL_FONT_SIZE,
  LABEL_WIGGLE_X_OFFSET,
  ADORNMENT_SIZE,
  FLAT_INPUT_OFFSET,
} from './constants';

import {
  calculateLabelTopPosition,
  calculateInputHeight,
  calculatePadding,
  adjustPaddingFlat,
  interpolatePlaceholder,
  calculateFlatAffixTopPosition,
  calculateFlatInputHorizontalPadding,
} from './helpers';
import {
  getAdornmentConfig,
  getAdornmentStyleAdjustmentForNativeInput,
} from './Adornment/TextInputAdornment';
import { AdornmentSide, AdornmentType, InputMode } from './Adornment/enums';

const MIN_HEIGHT = 64;
const MIN_DENSE_HEIGHT_WL = 52;
const MIN_DENSE_HEIGHT = 40;

const MINIMIZED_LABEL_DEFAULT_LOGICAL_MARGIN_BOTTOM = 12;
const MINIMIZED_LABEL_LOGICAL_MARGIN_BOTTOM = 6;

class TextInputFlat extends React.Component<ChildTextInputProps> {
  static defaultProps = {
    disabled: false,
    error: false,
    multiline: false,
    editable: true,
    render: (props: RenderProps) => <NativeTextInput {...props} />,
  };

  render() {
    const {
      disabled,
      editable,
      label,
      error,
      selectionColor,
      underlineColor,
      dense,
      style,
      theme,
      render,
      multiline,
      parentState,
      innerRef,
      onFocus,
      forceFocus,
      onBlur,
      onChangeText,
      onLayoutAnimatedText,
      onLeftAffixLayoutChange,
      onRightAffixLayoutChange,
      left,
      right,
      placeholderTextColor,
      ...rest
    } = this.props;

    const { colors, fonts } = theme;
    const font = fonts.regular;
    const hasActiveOutline = parentState.focused || error;

    const {
      fontSize: fontSizeStyle,
      fontWeight,
      height,
      paddingTop: paddingTopStyle,
      paddingHorizontal,
      textAlign,
      ...viewStyle
    } = (StyleSheet.flatten(style) || {}) as TextStyle;
    const fontSize = fontSizeStyle || MAXIMIZED_LABEL_FONT_SIZE;

    const minimizedLabelLogicalMarginTop =
      typeof paddingTopStyle === 'number'
        ? paddingTopStyle
        : MINIMIZED_LABEL_DEFAULT_LOGICAL_MARGIN_BOTTOM;

    const isPaddingHorizontalPassed =
      paddingHorizontal !== undefined && typeof paddingHorizontal === 'number';

    const adornmentConfig = getAdornmentConfig({
      left,
      right,
    });

    let { paddingLeft, paddingRight } = calculateFlatInputHorizontalPadding({
      adornmentConfig,
    });

    if (isPaddingHorizontalPassed) {
      paddingLeft = paddingHorizontal as number;
      paddingRight = paddingHorizontal as number;
    }

    const { leftLayout, rightLayout } = parentState;

    const rightAffixWidth = right
      ? rightLayout.width || ADORNMENT_SIZE
      : ADORNMENT_SIZE;

    const leftAffixWidth = left
      ? leftLayout.width || ADORNMENT_SIZE
      : ADORNMENT_SIZE;

    const adornmentStyleAdjustmentForNativeInput = getAdornmentStyleAdjustmentForNativeInput(
      {
        adornmentConfig,
        rightAffixWidth,
        leftAffixWidth,
        paddingHorizontal,
        inputOffset: FLAT_INPUT_OFFSET,
        mode: InputMode.Flat,
      }
    );

    let inputTextColor,
      activeColor,
      underlineColorCustom,
      placeholderColor,
      errorColor;

    if (disabled) {
      inputTextColor = activeColor = color(colors.text)
        .alpha(0.54)
        .rgb()
        .string();
      placeholderColor = colors.disabled;
      underlineColorCustom = 'transparent';
    } else {
      inputTextColor = colors.text;
      activeColor = error ? colors.error : colors.primary;
      placeholderColor = colors.placeholder;
      errorColor = colors.error;
      underlineColorCustom = underlineColor || colors.disabled;
    }

    const containerStyle = {
      backgroundColor: theme.dark
        ? color(colors.background).lighten(0.24).rgb().string()
        : color(colors.background).darken(0.06).rgb().string(),
      borderTopLeftRadius: theme.roundness,
      borderTopRightRadius: theme.roundness,
    };

    const labelScale = MINIMIZED_LABEL_FONT_SIZE / fontSize;
    const fontScale = MAXIMIZED_LABEL_FONT_SIZE / fontSize;

    const labelWidth = parentState.labelLayout.width;
    const labelHeight = parentState.labelLayout.height;
    const labelHalfWidth = labelWidth / 2;
    const labelHalfHeight = labelHeight / 2;

    const baseLabelTranslateX =
      (I18nManager.isRTL ? 1 : -1) *
        (labelHalfWidth - (labelScale * labelWidth) / 2) +
      (1 - labelScale) * (I18nManager.isRTL ? -1 : 1) * paddingLeft;

    const minimizeLabelReservedHeight =
      minimizedLabelLogicalMarginTop +
      MINIMIZED_LABEL_FONT_SIZE +
      (dense ? 0 : MINIMIZED_LABEL_LOGICAL_MARGIN_BOTTOM);

    const minInputHeight =
      (dense ? (label ? MIN_DENSE_HEIGHT_WL : MIN_DENSE_HEIGHT) : MIN_HEIGHT) -
      minimizeLabelReservedHeight;

    const inputHeight = calculateInputHeight(
      labelHeight,
      height,
      minInputHeight
    );

    const topPosition = calculateLabelTopPosition(
      labelHeight,
      inputHeight,
      height ? 0 : minimizeLabelReservedHeight / 2 + 2
    );

    if (height && typeof height !== 'number') {
      // eslint-disable-next-line
      console.warn('Currently we support only numbers in height prop');
    }

    const paddingSettings = {
      height: height ? +height : null,
      labelHalfHeight,
      offset: FLAT_INPUT_OFFSET,
      multiline: multiline ? multiline : null,
      dense: dense ? dense : null,
      topPosition,
      fontSize,
      label,
      scale: fontScale,
      isAndroid: Platform.OS === 'android',
      styles: dense
        ? {
            paddingTop: 10 + minimizedLabelLogicalMarginTop,
            paddingBottom: 2,
          }
        : {
            paddingTop: 12 + minimizedLabelLogicalMarginTop,
            paddingBottom: 4,
          },
    };

    const pad = calculatePadding(paddingSettings);

    const paddingFlat = adjustPaddingFlat({
      ...paddingSettings,
      pad,
    });

    const baseLabelTranslateY =
      -topPosition -
      labelHalfHeight +
      minimizedLabelLogicalMarginTop +
      MINIMIZED_LABEL_FONT_SIZE / 2;

    const placeholderOpacity = hasActiveOutline
      ? interpolatePlaceholder(parentState.labeled, hasActiveOutline)
      : parentState.labelLayout.measured
      ? 1
      : 0;

    const minHeight =
      height ||
      (dense ? (label ? MIN_DENSE_HEIGHT_WL : MIN_DENSE_HEIGHT) : MIN_HEIGHT);

    const flatHeight = inputHeight + (height ? 0 : minimizeLabelReservedHeight);

    const iconTopPosition = (flatHeight - ADORNMENT_SIZE) / 2;

    const leftAffixTopPosition = leftLayout.height
      ? calculateFlatAffixTopPosition({
          height: flatHeight,
          ...paddingFlat,
          affixHeight: leftLayout.height,
        })
      : null;

    const rightAffixTopPosition = rightLayout.height
      ? calculateFlatAffixTopPosition({
          height: flatHeight,
          ...paddingFlat,
          affixHeight: rightLayout.height,
        })
      : null;

    const labelProps = {
      label,
      onLayoutAnimatedText,
      placeholderOpacity,
      error,
      placeholderStyle: styles.placeholder,
      baseLabelTranslateY,
      baseLabelTranslateX,
      font,
      fontSize,
      fontWeight,
      labelScale,
      wiggleOffsetX: LABEL_WIGGLE_X_OFFSET,
      topPosition,
      paddingOffset: { paddingLeft, paddingRight },
      hasActiveOutline,
      activeColor,
      placeholderColor,
      errorColor,
    };
    const affixTopPosition = {
      [AdornmentSide.Left]: leftAffixTopPosition,
      [AdornmentSide.Right]: rightAffixTopPosition,
    };
    const onAffixChange = {
      [AdornmentSide.Left]: onLeftAffixLayoutChange,
      [AdornmentSide.Right]: onRightAffixLayoutChange,
    };

    let adornmentProps: TextInputAdornmentProps = {
      paddingHorizontal,
      adornmentConfig,
      forceFocus,
      topPosition: {
        [AdornmentType.Affix]: affixTopPosition,
        [AdornmentType.Icon]: iconTopPosition,
      },
      onAffixChange,
      isTextInputFocused: this.props.parentState.focused,
    };
    if (adornmentConfig.length) {
      adornmentProps = {
        ...adornmentProps,
        left,
        right,
        textStyle: { ...font, fontSize, fontWeight },
        visible: this.props.parentState.labeled,
      };
    }

    return (
      <View style={[containerStyle, viewStyle]}>
        <Underline
          parentState={parentState}
          underlineColorCustom={underlineColorCustom}
          error={error}
          colors={colors}
          activeColor={activeColor}
        />
        <View
          style={[
            styles.labelContainer,
            {
              minHeight,
            },
          ]}
        >
          <InputLabel parentState={parentState} labelProps={labelProps} />
          {render?.({
            ...rest,
            ref: innerRef,
            onChangeText,
            placeholder: label
              ? parentState.placeholder
              : this.props.placeholder,
            placeholderTextColor: placeholderTextColor ?? placeholderColor,
            editable: !disabled && editable,
            selectionColor:
              typeof selectionColor === 'undefined'
                ? activeColor
                : selectionColor,
            onFocus,
            onBlur,
            underlineColorAndroid: 'transparent',
            multiline,
            style: [
              styles.input,
              { paddingLeft, paddingRight },
              !multiline || (multiline && height) ? { height: flatHeight } : {},
              paddingFlat,
              {
                ...font,
                fontSize,
                fontWeight,
                color: inputTextColor,
                textAlignVertical: multiline ? 'top' : 'center',
                textAlign: textAlign
                  ? textAlign
                  : I18nManager.isRTL
                  ? 'right'
                  : 'left',
              },
              Platform.OS === 'web' && { outline: 'none' },
              adornmentStyleAdjustmentForNativeInput,
            ],
          })}
        </View>
        <TextInputAdornment {...adornmentProps} />
      </View>
    );
  }
}

export default TextInputFlat;

type UnderlineProps = {
  parentState: {
    focused: boolean;
  };
  error?: boolean;
  colors: {
    error: string;
  };
  activeColor: string;
  underlineColorCustom?: string;
};

const Underline = ({
  parentState,
  error,
  colors,
  activeColor,
  underlineColorCustom,
}: UnderlineProps) => {
  let backgroundColor = parentState.focused
    ? activeColor
    : underlineColorCustom;
  if (error) backgroundColor = colors.error;
  return (
    <Animated.View
      style={[
        styles.underline,
        {
          backgroundColor,
          // Underline is thinner when input is not focused
          transform: [{ scaleY: parentState.focused ? 1 : 0.5 }],
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  placeholder: {
    position: 'absolute',
    left: 0,
  },
  underline: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 2,
  },
  labelContainer: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  input: {
    flexGrow: 1,
    margin: 0,
    zIndex: 1,
  },
});
