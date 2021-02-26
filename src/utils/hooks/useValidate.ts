import {EType} from '../types';

const useValidate = () => {
  const phoneRemoveCharRegex = /[-\s]/g;
  const phoneRegex = /^\+?[\d]{10,11}$/;
  const emailRemoveCharRegex = /[\s]/g;
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const webLinkRemoveCharRegex = /[\s]/g;
  const webLinkRegex = /^https?:\/\/([\w\d\\-]+\.)+\w{2,}(\/.+)?$/;

  const isPhoneNumber = (phone: string): boolean => {
    return phoneRegex.test(phone.replace(phoneRemoveCharRegex, ''));
  };

  const isEmail = (email: string): boolean => {
    return emailRegex.test(email.replace(emailRemoveCharRegex, ''));
  };

  const isWebLink = (webLink: string): boolean => {
    return webLinkRegex.test(webLink.replace(webLinkRemoveCharRegex, ''));
  };

  const getType = (value: string): EType => {
    if (isPhoneNumber(value)) {
      return 'Phone';
    } else if (isEmail(value)) {
      return 'Email';
    } else if (isWebLink(value)) {
      return 'Web Link';
    }

    return 'Text';
  };

  return {isPhoneNumber, isEmail, isWebLink, getType};
};

export default useValidate;
