const express = require("express");
const Order = require("../models/order");
const User = require("../models/user");
const OrderItem = require("../models/order-Item");
const router = express.Router();

router.get(`/`, async (req, res) => {
  const orderlist = await Order.find();

  if (!orderlist) {
    res.status(500).json({ success: false });
  } 
    res.send(orderlist);
  
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

//Metodo de consulta de total ventas
router.get('/total', async (req, res) => {
  const total = await Order.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: "$totalPrice" }
        }
        }
  ])
  
  if (!total) {
    res.status(400).send('ordenes no encontradas');
  }
  res.send(total);
})

//Metodo de consulta de ordenes por usuarios
router.get('/userOrder/:userid', async (req, res) => {
  const userOrder = await Order.find({ userId: req.params.userid }).populate({
    path: "orderItems", populate: {
      path: "product", path: "category"
    }.sort({'dateOrdered':-1})
});

if (!userOrder) {
  
  res.status(500).send('ordenes no encontradas');
}
res.send(userOrder);
})



// Metodo de registro
router.post(`/`, async (req, res) => {
  
  const orderItemsIds = Promise.all(req.body.orderItems.map(async Items => {
      let newOrderItem = new OrderItem({
        quantity: Items.quantity,
        product: Items.product
      });
      //Función de almacenamiento de parametros
      newOrderItem = await newOrderItem.save();

      return newOrderItem._id;
    }));

    const itemOrder = await orderItemsIds;
    console.log(itemOrder);

  let order = new Order({
    orderItems: itemOrder,
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
  order = await order.save();

  if (!order) {
    res.status(500).json({ success: false });
  }

  res.send(order);
});

//Metodo de actualización
router.put("/:id", async (req, res) => {
  const ordenU = await Order.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status
    },
    {
      new: true,
    }
  )

  if (!ordenU) {
    return res.status(400).send('La orden no fue editada');
  }else{
    res.send(ordenU);
  }
});

// APP/id seleccion de id para eliminar
router.delete("/:id", (req, res) => {
  Order.findByIdAndDelete(req.params.id).then((order) => {
      if (order) {
        return res
          .status(200)
          .json({ success: true, message: "La orden fue eliminada" });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "La orden no fue encontrada" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});





//Metodo de exportacion de modulo
module.exports = router;
