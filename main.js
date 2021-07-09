// const express = require("express")
// const app = express()
// const PORT = process.env.PORT || 5000

// const vision = require("@google-cloud/vision")

// // Creates a client
// const client = new vision.ImageAnnotatorClient({
//   keyFilename: "./GoogleKey.json"
// })

// /**
//  * TODO(developer): Uncomment the following line before running the sample.
//  */
// const fileName = "./dummyReceipt.jpeg"

// // Performs text detection on the local file

// const [result] = await client.textDetection(fileName)
// const detections = result.textAnnotations
// console.log("Text:")
// detections.forEach(text => console.log(text))

// app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

// Imports the Google Cloud client library.

const { Storage } = require("@google-cloud/storage")

// Instantiates a client. If you don't specify credentials when constructing
// the client, the client library will look for credentials in the
// environment.
const storage = new Storage()
// Makes an authenticated API request.
async function listBuckets() {
  try {
    const results = await storage.getBuckets()

    const [buckets] = results

    console.log("Buckets:")
    buckets.forEach(bucket => {
      console.log(bucket.name)
    })
  } catch (err) {
    console.error("ERROR:", err)
  }
}
listBuckets()
