const User = require('../models/user');
const logger = require('../logs/logger');
const passwordFunctions = require('../utils/auth');
const multer = require('multer');
const { generateId } = require('../utils/generateId');
const { cloudinaryImageUpload } = require('../databases/cloudinary');
const { deleteFile } = require('../utils/deleteFile');
const catchAsync = require('../utils/catchAsync');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/public/img/new-user');
  },

  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    const id = req.body.email
      ? req.body.email.split('@')[0]
      : req.params.userId;
    cb(null, `user-${id}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadUserPhoto = upload.single('profilePicture');

exports.postCreateUser = catchAsync(
  async (req, res, next) => {
    logger.info('Creating a new user...');
    const profilePicturePath = req.file.path;

    // try {
    const identicalUser = await User.findAll({
      where: { email: req.body.email },
    });

    // console.log("Identical users: ", identicalUser);
    if (identicalUser.length > 1) throw new Error('User may already exists');

    if (req.body.password.length < 8)
      throw new Error('provided password is not strong');

    const passwordHash = await passwordFunctions.generateHashPassword(
      req.body.password
    );

    const userId = generateId();
    const profilePicture = await cloudinaryImageUpload(profilePicturePath);
    const newUser = await User.create({
      ...req.body,
      passwordHash,
      userId,
      profilePicture,
    });

    deleteFile(profilePicturePath);

    return res.status(201).send({
      success: true,
      data: { user: newUser.format() },
    });
    // } catch (error) {
    //   console.log(error);

    //   return res
    //     .status(400)
    //     .send({ success: false, body: "Error creating user." });
    // }
  },
  (req, res) => {
    const profilePicture = req.file.path;
    deleteFile(profilePicture);
  }
);

exports.patchUpdateUser = async (req, res) => {
  logger.info('Update user called...');

  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User may not exist');
    }

    await user.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      otherNames: req.body.otherNames,
      birthdate: req.body.birthdate,
      address: req.body.address,
    });

    await user.save();

    return res.status(201).send({
      success: true,
      data: { user: user.format() },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ success: false, body: 'Error updating user.' });
  }
};

exports.patchUpdateProfilePhoto = async (req, res) => {
  logger.info('Creating a new user...');
  const profilePicturePath = req.file.path;

  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    if (!user) throw new Error();

    const profilePicture = await cloudinaryImageUpload(profilePicturePath);

    await user.update({ profilePicture });
    await user.save();

    deleteFile(profilePicturePath);

    return res.status(201).send({
      success: true,
      data: { user: user.format() },
    });
  } catch (error) {
    console.log(error);
    deleteFile(profilePicturePath);
    return res
      .status(400)
      .send({ success: false, body: 'Error creating user.' });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findByPk(userId);

    if (!user) throw new Error();

    return res.status(200).send({
      success: true,
      data: { user: user.format() },
    });
  } catch (error) {
    return res.status(400).send({ success: false, body: 'User not found.' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    if (!user) throw new Error();
    await user.destroy();
    return res.status(200).send({ success: true, data: 'User deleted.' });
  } catch (error) {
    res.status(400).send({ success: false, body: 'An error occured' });
  }
};
