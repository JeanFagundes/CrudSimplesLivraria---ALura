import livros from "../models/Livro.js";

class LivroController {
  static listarLivros = (req, res) => {
    livros
      .find()
      .populate("autor")
      .exec((err, livros) => {
        res.status(200).json(livros);
      });
  };

  static listarLivroPorId = (req, res) => {
    const id = req.params.id;

    livros
      .findById(id)
      .populate("autor", "nome") // no metodo get pega somente o nome do autor
      .exec((err, livros) => {
        if (err) {
          res
            .status(400)
            .send({ message: `${err} - Id do livro não localizado` });
        } else {
          res.status(200).json(livros);
        }
      });
  };

  static listarLivroPorEditora = (req, res) => {
    const editora = req.query.editora;
    //a chave vazia é por não usar querry
    livros.find({ editora: editora }, {}, (err, livros) => {
      res.status(200).send(livros);
    });
  };

  static cadastrarLivro = (req, res) => {
    const livro = new livros(req.body);

    livro.save((err) => {
      if (err) {
        res
          .status(500)
          .send({ message: `${err.message} - falha ao cadastrar o livro` });
      } else {
        res.status(201).send(livro.toJSON());
      }
    });
  };

  static atualizarLivro = (req, res) => {
    const id = req.params.id;
    livros.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send({ message: "Livro atualizado com sucesso" });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };

  static excluirLivro = (req, res) => {
    const id = req.params.id;
    livros.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: "Livro deletado com sucesso" });
      } else {
        res.status(500).send({
          message: `${err} - não foi possivel deletar o livro`,
        });
      }
    });
  };
}

export default LivroController;
