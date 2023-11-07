const bcryptjs = require("bcryptjs");

const encrypt = async (text) => {
  return await bcryptjs.hash(text, 10);
}

const compare = async (text, hash) => {
  return await bcryptjs.compare(text, hash);
}

exports.encrypt = encrypt;
exports.compare = compare;