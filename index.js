const restify = require("restify");
const errors = require("restify-errors");

//const corsMiddleware = require("restify-cors-middleware2");

//const cors = corsMiddleware({
//    origins: ['*']
//});
const servidor = restify.createServer({
    name : 'Emocoes' ,
    version : '1.0.0'
});

servidor.use( restify.plugins.acceptParser(servidor.acceptable) );
servidor.use( restify.plugins.queryParser() );
servidor.use( restify.plugins.bodyParser() );

//servidor.pre( cors.preflight );
//servidor.use( cors.actual );


servidor.listen(8001, function(){
    console.log("%s executando em %s", servidor.name, servidor.url);
} );


var knex = require('knex')({
    client : 'mysql' ,
    connection : {
        host : 'localhost' ,
        user : 'root' ,
        password : '' ,
        database : 'banco_emocoes'
    }
});

servidor.get( '/' , (req, res, next) => {
    res.send('Bem-vindo(a) ao Banco das Emoções');
});

servidor.get( '/emocoes' , (req, res, next) => {
    knex('tabela_emocoes').then( (dados) =>{
        res.send( dados );
    }, next) ; 
});

servidor.post( '/inserirEmocao' , (req, res, next) => {
    knex('tabela_emocoes')
        .insert( req.body )
        .then( (dados) =>{
            res.send( dados );
        }, next) ; 
});

servidor.put( '/emocoes/id' , (req, res, next) => {
    const id = req.params.id;
    knex('tabela_emocoes')
        .where( 'id' , id)
        .update( req.body )
        .then( (dados) =>{
            if( !dados ){
                return res.send(
                    new errors.BadRequestError('Produto não encontrado'));
            }
            res.send( "Produto Atualizado" );
        }, next) ; 
});