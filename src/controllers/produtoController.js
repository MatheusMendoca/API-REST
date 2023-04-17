import ContentsDAO from "../DAO/produtoDAO.js";
import produto from "../models/pedido";

class produtoController {
  static rotas(app) {
    app.get("/produto", produtoController.listar);
    app.post("/produto", produtoController.inserir);
    app.delete("/produto/:id", produtoController.deletar);
    app.put("/produto/:id", produtoController.atualizar);
  }

  static async listar(req, res) {
    const produto = await produtoDAO.listar();

    res.send(produto);
  }

  static async inserir(req, res) {
    const produto = {
      nome: req.body.nome,
      sobrenome: req.body.sobrenome,
      cpf: req.body.cpf,
      telefone: req.body.telefone,
      endereco: req.body.endereco,
      unidade: req.body.unidade,
    };

    const result = await produtoDAO.inserir(produto);

    if (result.erro) {
      res.status(500).send(result);
    }

    res.send(result);
  }
  static async deletar(req, res) {
    const produto = await produtoDAO.deletar(req.params.id);

    if (produto.erro) {
      res.status(500).send("Erro ao deletar o registro");
    }

    res.send({ mensagem: "Registro removido com sucesso" });
  }

  static async atualizar(req, res) {
    const produto = {
      nome: req.body.nome,
      sobrenome: req.body.sobrenome,
      cpf: req.body.cpf,
      telefone: req.body.telefone,
      endereco: req.body.endereco,
      unidade: req.body.unidade,
    };

    const result = await produtoDAO.atualizar(req.params.id, produto);

    if (result.erro) {
      res.status(500).send("Erro ao atualizar o registro");
    }

    res.send({ mensagem: "Registro alterado com sucesso" });
  }
}

export default produtoController;
