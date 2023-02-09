import productModel from '@/models/productModel';

const getContainerProductsByCategory = async (req, res) => {
  try {
    // console.log(req.params);
    return;
    const categoryId = req.query.category._Id;

    // get all products by category
    const category = await Category.findById({
      _id: categoryId,
    }).exec();

    const products = await Product.find({
      category: category._id,
    })
      .populate('category')
      .limit(4);

    res.status(200).json({ products });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

export default getContainerProductsByCategory;
