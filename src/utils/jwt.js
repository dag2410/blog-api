require("dotenv").config();

const crypto = require("crypto");

const base64Encode = (string) => {
  const encode = Buffer.from(string, "utf8").toString("base64");
  return encode.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
};

const base64Decode = (base64url) => {
  const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "="
  );
  return Buffer.from(padded, "base64").toString("utf8");
};

const generateSignature = (header, payload) => {
  const hmac = crypto.createHmac("sha256", process.env.JWT_SECRET);
  hmac.update(`${header}.${payload}`);
  const signature = hmac.digest("base64url");
  return signature;
};

//ttl : time to life
const sign = (_payload, ttl = 3600) => {
  const header = base64Encode(
    JSON.stringify({
      alg: "HS256",
      typ: "JWT",
    })
  );
  const payload = base64Encode(
    JSON.stringify({
      exp: Math.floor(Date.now() / 1000) + ttl,
      ..._payload,
    })
  );

  const signature = generateSignature(header, payload);
  const token = `${header}.${payload}.${signature}`;
  return token;
};

const verify = (token) => {
  const tokens = token.replace("Bearer ", "").split(".");
  const header = JSON.parse(base64Decode(tokens[0]));
  const payload = JSON.parse(base64Decode(tokens[1]));
  const tokenSignature = tokens[2];
  const signature = generateSignature(tokens[0], tokens[1]);

  if (tokenSignature !== signature) {
    //response 401 authorized.
    console.log("401 authorized");
    return;
  }

  const now = Math.floor(Date.now() / 1000);
  if (payload.exp < now) {
    console.log("het han");
    return;
  }
  console.log("token hop le ");
};
const myToken = `Bearer ${sign({ userId: 10 })}`;

verify(myToken);
