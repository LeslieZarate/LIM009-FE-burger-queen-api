const db = require('../services/connection');

module.exports = collection => ({
  createDocument: async (...document) => {
    const user = await (await db())
      .collection(collection)
      .insertOne(document[0]);
    return user;
  },
  updateDocument: async (idDocument, ...document) => {
    const user = await (await db())
      .collection(collection)
      .updateOne({ _id: idDocument },
        { $set: document[0] });
    return user;
  },
  deleteDocument: async (idDocument) => {
    const user = await (await db())
      .collection(collection)
      .deleteOne({ _id: idDocument });
    return user;
  },
  searchDataBase: async (document) => {
    const result = await (await db())
      .collection(collection)
      .findOne(document);
    return result;
  },
  showListCollections: async () => {
    const result = await (await db())
      .collection(collection)
      .find({})
      .toArray();
    return result;
  },
  countCollections: async () => {
    const result = await (await db()).collection(collection).countDocuments();
    return result;
  },
});
