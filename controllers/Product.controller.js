const Products = require("../models/Product.model");
const ApiFeature = require("../commom/ApiFeatures");

class ProductController {
  async index(req, res, next) {
    try {
      const { search } = req.query;
      const response = await Products.find(
        search ? { name: { $regex: ".*" + search + ".*" } } : {}
      );
      console.log(response);
      if (response) {
        const features = new ApiFeature(response, req.query).pagging().sort();

        res.json({ products: features.input });
      }
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message });
    }
  }
  async getSingleProduct(req, res, next) {
    try {
      const { id } = req.params;
      const response = await Products.findOne({ _id: id });
      if (response) {
        res.json({ success: true, product: response });
      }
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message });
    }
  }
  async create(req, res, next) {
    const { name, price, category, colors, sizes, dsc, stars } = req.body;
    try {
      const newProduct = new Products({
        name,
        price,
        category,
        colors,
        sizes,
        dsc,
        stars,
      });
      const response = await newProduct.save();
      if (response) {
        res.json({ success: true });
      }
    } catch (error) {
      res.status(500).json({ success: false, msg: error });
    }
  }
  async update(req, res, next) {
    res.json("Update PRODUCT");
  }
  async delete(req, res, next) {
    const { id } = req.body;
    try {
      const response = await Products.deleteOne({ _id: id });
      if (response.deletedCount > 0) {
        res.json({ success: true, msg: "Delete success!" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Delete failure!" });
    }
  }
}

module.exports = new ProductController();
