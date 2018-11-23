var express = require('express');
var router = express.Router();
var Cart  = require('../models/cart');

var Product = require('../models/product');
var Order = require('../models/order');

/* GET home page. */
router.get('/', function(req, res, next) {
    var successMsg = req.flash('success')[0];
  Product.find(function (err,docs) {
      var productChunks = [];
      var chunkSize = 3;
      for(var i=0 ; i< docs.length; i += chunkSize){
          productChunks.push(docs.slice(i,i + chunkSize));
      }
      res.render('shop/index', { title: 'Free Subzi', products:productChunks , successMsg:successMsg, noMessages: !successMsg});
  });
});

router.get('/add-to-cart/:id', function (req, res, next) {
   var productId = req.params.id;
   var cart = new Cart(req.session.cart ? req.session.cart :{});

   Product.findById(productId, function (err, product) {
       if(err){
           return res.redirect('/');
       }
       cart.add(product, product.id);
       req.session.cart = cart;
       console.log(req.session.cart);
       res.redirect('/');
   });
});

router.get('/reduce/:id', function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart :{});

    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

router.get('/remove/:id', function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart :{});

    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

router.get('/shopping-cart', function (req, res, next) {
    if(!req.session.cart){
        return res.render('shop/shopping-cart',{products:null});
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart',{products: cart.generateArray(), totalPrice: cart.totalPrice})
    
});

router.get('/checkout', isLoggedIn ,function (req, res, next) {
   if(!req.session.cart){
       return res.render('/shopping-cart');
   }
    var cart = new Cart(req.session.cart);
   res.render('shop/checkout',{total:cart.totalPrice})
});

router.post('/checkout', isLoggedIn, function (req, res, next) {
    if(!req.session.cart){
        return res.render('shop/shopping-cart',{products:null});
    }
    var cart = new Cart(req.session.cart);

    var order = new Order({
         user: req.user,
         cart:cart,
         name:req.body.name,
         number:req.body.number,
         alternate_number:req.body.number,
         address:req.body.address,
         paymentMode:req.body.method,
         paymentId:'12345678'
    });

    order.save( function (err, result) {
        req.flash('success','Successfully bought products !');
        req.session.cart= null;
        res.redirect('/');
    });
   // console.log('munny');


});

router.get('/owner/add', isLoggedIn , function (req, res, next) {

    res.render('shop/add-item');

});

module.exports = router;

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
}