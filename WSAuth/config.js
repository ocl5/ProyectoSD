'use strict'
module.exports= {
    port    : process.env.PORT || 3400,

    usuariosDB: "mongodb+srv://ocl5:ocl5@api.ajmmk.mongodb.net/authDB?retryWrites=true&w=majority",

    SECRET_TOKEN : "mellamooscarcasadolorenzo1234",
    TOKEN_TIME : 15 //expresado en minutos
}