const { join } = require('node:path');
const sendImageTest = (req, res, next) => {
  console.log(req.file);
  console.log(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      body: req.body,
      file: req.file
    }
  });
};

const downloadImage = (req, res, next) => {
  // res.sendFile
  res.download(
    join(__dirname, '../public/images/avatars/users-default-avatar.jpeg')
  );
};

module.exports = { sendImageTest, downloadImage };
