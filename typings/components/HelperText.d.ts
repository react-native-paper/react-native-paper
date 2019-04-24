import * as React from 'react';
import { ThemeShape } from '../types';

export interface HelperTextProps {
  type?: 'error' | 'info';
  visible?: boolean;
  padding?: 'none'|'normal',
  children: React.ReactNode;
  style?: any;
  theme?: ThemeShape;
}

export declare class HelperText extends React.Component<HelperTextProps> {}
