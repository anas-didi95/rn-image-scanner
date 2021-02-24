const useValidate = () => {
  const phoneRemoveCharRegex = /[-\s]/g;
  const phoneRegex = /^\+?[\d]{10,11}$/;
  const emailRemoveCharRegex = /[\s]/g;
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const isPhoneNumber = (phone: string): boolean => {
    if (phoneRegex.test(phone.replace(phoneRemoveCharRegex, ''))) {
      return true;
    }

    return false;
  };

  const isEmail = (email: string): boolean => {
    if (emailRegex.test(email.replace(emailRemoveCharRegex, ''))) {
      return true;
    }

    return false;
  };

  const getType = (value: string): string => {
    if (isPhoneNumber(value)) {
      return 'Phone';
    } else if (isEmail(value)) {
      return 'Email';
    }

    return 'Text';
  };

  return {isPhoneNumber, isEmail, getType};
};

export default useValidate;
