import categoryModel from '@/models/categoryModel';

const getCategories = async (req, res) => {
  const categories = await categoryModel.find();
  res.status(200).json({ categories: categories });
};

export default getCategories;
