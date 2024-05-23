import express from "express";
import UsuariosController from "./controllers/UsuariosController.js";
import ClientesController from "./controllers/ClientesController.js";

const port = 3000;

const app = express();
app.use(express.json());

const usuariosController = new UsuariosController();
const clientesController = new ClientesController();

//CRUD USUARIOS
app.get("/usuarios", usuariosController.listar);
app.post("/usuarios", usuariosController.adicionar);
app.put("/usuarios", usuariosController.atualizar);
app.delete("/usuarios/:idUsuario", usuariosController.excluir);

//CRUD CLIENTES
app.get("/clientes", clientesController.listar);
app.post("/clientes", clientesController.adicionar);
app.put("/clientes/:idCliente", clientesController.atualizar);
app.delete("/clientes/:idCliente", clientesController.excluir);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
