const db = require("../models");
const Category = db.category;
const Quizzes = db.quizzes;

exports.create = async (req, res) => {
  try {
    const data = await Category.create(req.body);
    res.json({
      message: "Category create successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};
exports.getAll = async (req, res) => {
  try {
    const category = await Category.findAll({
      include: [
        {
          model: Quizzes,
          as: "quizzess",
        },
      ],
    });
    res.json({
      message: "Category retrieved successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const soal = await Quizzes.findByPk(id, {
      rejectOnEmpty: true,
      include: [
        {
          model: Quizzes,
          as: "quizzess",
        },
      ],
    });
    res.json({
      message: `category retrived successfully with id=${id}`,
      data: soal,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Some error occured while retriving soal",
      data: null,
    });
  }
};
exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    let data = await Category.findByPk(id, { rejectOnEmpty: true });
    data.update(req.body, {
      where: { id },
    });
    res.json({
      message: "Category updated successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Category.findByPk(id, { rejectOnEmpty: true });
    category.destroy();
    res.json({
      message: `Data dengan id ${category.id} berhasil dihapus`,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};
