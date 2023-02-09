import productModel from '@/models/productModel';

const getProdudcts = async (req, res) => {
  const products = await productModel.find().limit(4);
  res.status(200).json({ products: products });
};

export default getProdudcts;
