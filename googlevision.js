const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000

const vision = require("@google-cloud/vision")

async function readReceipt(imguri) {
  // Creates a client
  const client = new vision.ImageAnnotatorClient({
    keyFilename: "./GoogleKey.json"
  })

  const fileName = imguri

  // Performs text detection on the local file

  const [result] = await client.textDetection(fileName)
  const detections = result.textAnnotations
  //return detections

  // Creates array of objects for each detected piece of text
  let textArr = []
  detections.forEach(text => textArr.push(text))

  console.log("OTHER DATA******", detections)

  // console.log("ORIGINAL ---->", textArr)

  // for (let i = 0; i < textArr.length; i++) {
  //   let currentObject = textArr[i]
  //   returnObj[currentObject.description] = currentObject.boundingPoly.vertices
  // }

  function runThisThing(apiArray) {
    let result = {}
    apiArray.forEach(item => {
      if (result.hasOwnProperty(`${item.description}`)) {
        const test = Math.ceil(Math.random() * 100)
        result[`${item.description}~~~~${test}`] = item.boundingPoly.vertices
      } else {
        result[item.description] = item.boundingPoly.vertices
      }
    })
    return result
    //
    //   console.log(apiArray.length)
  }

  const resultData = runThisThing(detections)

  console.log("for loop finished", resultData)
}

readReceipt(
  "/Users/jasonchen/Fullstack/senior-phase/capstone/Chack/assets/foodReceipt2.jpeg"
)

