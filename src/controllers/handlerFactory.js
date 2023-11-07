const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const obj = await Model.findByPk(req.params.id, next);

    res.status(200).json({
      status: 'success',
      data: {
        data: obj.format(),
      },
    });
  });

exports.postUpdate = (Model) =>
  catchAsync(async (req, res, next) => {
    const obj = findModel(req.params.id, next);
  });

const findModel = (id, next) => {
  const obj = Model.findByPk(id);
  if (!obj) return next(new AppError(`No data found for user with id: ${id}`));
  return obj;
};
