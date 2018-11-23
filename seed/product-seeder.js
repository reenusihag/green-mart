var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/freesubzi');

var products = [

    new Product({
        imagePath:'https://media.istockphoto.com/photos/red-apple-with-leaf-isolated-on-white-background-picture-id185262648?k=6&m=185262648&s=612x612&w=0&h=u9rMspGGTOkgUSzZ6INtT_Ww4NpGz9zHMGRmIJJjBqQ=',
        title:'Apple',
        description:'The apple is a fleshy fruit from the apple tree. It is in the species Malus domestica in the rose family Rosaceae. ... An apple is a type of fruit that is grown on an apple tree. It is called a pomaceous fruit because the plant that it grows on flowers.',
        vitamins:'Vitamin A Vitamin B1 Vitamin B2 Vitamin B6 Vitamin C Folate (folic acid)',
        price:180,
        weight:'kg'
        }),

    new Product({
        imagePath:'https://media.istockphoto.com/photos/red-apple-with-leaf-isolated-on-white-background-picture-id185262648?k=6&m=185262648&s=612x612&w=0&h=u9rMspGGTOkgUSzZ6INtT_Ww4NpGz9zHMGRmIJJjBqQ=',
        title:'Banana',
        description:'The apple is a fleshy fruit from the apple tree. It is in the species Malus domestica in the rose family Rosaceae. ... An apple is a type of fruit that is grown on an apple tree. It is called a pomaceous fruit because the plant that it grows on flowers.',
        vitamins:'Vitamin A Vitamin B1 Vitamin B2 Vitamin B6 Vitamin C Folate (folic acid)',
        price:180,
        weight:'kg'
    }),

    new Product({
        imagePath:'https://media.istockphoto.com/photos/red-apple-with-leaf-isolated-on-white-background-picture-id185262648?k=6&m=185262648&s=612x612&w=0&h=u9rMspGGTOkgUSzZ6INtT_Ww4NpGz9zHMGRmIJJjBqQ=',
        title:'Orange',
        description:'The apple is a fleshy fruit from the apple tree. It is in the species Malus domestica in the rose family Rosaceae. ... An apple is a type of fruit that is grown on an apple tree. It is called a pomaceous fruit because the plant that it grows on flowers.',
        vitamins:'Vitamin A Vitamin B1 Vitamin B2 Vitamin B6 Vitamin C Folate (folic acid)',
        price:180,
        weight:'kg'
    })
];
var done=0;
for(var i=0; i<products.length;i++){
    products[i].save(function (err,result) {
        done++;
        if(done === products.length){
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}