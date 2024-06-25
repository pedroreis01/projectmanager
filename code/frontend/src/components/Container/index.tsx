import React, { FC } from 'react';
import * as C from './style';

interface ContainerProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  background?: "gray" |"white";
  p?: string;
  pt?: string;
  pr?: string;
  pb?: string;
  pl?: string;
}

const Container: FC<ContainerProps> = ({
  children,
  background,
  p,
  pt,
  pr,
  pb,
  pl,
  ...rest }) => {
  return (
    <C.Container $background={background}
      $p={p}
      $pt={pt}
      $pr={pr}
      $pb={pb}
      $pl={pl}
      {...rest}>
      {children}
    </C.Container>
  );
};

export default Container;
