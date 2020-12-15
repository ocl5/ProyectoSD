'use strict'
const Product = require('../modelos/modeloCoche');


function getProducts(req, res){
    Product.find({},(err,products)=>{
        if(err){
            return res.json({message:`Error al realizar la peticion ${err}`})
        }
        if(!products){
            return res.json({message:`No existen productos`})
        }

        res.json({products:products})
    })   
}


function getProduct(req,res){

    let productId= req.params.productId;
    Product.findById(productId,(err,product)=>{
        if(err){
            return res.json({message:`Error al realizar la peticion ${err}`})
        }
        if(!product){
            return res.json({message:`El producto no existe`})
        }

        res.json({ product: product})
    })
}


function saveProduct(req,res){

    let product= new Product();
    
    product.modelo = req.body.modelo;
    product.matricula = req.body.matricula;
    product.price = req.body.price;
    product.category = req.body.category;
    product.description = req.body.description;

    product.save((err, productStorage)=>{
        if(err) res.send(500).send({message:`Error al salvar en la bd ${err}`});
        
        res.status(200).send({message: productStorage});
    });

    
}


function updateProduct(req,res){
    let productId = req.params.productId;
    const opBool = req.body.disponible;


    var update = {
        $set:{disponible : `${opBool}`}
    };

    Product.findByIdAndUpdate( productId, update, (err, productoUp)=>{
        if(err) res.status(500).json({
            message: `Error al acrtualizar el producto ${err}`
        });
        
        res.json({mess: 'Proceso terminado'});

    });
}


function deleteProduct(req, res){

    let productId= req.params.productId;

    Product.findById(productId,(err,product)=>{
        if(err){
            return res.status(500).send({message: `Error al borrar el producto ${err}`});
        }

        product.remove(err =>{
            if(err) res.status(500).send({message: `Error al borrar el producto ${err}`})

            res.status(200).send({message: `El producto se ha borrado`});
        })
    });
}


module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
}