const useValidate = () => {
  const phoneRemoveCharRegex = /[-\s]/g;
  const phoneRegex = /^\+?[\d]{10,11}$/;

  const isPhoneNumber = (phone: string): boolean => {
    if (phoneRegex.test(phone.replace(phoneRemoveCharRegex, ''))) {
      return true;
    }

    return false;
  };

  const getType = (value: string): string => {
    if (isPhoneNumber(value)) {
      return 'Phone';
    }

    return 'Text';
  };

  return {isPhoneNumber, getType};
};

export default useValidate;
