const Products = require("../models/Product.model");
const Collections = require("../models/Collection.model");
require("../models/Collection.model");
const mongoose = require("mongoose");
const ApiFeature = require("../commom/ApiFeatures");
class ProductController {
  //GET - get all products
  async index(req, res, next) {
    const { sex, sizes, search, colours, brands } = req.query;
    let lengthOfProducts = 0;
    try {
      let products = await Products.find().populate("collections");
      lengthOfProducts = products.length;
      if (sex) {
        products = products.filter((product, index) => {
          for (let i = 0; i < sex.length; i++) {
            if (product.sex == sex[i]) {
              return true;
            }
          }
        });
      }
      if (sizes) {
        products = products.filter((product, index) => {
          for (let i = 0; i < sizes.length; i++) {
            for (let j = 0; j < product.sizes.length; j++) {
              if (product.sizes[j] == sizes[i]) {
                return true;
              }
            }
          }
        });
      }
      if (search) {
        products = products.filter((product) => {
          return product.name == search;
        });
      }
      if (colours) {
        products = products.filter((product) => {
          for (let i = 0; i < colours.length; i++) {
            for (let j = 0; j < product.colors.length; j++) {
              if (product.colors[j] == colours[i]) {
                return true;
              }
            }
          }
        });
      }
      if (brands) {
        products = products.filter((product) => {
          for (let i = 0; i < brands.length; i++) {
            if (product.category == brands[i]) return true;
          }
        });
      }
      let response = new ApiFeature(products, req.query).sort().pagging();
      res.json({ products: response.input, length: lengthOfProducts });
    } catch (error) {
      console.log(error);
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
      collections,
      sex,
      imgs,
    } = req.body;
    try {
      const newCollection = new Collections({
        _id: new mongoose.Types.ObjectId(),
        name: collections.name,
        dsc: collections.dsc,
      });
      const newProduct = new Products({
        name,
        price,
        category,
        colors,
        sizes,
        dsc,
        sex,
        imgs,
        collections: newCollection._id,
      });

      newCollection.save((err) => {
        if (err) return res.json({ success: false, msg: err.message });
        newProduct.save();
      });
      return res.json({ success: true, product: newProduct });
    } catch (error) {
      return res.status(500).json({ success: false, msg: error.message });
    }
  }
  //PATCH - PATCH product
  async update(req, res, next) {
    const { id } = req.params;
    const { name, price, category, colors, sizes, dsc, sex, imgs } = req.body;
    console.log(req.body);
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
            imgs,
            sex,
          },
        }
      );
      if (response.modifiedCount > 0) {
        res.json({
          success: true,
          msg: "Update success!",
          id,
          product: req.body,
          response,
        });
      } else {
        res.json({ success: false, msg: "???? x???y ra l???i" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Update failure!" });
    }
  }
  //DELETE - delete product
  async delete(req, res, next) {
    const { id } = req.params;
    try {
      const response = await Products.deleteOne({ _id: id });
      if (response.deletedCount > 0) {
        res.json({ success: true, msg: "Delete success!", id });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Delete failure!" });
    }
  }
}

module.exports = new ProductController();
