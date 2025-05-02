const router = require('express').Router();
const authRouter = require('./auth-route');
const userRouter = require('./user-route');
const accountRouter = require('./account-route');
const {
  sendImageTest,
  downloadImage
} = require('../controllers/test-controller');
const { multerUpload } = require('../utils/multer-config');

const multer = multerUpload.single('profile');

router.post('/image-test', multer, sendImageTest);

router.get('/download-image', downloadImage);

router.use('/auth', authRouter);

router.use('/users', userRouter);

router.use('/account', accountRouter);

module.exports = router;
