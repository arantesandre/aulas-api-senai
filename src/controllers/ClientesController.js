import ConexaoMySql from "../database/ConexaoMySql.js";

class ClientesController {
  //LISTAR
  async listar(req, resp) {
    try {
      const filtro = req.query.filtro || "";
      const conexao = await new ConexaoMySql().getConexao();
      const sql = "SELECT * FROM clientes WHERE nome LIKE ?";
      const [resultado] = await conexao.execute(sql, [`%${filtro}%`]);

      resp.send(
        resultado.map((c) => {
          delete c.senha;
          return c;
        })
      );
    } catch (error) {
      resp.status(500).send(error);
    }
  }

  //ADICIONAR
  async adicionar(req, resp) {
    try {
      const novoCliente = req.body;

      if (
        !novoCliente.nome ||
        !novoCliente.email ||
        !novoCliente.telefone ||
        !novoCliente.idade
      ) {
        resp
          .status(400)
          .send("Os campos nome, email, telefone e idade são obrigatórios.");
        return;
      }

      const conexao = await new ConexaoMySql().getConexao();
      const sql =
        "INSERT INTO clientes (nome, email, telefone, idade) VALUES (?,?,?,?)";
      const [resultado] = await conexao.execute(sql, [
        novoCliente.nome,
        novoCliente.email,
        novoCliente.telefone,
        novoCliente.idade,
      ]);

      resp.send({ resultado });
    } catch (error) {
      resp.status(500).send(error);
    }
  }

  //ATUALIZAR
  async atualizar(req, resp) {
    try {
      const clienteEditar = req.body;

      if (
        !clienteEditar.nome ||
        !clienteEditar.email ||
        !clienteEditar.telefone
      ) {
        resp
          .status(400)
          .send(
            "Os campos nome, email e telefone são obrigatórios para atualizar."
          );
        return;
      }

      const conexao = await new ConexaoMySql().getConexao();
      const sql =
        "UPDATE clientes SET nome = ?, email = ?, telefone = ? WHERE id_clientes = ?";
      const [resultado] = await conexao.execute(sql, [
        clienteEditar.nome,
        clienteEditar.email,
        clienteEditar.telefone,
        clienteEditar.id_clientes,
      ]);

      resp.send({ resultado });
    } catch (error) {
      resp.status(500).send(error);
    }
  }

  //EXCLUIR
  async excluir(req, resp) {
    try {
      const conexao = await new ConexaoMySql().getConexao();
      const sql = "DELETE FROM clientes WHERE id_clientes = ?";
      const [resultado] = await conexao.execute(sql, [+req.params.idCliente]);

      resp.send(resultado);
    } catch (error) {
      resp.status(500).send(error);
    }
  }
}

export default ClientesController;
