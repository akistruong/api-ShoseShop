const Products = require("../models/Product.model");
const ApiFeatures = require("../commom/ApiFeatures");
class CategoryController {
  async index(req, res, next) {
    try {
      const { search } = req.query;

      console.log(search);
      const cat = await Products.find(
        search ? { category: { $regex: ".*" + search + ".*" } } : {},
        {
          category: 1,
        }
      );
      if (cat) {
        const features = new ApiFeatures(cat, req.query).sort().pagging();
        return res.json({ success: true, categorys: features.input });
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getProductByCategory(req, res, next) {
    try {
      const { id } = req.params;
      console.log(id);
      const cat = await Products.find({ category: id });
      if (cat) {
        const features = new ApiFeatures(cat, req.query).sort().pagging();
        return res.json({ success: true, products: features.input });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new CategoryController();
