import { MongoClient } from 'mongodb';
// /api/new-meetups

export const connectToDataBase = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://new-meetups:Eup75Ukr5UBYQMWI@cluster0.pvl9o.mongodb.net/new-meetup?retryWrites=true&w=majority'
  );

  const dataBase = client.db();

  const meetupCollectionData = dataBase.collection('new-meetup');

  return {
    meetupCollection: meetupCollectionData,
    client
  };
};

const Handler = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;

    const response = await connectToDataBase();

    const { meetupCollection, client } = response;

    const result = await meetupCollection.insertOne(data);

    console.log(result); // contains unique id or token

    client.close();

    res.status(201).json({ message: 'meetup inserted' });
  }
};

export default Handler;
