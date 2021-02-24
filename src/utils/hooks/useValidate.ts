const useValidate = () => {
  const isPhoneNumber = (phone: string): boolean => {
    if (phone) {
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
