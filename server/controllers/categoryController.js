import Category from "../models/Category.js";

// Create Category
export const createCategory = async (
  req,
  res
) => {
  try {
    const { name } = req.body;

    const exists =
      await Category.findOne({ name });

    if (exists) {
      return res.status(400).json({
        message:
          "Category already exists",
      });
    }

    const category =
      await Category.create({
        name,
      });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Get All Categories
export const getCategories = async (
  req,
  res
) => {
  try {
    const categories =
      await Category.find();

    res.json(categories);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Get Single Category
export const getCategoryById =
  async (req, res) => {
    try {
      const category =
        await Category.findById(
          req.params.id
        );

      if (!category) {
        return res.status(404).json({
          message:
            "Category not found",
        });
      }

      res.json(category);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };


// Update Category
export const updateCategory =
  async (req, res) => {
    try {
      const category =
        await Category.findById(
          req.params.id
        );

      if (!category) {
        return res.status(404).json({
          message:
            "Category not found",
        });
      }

      category.name =
        req.body.name ||
        category.name;

      const updated =
        await category.save();

      res.json(updated);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };


// Delete Category
export const deleteCategory =
  async (req, res) => {
    try {
      const category =
        await Category.findById(
          req.params.id
        );

      if (!category) {
        return res.status(404).json({
          message:
            "Category not found",
        });
      }

      await category.deleteOne();

      res.json({
        message:
          "Category deleted",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };