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

exports.postCreate = (Model) => {
  return catchAsync(async (req, res, _) => {
    await Model.create({ ...req.body });

    const models = await Model.findAll();
    if (!models) {
      return res.status(201).send({
        success: true,
        results: 0,
        data: { data: [] },
      });
    }
    console.log(models);

    return res.status(201).send({
      success: true,
      results: models.length,
      data: { data: models.map((model) => model.format()) },
    });
  });
};

exports.patchUpdate = (Model) =>
  catchAsync(async (req, res, next) => {
    const obj = await findModel(req.params.id, next);

    const updated = await obj.update({ ...req.body });
    res.status(200).json({
      status: 'success',
      data: {
        data: { ...updated.format() },
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const models = await Model.findAll();
    if (!models) {
      return res.status(201).send({
        success: true,
        results: 0,
        data: { data: [] },
      });
    }
    // console.log('Models: ', models);
    return res.status(201).send({
      success: true,
      results: models.length,
      data: { data: models.map((model) => model.format()) },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const instance = await Model.findByPk(req.params.id);
    await instance.destroy();
    res.status(204).json({ status: 'success', data: null });
  });

const findModel = (id, next) => {
  const obj = Model.findByPk(id);
  if (!obj) return next(new AppError(`No data found for user with id: ${id}`));
  return obj;
};
