import styled, { css } from 'styled-components';

export const Text = styled.div<{
  $fontSize?: string;
  $fontWeigth?: string;
  $color?: string;
  $m?: string;
  $mt?: string;
  $mr?: string;
  $mb?: string;
  $ml?: string;
}>`
  margin: ${(props) => (props.$m ? props.$m : 0)};
  margin-top: ${(props) => (props.$mt ? props.$mt : 0)};
  margin-right: ${(props) => (props.$mr ? props.$mr : 0)};
  margin-bottom: ${(props) => (props.$mb ? props.$mb : 0)};
  margin-left: ${(props) => (props.$ml ? props.$ml : 0)};
  font-family: 'DM Sans', sans-serif;

  ${(props) => {
    switch (props.$fontSize) {
      case 'titleh1':
        return css`
          font-size: 50px;
          font-weight: 600;
        `;
      case 'titleh2':
        return css`
          font-size: 32px;
          font-weight: 600;
        `;
      case 'titleh3':
        return css`
          font-size: 20px;
          font-weight: 500;
        `;
      case 'subtitle':
        return css`
          font-size: 26px;
          font-weight: 200;
        `;
      case 'paragraph':
        return css`
          font-size: 20px;
          font-weight: 200;
        `;
      case 'small':
        return css`
          font-size: 12px;
          font-weight: 300;
        `;
      default:
        return css`
          font-size: 16px;
          font-weight: 200;
        `;
    }
  }}

  font-weight: ${(props) => {
    if (props.$fontWeigth) {
      if (props.$fontWeigth == 'bold') {
        return 'bold';
      } else if (props.$fontWeigth == 'semiBold') {
        return '600';
      } else if (props.$fontWeigth == 'normal') {
        return '';
      }
    }
  }};
  font-style: normal;

  /* display: inline; */

  color: ${(props) => {
    if (props.$color === 'light') return '#FFFFFF';
    else if (props.$color === 'dark') return '#012025';
    else if (props.$color === 'primary') return '#00DCFF';
    else if (props.$color === 'warning') return '#FFF065';
    else if (props.$color === 'success') return '#25D366';
    else return '#000';
  }};

  @media screen and (max-width: 767px) {
    font-size: ${(props) => {
      switch (props.$fontSize) {
        case 'titleh1':
          return '28px';
        case 'titleh2':
          return '24px';
        case 'titleh3':
          return '16px';
        case 'subtitle':
          return '20px';
        case 'paragraph':
          return '16px';
        case 'small':
          return '14px';
        default:
          return '16px';
      }
    }};
  }
`;

export const SkeletonText = styled.p<{
  fontSize?: string;
  m?: string;
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
}>`
  margin: ${(props) => (props.m ? props.m : 0)};
  margin-top: ${(props) => (props.mt ? props.mt : 0)};
  margin-right: ${(props) => (props.mr ? props.mr : 0)};
  margin-bottom: ${(props) => (props.mb ? props.mb : 0)};
  margin-left: ${(props) => (props.ml ? props.ml : 0)};
  font-family: 'DM Sans', sans-serif;

  border-radius: 4px;
  min-width: 25px;
  width: 100%;
  background: linear-gradient(
    to right,
    rgba(130, 130, 130, 0.7) 8%,
    rgba(130, 130, 130, 0.7) 18%,
    rgba(130, 130, 130, 0.6) 33%
  );
  background-size: 800px 100px;
  animation: wave-lines 2s infinite ease-out;

  @keyframes wave-lines {
    0% {
      background-position: -468px 0;
    }
    100% {
      background-position: 468px 0;
    }
  }

  ${(props) => {
    switch (props.fontSize) {
      case 'titleh1':
        return css`
          height: 55px;
        `;
      case 'titleh2':
        return css`
          height: 37px;
        `;
      case 'titleh3':
        return css`
          height: 25px;
        `;
      case 'subtitle':
        return css`
          height: 31px;
        `;
      case 'paragraph':
        return css`
          height: 25px;
        `;
      case 'nav':
        return css`
          height: 21px;
        `;
      case 'small':
        return css`
          height: 17px;
        `;
      default:
        return css`
          height: 21px;
        `;
    }
  }}

  @media screen and (max-width: 767px) {
    height: ${(props) => {
      switch (props.fontSize) {
        case 'titleh1':
          return '28px';
        case 'titleh2':
          return '24px';
        case 'titleh3':
          return '16px';
        case 'subtitle':
          return '20px';
        case 'paragraph':
          return '16px';
        case 'nav':
          return '10px';
        case 'small':
          return '10px';
        default:
          return '16px';
      }
    }};
  }
`;
