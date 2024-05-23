const express = require("express");
const port = 3000;

const app = express();
app.use(express.json());

let usuarios = [];

//GET
app.get("/usuarios", (req, res) => {
  // console.log(req.query);
  let resultado = usuarios;
  // faz o filtro se receber ?filtro=exemplo
  if (req.query.filtro) {
    resultado = usuarios.filter((u) => {
      return u.nome.includes(req.query.filtro);
    });
  }
  res.send(resultado);
});

//POST
app.post("/usuarios", (req, res) => {
  console.log(req.body);

  if (!req.body || !req.body.nome || !req.body.email) {
    res.status(400).send('Os campos nome e email são obrigatórios.');
    return;
  }

  const usuarioJaExiste = usuarios.find((usu) => usu.email === req.body.email);

  if (usuarioJaExiste) {
    res.status(409).send('Usuário já existe!');
    return;

  }

  // res.send(`Chamou o POST com o nome: ${req.body.nome}`);

  //gerando id aleatorio de exemplo
  const novoUsuario = { ...req.body, id: +new Date() };

  usuarios.push(novoUsuario);
  res.status(201).send(novoUsuario);
});

//PUT
app.put("/usuarios", (req, res) => {
  // console.log(req.headers);
  usuarios = usuarios.map((user) => {
    if (user.id === req.body.id) {
      return req.body;
    } else {
      return user;

    }
  });

  res.send('Operação efetuada com sucesso!')

  // if (!req.headers.autorizacao) {
  //   res.status(401).send('Informe o HEADER "autorizacao"');
  // } else {
  //   res.send("Chamou o PUT!");
  // }
});

//DELETE
app.delete("/usuarios/:idUsuario", (req, res) => {
  // console.log(req.params);
  usuarios = usuarios.filter((user) => {
    return user.id !== +req.params.idUsuario;
  })

  res.send("Operação efetuada com sucesso!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
