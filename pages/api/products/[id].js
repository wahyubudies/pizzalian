import dbConnect from "../../../utils/mongo";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  const { method, query: { id } } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const product = await Product.findById(id);
        return res.status(200).json(product);
      } catch (err) {
        return res.status(500).json(err);
      }
      break;

    case "PUT":
      try {
        const reply = await Product.create(req.body);
        return res.status(201).json(reply);
      } catch (err) {
        res.status(500).json(err);
      }
      break;

    case "DELETE":
      try {
        const reply = await Product.create(req.body);
        return res.status(201).json(reply);
      } catch (err) {
        res.status(500).json(err);
      }
      break;

    default:
      break;
  }
}
