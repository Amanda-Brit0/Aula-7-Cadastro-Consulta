const express = require("express")
const app = express()
const handlebars = require("express-handlebars").engine
const bodyParser = require("body-parser")
const post = require("./models/post")
const { UPDATE } = require("sequelize/lib/query-types")

app.engine("handlebars", handlebars({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", function (req, res) {
    res.render("primeira_pagina")
})

app.post("/cadastrar", function (req, res) {
    post.create({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacao: req.body.observacao
    }).then(function () {
        console.log("Dados cadastrados com sucesso")
        res.send("Dados cadastrados com sucesso")
        res.redirect("/")
    }).catch(function (erro) {
        res.send("Falha ao cadastrar os dados: " + erro)
    })
})

app.get("/consultar", function (req, res) {
    post.findAll().then(function (posts) {
        res.render("consulta.handlebars", { posts })
        console.log(posts)
    })

})

app.get("/editar/:id", function(res, req){
    post.findAll({where: {'id': req.params.id}}).then(function(posts){
        res.render("editar", { posts })
        console.log(posts)
    })
    
})
app.post("/atualizar", function(req, res){
    post.update({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacao: req.body.observacao
    },{
        where:{
            id: req.body.id
        }
        }).then(
        function(){
            console.log("Dados atualizados com sucesso!")
            res.render("primeira_pagina")
        }
    )
}
)
app.get("/excluir/:id", function (req, res) {
    post.findByPk(req.params.id).then(function (postData) {
        if (postData) {
            res.render("confirmar_exclusao", { post: postData.dataValues });
        } else {
            res.send("Registro não encontrado!");
        }
    }).catch(function (erro) {
        res.send("Erro ao buscar os dados: " + erro);
    });
});

app.post("/confirmar-exclusao", function (req, res) {
    post.destroy({
        where: { id: req.body.id }
    }).then(function () {
        console.log("Dados excluídos com sucesso!");
        res.redirect("/consultar");
    }).catch(function (erro) {
        res.send("Erro ao excluir os dados: " + erro);
    });
});
/*app.get("/excluir/:id", function(req, res){
    post.destroy({where: {'id': req.params.id}}).then(function(){
        console.log("Dados escluídos com sucesso!")
        res.render("primeira_pagina")
    })

})*/

app.listen(8081, function () {
    console.log("Servidor ativo!")
})
//tem menu de contexto

// const express = require("express")
// const app = express()
// const handlebars = require("express-handlebars").engine
// const bodyParser = require("body-parser")
// const post = require("./models/post")

// app.engine("handlebars", handlebars({ defaultLayout: "main" }))//vinculando com o handlebars e apontando qual arquivo tem HTML. O handlebars é um framework semelhando ao react...
// app.set("view engine", "handlebars")

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
// //a vantagem de usar vetores e matrizes, é por usar uma constante em que poderei colcoar várias informaç~eos dentro dela

// app.get("/", function (req, res) {
//     res.render("primeira_pagina")
// })
// //app.get ("nome da rota de envio") É necessário sempre usar uma rota para que as informações sejam enviadas antes de serem armazenadas no DB
// app.post("/cadastrar", function (req, res) {
//     post.create({
//         nome: req.body.nome,
//         telefone: req.body.telefone,
//         origem: req.body.origem,
//         data_contato: req.body.data_contato,
//         observacao: req.body.observacao
//     }).then(function () {
//         console.log("Dados cadastrados com sucesso!")
//         res.send("Dados cadastrados com sucesso!")
//     }).catch(function () {
//         console.log("Erro ao gravar os dados na entidade")
//     })
//     //console.log(req.body.nome) //req puxa informação
// })
// app.get("/consultar", function (req, res) {
//     post.findAll().then(function(posts){ //findALL faz o select from trazendo as informações digitadas
//         res.render("consulta.handlebars",{posts})
//         console.log(posts)

//     })
// }
// )

// app.get("/segunda", function (req, res) {
//     res.render("segunda_pagina")
// })

// app.listen(8081, function () {
//     console.log("Servidor Ativo")
// })


// //cd .. ele volta para a pasta anterior.