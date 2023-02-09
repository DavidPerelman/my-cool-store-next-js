import Category from '@/models/Category';
import connectDb from '@/utils/connectDb';

connectDb();

const getCategories = async (req, res) => {
  const categories = await Category.find();
  res.status(200).json({ categories: categories });
};

export default getCategories;
