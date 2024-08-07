const orderModel = require("../models/orderModel");
const plateModel = require("../models/plateModel");
module.exports = {
  homePlates: async (req, res) => {
    const salad = await plateModel.find({ category: "Salad" }).limit(3);
    const pizza = await plateModel.find({ category: "Pizza" }).limit(3);
    const pasta = await plateModel.find({ category: "Pasta" }).limit(3);

    res.render("home", { salad, pizza, pasta });
  },
  getAllPlates: async function (req, res) {
    var queries = {
      plate: req.query.plate || "",
      category: req.query.category || "",
    };
    const plates = await plateModel.find({
      title: { $regex: queries.plate, $options: "i" },
      category: { $regex: queries.category, $options: "i" },
    });
    res.render("products", { plates });
  },
  getSingelPlate: async function (req, res) {
    const plate = await plateModel.findById(req.params.id);
    res.render("plate", { plate });
  },
  getCart: async function (req, res) {
    const plates = await plateModel.find();

    res.render("cart", { plates });
  },
  createOrder: async (req, res) => {
    const order = JSON.parse(req.body.order);
    const user = req.body.user;
    const address = req.body.adress;
    const a = await orderModel.create({ order, user, address });

    res.redirect("/");
  },
};
