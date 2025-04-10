export const validateEmil = (emil: string) => {
  const regex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/ig;
  return regex.test(emil);
};

export const validateCode = (code: string) => {
  const regex = /^[A-Za-z0-9]{6}$/ig;
  return regex.test(code);
};

export const validatePassword = (password: string) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s'"<>;=]{8,16}$/ig;
  return regex.test(password);
};
export const validateUsername= (uusername: string) => {
  const regex = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/ig;
  return regex.test(uusername);
};
