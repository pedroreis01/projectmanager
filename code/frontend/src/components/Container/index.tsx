import React, { FC } from 'react';
import * as C from './style';

interface ContainerProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  background?: 'gray' | 'white';
  p?: string;
}

const Container: FC<ContainerProps> = ({
  children,
  background,
  p,
  ...rest
}) => {
  return (
    <C.Container $background={background} $p={p} {...rest}>
      {children}
    </C.Container>
  );
};

export default Container;
