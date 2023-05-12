import Query from "../model/query";

export const getAllQuerys = async (req, res, next) => {
  let querys;
  try {
    querys = await Query.find();
  } catch (err) {
    console.log(err);
  }
  if (!querys) {
    return res.status(404).json({ message: "No contact found" });
  }
  return res.status(200).json({ querys });
};

export const addQuery = async (req, res, next) => {
  const { name, email, phone, company, heading, message } = req.body;
  const query = new Query({
    name,
    email,
    phone,
    company,
    heading,
    message,
  });
  try {
    await query.save();
    return res.status(201).json({ query });
  } catch (err) {
    return res.status(500).json({ message: "error" });
  }
};
