const express = require("express");
const Order = require("../models/order");
const OrderItem = require("../models/order-Item");

const router = express.Router();

router.get(`/`, async (req, res) => {
  const orderlist = await Order.find();
  if (!orderlist) {
    res.status(500).json({ success: false });
  } else {
    res.send(orderlist);
  }
});

//Metodo de consulta especifica
router.get(`/:id`, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res
      .status(500)
      .json({ success: false, message: "Error no se encuentra la orden" });
  } else {
    res.send(order);
  }
});

// Metodo de registro
router.post(`/`, async (req, res) => {
  
  const orderItemsIds = req.body.orderItems.map(async Items => {
      let newOrderItem = new OrderItem({
        quantity: Items.quantity,
        product: Items.product
      });
      //Función de almacenamiento de parametros
      newOrderItem = await newOrderItem.save();

      return newOrderItem._id;
    })

    console.log(orderItemsIds);

  let order = new Order({
    orderItems: orderItemsIds,
    shippingAddress1: req.body.shippingAddress,
    shippingAddress2: req.body.shippingAddress2,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    status: req.body.status,
    totalPrice: req.body.totalPrice,
    user: req.body.user,
  });

  //Función de almacenamiento de parametros
  // order = await order.save();

  if (!order) {
    return res.status(400).send('La orden no fue creada');
  }

  res.send(order);
});

//Metodo de exportacion de modulo
module.exports = router;
