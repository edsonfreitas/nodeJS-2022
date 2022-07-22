const express = require("express");
const { randomUUID } = require('crypto')
const fs = require('fs');
const { listeners } = require("process");

const app = express();

app.use(express.json());

/** PRINCIPAIS MÉTODOS
 * POST => Inserir um dado
 * GET => Buscar um/mais dados
 * PUT => Alterar um dado
 * DELETE => Remover um dado
 * */
let produtos = [];

fs.readFile("produtos.json", "utf-8", (err, data) => {
    if(err){
        console.log(err)
    }else{
        produtos = JSON.parse(data);
    }
});
/**
 * Body => Sempre que quiser enviar dados para minha aplicação
 * Params => /product/123939399 são os parâmetros de rotas ex: ID
 * Query => Fazem parte da rota mas não são obrigatórios, usado quando criamos filtros ou paginação ex: /product?id=3234442888796697402&value=2991822738843894
*/

app.post("/produtos", (req, res) =>{
    //Nome e Preço => name e price

    const { name, price } = req.body;

    const produto ={
        name,
        price,
        id: randomUUID()
    }

    produtos.push(produto);
    
    productFile()

    return res.json(produto);
});

app.get("/produtos", (req,res) => {
    return res.json(produtos)
});

//Rota que busca produto pelo id como parâmetro da rota
app.get("/produtos/:id", (req,res) => {
    const { id } = req.params;
    const produto = produtos.find((produto )=> produto.id === id);
    return res.json(produto)
});

// Rota Alteração de dado 
app.put("/produtos/:id", (req,res) =>{
    const { id } = req.params;
    const { name, price } = req.body;

    const produtoIndex = produtos.findIndex((produto) => produto.id === id);
    produtos[produtoIndex] = {
        ...produtos[produtoIndex],
        name,
        price
    };

    productFile()

    return res.json({message: "Produto alterado com sucesso"})
})
//Rota de delete um dado
app.delete("/produtos/:id", (req,res) =>{
    const { id } = req.params;

    const produtoIndex = produtos.findIndex((produto) => produto.id === id);

    produtos.splice(produtoIndex, 1);
    
    productFile()

    return res.json({message:"Produto removido com sucesso!"})
})

function productFile(){
    fs.writeFile("produtos.json", JSON.stringify(produtos), (err) =>{
        if(err){
            console.log(err)
        }else{
            console.log("Produto inserido!")
        }
    })
}

app.listen(9002, () => console.log("Server run 9002"))