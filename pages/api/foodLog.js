import clientPromise from "../../lib/mongodb.js";
import {ObjectId} from 'mongodb'
import { withAuth } from "@clerk/nextjs/api";


export default withAuth(async function handler(req, res) {
  const { userId, sessionId, getToken } = req.auth;

  console.log('ℹ️ Request Received');
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  


  switch (req.method) {
    case "POST":
        try {
            let bodyObject = req.body ? JSON.parse(req.body) : null;
            console.log('POST');

            const query = { date: bodyObject.date };
          const update = { $set: { user: bodyObject.user, date: bodyObject.date, items: bodyObject.items }};
          const options = { upsert: true };

            const item = await db.collection("foodLogs").updateOne(query, update, options)
            console.log(item);
            
            res.status(201).json(item)
            return

        } catch (error) {
          console.log(error);
          res.status(500).json(error)
        }
      break
    case "GET":
        try {
            console.log('GET Request Received');
            console.log(req.query.date)

            const foodLog = await db.collection("foodLogs").find({
              date: {
                $eq: req.query.date
              },
              user: userId
            }).toArray()
            console.log(foodLog);
            res.status(201).json(foodLog)
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

            const item = await db.collection("foodLogs").deleteOne({ _id: ObjectId(body._id)})
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
})