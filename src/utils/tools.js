const getRandomHexColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]; // 随机生成一个十六进制字符
  }
  return color;
};

export { getRandomHexColor };
