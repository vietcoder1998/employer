export const getNumberWithDot = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
export const convertSalary = (min, max, unit) => {
    if (max == 0 && min == 0) {
      return 'Lương Thỏa Thuận';
    } else if (max == 0 && min != 0) {
      return ` ${getNumberWithDot(min)}đ/${unit} (tối thiểu)`;
    } else if (max != 0 && min == 0) {
      return ` ${getNumberWithDot(max)}đ/${unit} (tối đa)`;
    }
    return ` ${getNumberWithDot(min)}đ - ${getNumberWithDot(max)}đ/${unit}`;
  };