const Products = require("../models/Product.model");
const Collections = require("../models/Collection.model");
const ApiFeature = require("../commom/ApiFeatures");
const mongoose = require("mongoose");
class ProductController {
  async index(req, res, next) {
    try {
      let response = [];
      const { search, collections, qnew } = req.query;
      if (search) {
        response = await Products.find(
          search ? { name: { $regex: ".*" + search + ".*" } } : {}
        );
      } else if (qnew) {
        response = await Products.find({}).sort({ createdAt: -1 }).limit(4);
      } else if (collections) {
        response = await Products.find({ collections });
      } else {
        response = await Products.find().populate("collections");
        console.log(response);
        if (response) {
          const features = new ApiFeature(response, req.query).pagging().sort();
          res.json({ products: features.input });
        }
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
    const {
      name,
      price,
      category,
      colors,
      sizes,
      dsc,
      stars,
      collectionName,
      collectionDsc,
    } = req.body;
    try {
      const newProduct = new Products({
        name,
        price,
        category,
        colors,
        sizes,
        dsc,
        stars,
        collectionName,
        collectionDsc,
      });
      const newCollection = new Collections({
        _id: new mongoose.Types.ObjectId(),
        name: collectionName,
        dsc: collectionDsc,
      });
      newCollection.save((err) => {
        if (err) return res.json({ success: false, msg: err.message });
        newProduct.save();
      });
      return res.json({ success: true });
    } catch (error) {
      return res.status(500).json({ success: false, msg: error.message });
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
