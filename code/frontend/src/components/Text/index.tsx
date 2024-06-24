import * as React from 'react';
import * as C from './style';

export interface ParagraphProps extends React.HTMLProps<HTMLParagraphElement> {
  fontSize?: "titleh1" | "titleh2" | "titleh3" | "subtitle" | "paragraph" | "small";
  fontWeight?: "normal" | "semiBold" | "bold";
  color?: "primary" | "light" | "dark" | "warning" | "success";
  m?: string;
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  isLoading?: boolean;
  children: React.ReactNode;
}

const Text: React.FC<ParagraphProps> = ({
  fontSize,
  fontWeight,
  color,
  m,
  mt,
  mr,
  mb,
  ml,
  isLoading,
  children,
  ...rest
}) => {
  return (
    isLoading ? (
      <C.SkeletonText
        m={m}
        mt={mt}
        mr={mr}
        mb={mb}
        ml={ml}
        fontSize={fontSize}
        {...rest}
      >
        <></>
      </C.SkeletonText>
    ) : (
      <C.Text
        $color={color}
        $m={m}
        $mt={mt}
        $mr={mr}
        $mb={mb}
        $ml={ml}
        $fontWeigth={fontWeight}
        $fontSize={fontSize}
        {...rest}
      >
        {children}
      </C.Text>
    )
  );
};

export default Text;
