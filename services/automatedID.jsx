export const automatedID = () => {
  let id = "";
  const alphaNum =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  const length = 24;

  for (let index = 0; index < length; index++) {
    id += alphaNum.charAt(Math.floor(Math.random() * alphaNum.length));
  }

  return id;
};
