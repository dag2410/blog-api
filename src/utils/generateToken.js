function generateToken(length = 32) {
  const character =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";

  for (let i = 0; i < character.length; i++) {
    const randInd = Math.floor(Math.random() * character.length);
    token += character[randInd];
  }

  return token;
}

module.exports = generateToken;
