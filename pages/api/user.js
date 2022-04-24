import clientPromise from "../../lib/mongodb.js";
import {ObjectId} from 'mongodb'

export default async function handler(req, res) {
  console.log('ℹ️ Request Received');
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  
  switch (req.method) {
    case "POST":
        try {
            let bodyObject = req.body ? JSON.parse(req.body) : null;
            console.log('POST Request Received');
            console.log(req.body);
            const item = await db.collection("users").insertOne(bodyObject)
            console.log(item);
            
            res.status(201).json('')
            return

        } catch (error) {
          console.log(error);
          res.status(500).json(error)
        }
      break
    case "GET":
        try {
            console.log('GET Request Received');

            const users = await db.collection("users").find({}).toArray()
            console.log(users);
            res.status(201).json(users)
            return

        } catch (error) {
          console.log(error);
          res.status(500).json(error)
        }
      break
    case "PUT":
        try {

            console.log('PUT Request Received');
            res.status(201).json('')
            return

        } catch (error) {
          console.log(error);
          res.status(500).json(error)
        }
      break
    case 'DELETE':
      try {

            console.log('DELETE Request Received');

            console.log();
            const body = JSON.parse(req.body)

            const item = await db.collection("users").deleteOne({ _id: ObjectId(body._id)})
            console.log(item);

            if (item.deletedCount === 1) {
                res.status(204).json('')
                return
            } else {
                res.status(404).json('')
                return
            }
            

      } catch (error) {
        console.log(error);
        res.status(500).json(error)
      }
    break
  }
}