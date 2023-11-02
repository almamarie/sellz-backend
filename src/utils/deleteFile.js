const fs = require("fs");

exports.deleteFile = async (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      throw new Error("Failed to delete file: ", filePath);
    }
  });
};
