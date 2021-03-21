const getOrdinal = (num) => {
  const str = num.toString();
  console.log(str)
  if (str.endsWith('12') ||
    str.endsWith('13') ||
    str.endsWith('16') ||
    str.endsWith('17') ||
    str.endsWith('18')) {
      return ' -ый ';
    } else if (str.endsWith('2') ||
      str.endsWith('6') ||
      str.endsWith('7') ||
      str.endsWith('8') ||
      str.endsWith('40')) {
    return ' -ой ';
  } else if (str.endsWith('3')) {
    return ' -ий ';
  } else {
    return ' -ый ';
  }
}

export default getOrdinal;
