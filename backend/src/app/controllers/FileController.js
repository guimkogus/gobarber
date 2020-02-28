/* eslint-disable class-methods-use-this */
import File from '../models/File';

class FileController {
  async store(req, res) {
    // name e path são como o originalname e o filename serão salvos no bando de dados
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });

    return res.json(file);
  }
}

export default new FileController();
