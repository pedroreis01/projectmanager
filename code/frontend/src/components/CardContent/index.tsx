import * as React from 'react';
import * as C from './style';

export interface CardContent extends React.HTMLProps<HTMLDivElement> {
  title?: string;
  fullWidth?: boolean;
}

const Text: React.FC<CardContent> = ({
  children,
  fullWidth,
  title,
  ...rest
}) => {
  return (
    <C.CardContent $fullWidth={fullWidth} {...rest}>
      {children}
    </C.CardContent>
  );
};

export default Text;
