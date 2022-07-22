const http = require('http');

//create a local server
http
.createServer((request, response) =>{
   response.writeHead(200, {'Content-Type': 'application/json '});
   
   //Criação de rotas e tratativas sem framework

   if(request.url === "/produto") {
    response.end(JSON.stringify({
        message: "Bem vindo a página de produtos"
    })
    );
   }

   //Rota de Usuários
   if(request.url === "/usuario"){
    response.end(JSON.stringify({
        message: "Olá usuário bem vindo de volta!"
    })
    );
   }
   // Rota Qualquer
   response.end(JSON.stringify({
    message: "ERRO 404, Página não existe"
   })
   );

})
.listen(9001, () => console.log("Servidor rodando na porta 9001"));
