import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

export const Button = styled.button<{
  $color?: string;
  $size?: string;
  $fullWidth?: boolean;
  $round?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${(props) => (!props.$round ? '6px;' : '50%;')};

  cursor: pointer;
  font-weight: 500;
  ${(props) => {
    switch (props.$size) {
      case 'small':
        return css`
          font-size: 0.8rem;
          & > span {
            width: 1rem !important;
            height: 1rem !important;
          }
        `;
      case 'medium':
        return css`
          font-size: 1rem;
          & > span {
            width: 1rem !important;
            height: 1rem !important;
          }
        `;
      case 'large':
        return css`
          font-size: 1.2rem;
          & > span {
            width: 1rem !important;
            height: 1rem !important;
          }
        `;
      default:
        return css`
          font-size: 1rem;
          & > span {
            width: 1rem !important;
            height: 1rem !important;
          }
        `;
    }
  }};

  padding: ${(props) => {
    if (props.$round) {
      return '10px 10px';
    }
    switch (props.$size) {
      case 'small':
        return '8px 30px';
      case 'medium':
        return '10px 25px';
      case 'large':
        return '12px 40px';
      default:
        return '10px 25px';
    }
  }};

  width: ${(props) => (props.$fullWidth ? '100%' : 'auto')};

  ${(props) =>
    (props.$color === 'primary' || !props.$color) &&
    css`
      background: #329fc8;
      color: #fff;
      & * {
        color: #fff;
      }
      &:hover {
        background: ${darken(0.1, '#329fc8')};
      }
      &:disabled {
        & > span {
          border-color: ${lighten(0.2, '#329fc8')} ${lighten(0.2, '#329fc8')}
            transparent !important;
        }
      }
    `}

  ${(props) =>
    props.$color === 'submit' &&
    css`
      background: #0c9f96;
      color: #fff;
      & * {
        color: #fff;
      }
      &:hover {
        background: ${darken(0.1, '#0c9f96')};
      }
      &:disabled {
        & > span {
          border-color: ${lighten(0.2, '#0c9f96')} ${lighten(0.2, '#0c9f96')}
            transparent !important;
        }
      }
    `}

    ${(props) =>
    props.$color === 'danger' &&
    css`
      background: #ff6a6a;
      color: #012025;
      & * {
        color: #012025;
      }
      &:hover {
        background: ${darken(0.1, '#FF6A6A')};
      }
      &:disabled {
        & > span {
          border-color: ${lighten(0.2, '#ff6a6a')} ${lighten(0.2, '#ff6a6a')}
            transparent !important;
        }
      }
    `}

    &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  @media only screen and (max-width: 768px) {
    max-width: unset;
  }
`;

export const IconDiv = styled.div<{
  $mr?: number;
  $ml?: number;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: ${(props) => (props.$mr ? `${props.$mr}px` : 0)};
  margin-left: ${(props) => (props.$ml ? `${props.$ml}px` : 0)};
  > * {
    margin: 0 !important;
    padding: 0 !important;
  }
`;
