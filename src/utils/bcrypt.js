const bcrypt = require("bcrypt");
const saltRound = 10;

exports.hash = (plainPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(plainPassword, saltRound, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
};

exports.compare = (userPassword, storedPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(userPassword, storedPassword, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};
