import React, { useEffect } from 'react';
import useAlert from '../../hooks/useAlert';
import { AlertCard, AlertCardThemeData, AlertIcon, BodyAlert, ContentAlertWrapper, AlertClose, AlertTextWrap, TitleAlert } from './style';
import { BiSolidCheckCircle, BiSolidErrorCircle } from "react-icons/bi";
import { IoCloseCircleSharp } from "react-icons/io5";
import { IoIosClose } from 'react-icons/io';

type AlertType = 'info' | 'success' | 'danger';
interface AlertConfigData {
  id: string;
  title: string;
  message: string;
  type?: 'info' | 'success' | 'danger';
  canClose?: boolean;
  autoClose?: {
    timeOut: number;
  };
  children?: React.ReactNode;
}

const AlertPopUp: React.FC<AlertConfigData> = (params) => {
  const { removeAlert } = useAlert();

  const getAlertPopUpTheme = (alertType: string | undefined) => {
    let result: AlertCardThemeData = {
      backGround: ''
    };

    switch (alertType) {
      case 'success':
        result = {
          backGround: '#356e6b'
        };
        break;
      case 'danger':
        result = {
          backGround: '#974c4c'
        };
        break;
      default:
        result = {
          backGround: '#a39b54'
        };
        break;
    }
    return result;
  }

  const getAlertIcon = (alertType: string | undefined) => {
    switch (alertType) {
      case 'success':
        return <BiSolidCheckCircle size={28} color='#FFFFFF' />
      case 'danger':
        return <IoCloseCircleSharp size={28} color='#FF6060' />
      default:
        return <BiSolidErrorCircle size={28} color='#FFF065' />
    }
  }


  useEffect(() => {
    const timer = setTimeout(() => {
      removeAlert(params.id);
    }, params.autoClose?.timeOut ?? 10000);

    return () => clearTimeout(timer);
  }, [removeAlert, params]);

  return (
    <AlertCard theme={getAlertPopUpTheme(params.type)}>
      <AlertIcon>
        {getAlertIcon(params.type)}
      </AlertIcon>
      <ContentAlertWrapper>
        <AlertTextWrap>
          <TitleAlert>
            {params.title}
          </TitleAlert>
          <BodyAlert>{params.message}</BodyAlert>
          {params.children}
        </AlertTextWrap>
        <AlertClose theme={getAlertPopUpTheme(params.type)}>
          {(params?.canClose ?? true) && <IoIosClose size={20} onClick={() => removeAlert(params.id)} />}
        </AlertClose>
      </ContentAlertWrapper>
    </AlertCard>
  );
};

export { AlertCard };
export type { AlertType, AlertConfigData };
export default AlertPopUp;
