const { v4: uuidv4 } = require("uuid");

exports.generateId = () => {
  const uniqueId = uuidv4();
  return uniqueId;
};