// const result = {
//   '1': [
//     { x: 234, y: 314 },
//     { x: 245, y: 314 },
//     { x: 245, y: 337 },
//     { x: 234, y: 337 }
//   ],
//   '2': [
//     { x: 221, y: 239 },
//     { x: 236, y: 239 },
//     { x: 236, y: 262 },
//     { x: 221, y: 262 }
//   ],
//   '6443': [
//     { x: 286, y: 126 },
//     { x: 326, y: 126 },
//     { x: 326, y: 151 },
//     { x: 286, y: 151 }
//   ],
//   '7727': [
//     { x: 430, y: 564 },
//     { x: 471, y: 564 },
//     { x: 471, y: 589 },
//     { x: 430, y: 589 }
//   ],
//   "THANK YOU\nMCDONALDS\nTEL# (206)387-8899\n04 KS#02 S#1 Jul.12'07(Thu)06:10\nMER# KB53491199001\nSTORE# 6443\nOrder #204\nTO GO\n2 SAUSAGE BISCUIT\n1 SAU EGG CH MCGRDL ML\n1 SAU EGG CH MCGRIDDLE\n1 SML ORANGE JUICE\n2.00\n2.60\n2.89\n1.79\nSUB TOTAL\nTAKE OUT TAX\n9.28\n0.87\n10.15\nCARD ISSUER\nVISA SALE\nTRANSACTION AMOUNT\nAUTH CODE 061006 SEO# 7727\nACCOUNT #\n************4500\n10.15\n": [
//     { x: 196, y: 20 },
//     { x: 611, y: 20 },
//     { x: 611, y: 589 },
//     { x: 196, y: 589 }
//   ],
//   THANK: [
//     { x: 360, y: 20 },
//     { x: 406, y: 21 },
//     { x: 406, y: 37 },
//     { x: 360, y: 36 }
//   ],
//   YOU: [
//     { x: 418, y: 21 },
//     { x: 446, y: 21 },
//     { x: 446, y: 38 },
//     { x: 418, y: 38 }
//   ],
//   MCDONALDS: [
//     { x: 208, y: 67 },
//     { x: 297, y: 67 },
//     { x: 297, y: 84 },
//     { x: 208, y: 84 }
//   ],
//   'TEL#': [
//     { x: 429, y: 68 },
//     { x: 466, y: 68 },
//     { x: 466, y: 86 },
//     { x: 429, y: 86 }
//   ],
//   '(206)387-8899': [
//     { x: 479, y: 68 },
//     { x: 606, y: 69 },
//     { x: 606, y: 90 },
//     { x: 479, y: 89 }
//   ],
//   '04': [
//     { x: 200, y: 97 },
//     { x: 237, y: 98 },
//     { x: 236, y: 128 },
//     { x: 199, y: 127 }
//   ],
//   'KS#02': [
//     { x: 249, y: 108 },
//     { x: 296, y: 109 },
//     { x: 296, y: 125 },
//     { x: 249, y: 124 }
//   ],
//   'S#1': [
//     { x: 328, y: 100 },
//     { x: 381, y: 101 },
//     { x: 381, y: 127 },
//     { x: 328, y: 126 }
//   ],
//   "Jul.12'07(Thu)06:10": [
//     { x: 419, y: 108 },
//     { x: 606, y: 111 },
//     { x: 606, y: 134 },
//     { x: 419, y: 131 }
//   ],
//   'MER#': [
//     { x: 418, y: 131 },
//     { x: 455, y: 131 },
//     { x: 455, y: 148 },
//     { x: 418, y: 148 }
//   ],
//   KB53491199001: [
//     { x: 468, y: 129 },
//     { x: 594, y: 129 },
//     { x: 594, y: 149 },
//     { x: 468, y: 149 }
//   ],
//   'STORE#': [
//     { x: 208, y: 128 },
//     { x: 267, y: 129 },
//     { x: 267, y: 148 },
//     { x: 208, y: 147 }
//   ],
//   Order: [
//     { x: 208, y: 176 },
//     { x: 305, y: 178 },
//     { x: 304, y: 216 },
//     { x: 207, y: 214 }
//   ],
//   '#204': [
//     { x: 330, y: 179 },
//     { x: 405, y: 181 },
//     { x: 404, y: 216 },
//     { x: 329, y: 214 }
//   ],
//   TO: [
//     { x: 468, y: 178 },
//     { x: 551, y: 179 },
//     { x: 551, y: 218 },
//     { x: 468, y: 217 }
//   ],
//   GO: [
//     { x: 548, y: 181 },
//     { x: 585, y: 181 },
//     { x: 585, y: 216 },
//     { x: 548, y: 216 }
//   ],
//   SAUSAGE: [
//     { x: 242, y: 239 },
//     { x: 308, y: 240 },
//     { x: 308, y: 264 },
//     { x: 242, y: 263 }
//   ],
//   BISCUIT: [
//     { x: 318, y: 239 },
//     { x: 388, y: 240 },
//     { x: 388, y: 264 },
//     { x: 318, y: 263 }
//   ],
//   SAU: [
//     { x: 249, y: 289 },
//     { x: 274, y: 289 },
//     { x: 274, y: 311 },
//     { x: 249, y: 311 }
//   ],
//   EGG: [
//     { x: 279, y: 292 },
//     { x: 308, y: 292 },
//     { x: 308, y: 309 },
//     { x: 279, y: 309 }
//   ],
//   CH: [
//     { x: 318, y: 292 },
//     { x: 338, y: 292 },
//     { x: 338, y: 309 },
//     { x: 318, y: 309 }
//   ],
//   MCGRDL: [
//     { x: 348, y: 266 },
//     { x: 407, y: 267 },
//     { x: 407, y: 287 },
//     { x: 348, y: 286 }
//   ],
//   ML: [
//     { x: 418, y: 269 },
//     { x: 437, y: 269 },
//     { x: 437, y: 286 },
//     { x: 418, y: 286 }
//   ],
//   MCGRIDDLE: [
//     { x: 348, y: 291 },
//     { x: 436, y: 292 },
//     { x: 436, y: 311 },
//     { x: 348, y: 310 }
//   ],
//   SML: [
//     { x: 247, y: 314 },
//     { x: 269, y: 314 },
//     { x: 269, y: 337 },
//     { x: 247, y: 337 }
//   ],
//   ORANGE: [
//     { x: 278, y: 315 },
//     { x: 337, y: 315 },
//     { x: 337, y: 334 },
//     { x: 278, y: 334 }
//   ],
//   JUICE: [
//     { x: 349, y: 316 },
//     { x: 396, y: 316 },
//     { x: 396, y: 334 },
//     { x: 349, y: 334 }
//   ],
//   '2.00': [
//     { x: 568, y: 244 },
//     { x: 607, y: 243 },
//     { x: 607, y: 262 },
//     { x: 568, y: 263 }
//   ],
//   '2.60': [
//     { x: 568, y: 269 },
//     { x: 608, y: 269 },
//     { x: 608, y: 287 },
//     { x: 568, y: 287 }
//   ],
//   '2.89': [
//     { x: 568, y: 293 },
//     { x: 607, y: 293 },
//     { x: 607, y: 312 },
//     { x: 568, y: 312 }
//   ],
//   '1.79': [
//     { x: 571, y: 317 },
//     { x: 609, y: 317 },
//     { x: 609, y: 336 },
//     { x: 571, y: 337 }
//   ],
//   SUB: [
//     { x: 216, y: 365 },
//     { x: 247, y: 365 },
//     { x: 247, y: 384 },
//     { x: 216, y: 384 }
//   ],
//   TOTAL: [
//     { x: 258, y: 365 },
//     { x: 306, y: 365 },
//     { x: 306, y: 384 },
//     { x: 258, y: 384 }
//   ],
//   TAKE: [
//     { x: 216, y: 390 },
//     { x: 256, y: 390 },
//     { x: 256, y: 409 },
//     { x: 216, y: 409 }
//   ],
//   OUT: [
//     { x: 266, y: 390 },
//     { x: 295, y: 390 },
//     { x: 295, y: 409 },
//     { x: 266, y: 409 }
//   ],
//   TAX: [
//     { x: 309, y: 390 },
//     { x: 337, y: 390 },
//     { x: 337, y: 408 },
//     { x: 309, y: 408 }
//   ],
//   '9.28': [
//     { x: 569, y: 367 },
//     { x: 608, y: 367 },
//     { x: 608, y: 386 },
//     { x: 569, y: 386 }
//   ],
//   '0.87': [
//     { x: 569, y: 392 },
//     { x: 608, y: 392 },
//     { x: 608, y: 410 },
//     { x: 569, y: 410 }
//   ],
//   '10.15': [
//     { x: 563, y: 542 },
//     { x: 610, y: 542 },
//     { x: 610, y: 560 },
//     { x: 563, y: 560 }
//   ],
//   CARD: [
//     { x: 203, y: 486 },
//     { x: 247, y: 486 },
//     { x: 247, y: 513 },
//     { x: 203, y: 513 }
//   ],
//   ISSUER: [
//     { x: 255, y: 486 },
//     { x: 315, y: 486 },
//     { x: 315, y: 513 },
//     { x: 255, y: 513 }
//   ],
//   VISA: [
//     { x: 200, y: 516 },
//     { x: 245, y: 516 },
//     { x: 245, y: 537 },
//     { x: 200, y: 537 }
//   ],
//   SALE: [
//     { x: 256, y: 517 },
//     { x: 295, y: 517 },
//     { x: 295, y: 536 },
//     { x: 256, y: 536 }
//   ],
//   TRANSACTION: [
//     { x: 200, y: 538 },
//     { x: 321, y: 538 },
//     { x: 321, y: 563 },
//     { x: 200, y: 563 }
//   ],
//   AMOUNT: [
//     { x: 328, y: 538 },
//     { x: 390, y: 538 },
//     { x: 390, y: 563 },
//     { x: 328, y: 563 }
//   ],
//   AUTH: [
//     { x: 196, y: 564 },
//     { x: 245, y: 564 },
//     { x: 245, y: 589 },
//     { x: 196, y: 589 }
//   ],
//   CODE: [
//     { x: 257, y: 564 },
//     { x: 297, y: 564 },
//     { x: 297, y: 589 },
//     { x: 257, y: 589 }
//   ],
//   '061006': [
//     { x: 309, y: 564 },
//     { x: 371, y: 564 },
//     { x: 371, y: 589 },
//     { x: 309, y: 589 }
//   ],
//   'SEO#': [
//     { x: 378, y: 564 },
//     { x: 423, y: 564 },
//     { x: 423, y: 589 },
//     { x: 378, y: 589 }
//   ],
//   ACCOUNT: [
//     { x: 358, y: 491 },
//     { x: 427, y: 491 },
//     { x: 427, y: 510 },
//     { x: 358, y: 510 }
//   ],
//   '#': [
//     { x: 440, y: 494 },
//     { x: 448, y: 494 },
//     { x: 448, y: 509 },
//     { x: 440, y: 509 }
//   ],
//   '************4500': [
//     { x: 359, y: 518 },
//     { x: 519, y: 518 },
//     { x: 519, y: 535 },
//     { x: 359, y: 535 }
//   ]
// }

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
