const Products = require("../models/Product.model");
const Collections = require("../models/Collection.model");
const ApiFeature = require("../commom/ApiFeatures");
require("../models/Collection.model");
const mongoose = require("mongoose");
class ProductController {
  //GET - get all products
  async index(req, res, next) {
    try {
      const {
        search,
        qNewest,
        collection,
        qNewestCollection,
        sex,
        sizes,
        color,
      } = req.query;
      let response = [];
      if (search) {
        response = await Products.find(
          search ? { name: { $regex: ".*" + search + ".*" } } : {}
        ).populate("collections");
      } else if (qNewest) {
        response = await Products.find()
          .sort({ createdAt: -1 })
          .limit(2)
          .populate("collections");
      } else if (collection) {
        response = await Products.find().populate({
          path: "collections",
          match: { name: collection },
        });
        response = response.filter((item) => item.collections != null);
      } else if (qNewestCollection) {
        response = await Products.find()
          .populate("collections")
          .sort({ createdAt: -1 })
          .limit(2);
      } else if (sizes) {
        console.log(sizes);
        response = await Products.find({ sizes: { $in: sizes } }).populate(
          "collections"
        );
      } else if (sex) {
        response = await Products.find({ sex }).populate("collections");
      } else {
        response = await Products.find().populate("collections");
      }
      const feature = new ApiFeature(response, req.query).sort().pagging();
      res.json({ products: feature.input });
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message });
    }
  }
  //GET - get single product
  async getSingleProduct(req, res, next) {
    try {
      const { id } = req.params;
      const response = await Products.findOne({ _id: id }).populate(
        "collections"
      );
      if (response) {
        res.json({ success: true, product: response });
      }
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message });
    }
  }
  //POST - create new product
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
      sex,
      imgs,
    } = req.body;
    try {
      const newCollection = new Collections({
        _id: new mongoose.Types.ObjectId(),
        name: collectionName,
        dsc: collectionDsc,
      });
      const newProduct = new Products({
        name,
        price,
        category,
        colors,
        sizes,
        dsc,
        stars,
        sex,
        imgs,
        collections: newCollection._id,
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
  //PATCH - PATCH product
  async update(req, res, next) {
    const { id } = req.params;
    const { name, price, category, colors, sizes, dsc, stars } = req.body;
    try {
      const response = await Products.updateOne(
        { _id: id },
        {
          $set: {
            name,
            price,
            category,
            colors,
            sizes,
            dsc,
            stars,
          },
        }
      );
      if (response) {
        res.json({ success: true, msg: "Update success!" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Update failure!" });
    }
  }
  //DELETE - delete product
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
