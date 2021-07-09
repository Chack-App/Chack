const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000

const vision = require("@google-cloud/vision")

async function readReceipt() {
  // Creates a client
  const client = new vision.ImageAnnotatorClient({
    keyFilename: "./GoogleKey.json"
  })

  const fileName = "./dummyReceipt.jpeg"

  // Performs text detection on the local file

  const [result] = await client.textDetection(fileName)
  const detections = result.textAnnotations
  console.log("Text:")
  detections.forEach(text => console.log(text))
}

readReceipt()

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

//regular text
// description: 'SHOP NAME\n' +
// 'Address: Lorem Ipsum, 23-10\n' +
// 'Telp. 11223344\n' +
// 'CASH RECEIPT\n' +
// 'Description\n' +
// 'Lorem\n' +
// 'Ipsum\n' +
// 'Dolor sit amet\n' +
// 'Consectetur\n' +
// 'Adipiscing elit\n' +
// 'Price\n' +
// '1.1\n' +
// '2.2\n' +
// '3.3\n' +
// '4.4\n' +
// '5.5\n' +
// 'Total\n' +
// 'Cash\n' +
// 'Change\n' +
// '16.5\n' +
// '20.0\n' +
// '3.5\n' +
// '**.\n' +
// 'Bank card\n' +
// '234\n' +
// '#123456\n' +
// 'Approval Code\n' +
// 'THANK YOU!\n' +
// 'designed by freepik\n',

// [string arr]
// items[]
// price[]

// final{}

// look at vertices
