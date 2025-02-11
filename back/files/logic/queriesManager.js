const bcryptjs = require("bcryptjs");
require("dotenv").config();

const compare = async (text, hash) => {
  return await bcryptjs.compare(text, hash);
};

const COMPARE_SECRET_SERVICE_API = async (key, fun, reject) => {
  if (await compare(process.env.APP_PASSWORD, key)) fun();
  else reject();
};

const serviceErrorHandler = {
  not_found: (res) => res.send({ not_found: true }),
};

exports.compare = compare;
exports.verifyServer = COMPARE_SECRET_SERVICE_API;
exports.serviceErrorHandler = serviceErrorHandler;
