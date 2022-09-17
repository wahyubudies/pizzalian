import dbConnect from "../../../utils/mongo";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const products = await Product.find({});
        return res.status(200).json(products);
      } catch (err) {
        res.status(500).json(err);
      }
      break;

    case "POST":
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
