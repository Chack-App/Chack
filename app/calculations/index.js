function filterData(apiArray) {
  const sanitizedData = [];
  apiArray.forEach(item => {
    const sanitizedItem = {};
      sanitizedItem.description = item.description;
      sanitizedItem.vertices = item.boundingPoly.vertices;
      sanitizedData.push(sanitizedItem);
    }
  )
  // console.log(sanitizedData)
  return sanitizedData;
}

export function parseData(apiArray) {
  const receipt = filterData(apiArray);
  // Order by Y coordinates
  receipt.sort(function(a, b) {
    // console.log(a.vertices[0].y)
    // console.log(b.vertices[0].y)
    if (a.vertices[0].y < b.vertices[0].y) {
      return -1
    } if (a.vertices[0].y > b.vertices[0].y) {
      return 1;
    }
    return 0;
  });
  // console.log('order by y', receipt)
  // Group by row
  const groupedReceipt = [];
  for (let i = 0; i < receipt.length; i++) {
    // console.log(receipt[i].vertices[0].y - receipt[i - 1].vertices.y)
    if (!receipt[i - 1]) {
      groupedReceipt.push([receipt[i]]);
    }
    else if (receipt[i].vertices[0].y - receipt[i - 1].vertices[0].y > 6) {
      groupedReceipt.push([receipt[i]])
    } else {
      groupedReceipt[groupedReceipt.length - 1].push(receipt[i])
    }
  }
  // console.log(groupedReceipt)
  // Order each row by X coordinates
  groupedReceipt.forEach((row) => row.sort(function(a, b) {
    // console.log(a.vertices[0].x)
    // console.log(b.vertices[0].x)
      if (a.vertices[0].x < b.vertices[0].x) {
        return -1
      } if (a.vertices[0].x > b.vertices[0].x) {
        return 1;
      }
      return 0;
    })
  );
  // console.log(groupedReceipt)
  //Filter out rows that do not contain a price at the end of the row
  const filteredGroup = groupedReceipt.filter((row) => !!Number(row[row.length - 1].description && row[row.length - 1].description))
  const items = [];
  for (let i = 0; i < filteredGroup.length; i++) {
    let row = filteredGroup[i]
    let item = {};
    item.price = row[row.length - 1].description;
    item.name = "";
    for (let j = 0; j < row.length - 1; j++) {
      if (row[j].description !== '$') {
        item.name += row[j].description + " ";
      }
    }
    items.push(item)
  }
  const ignore = ["TOTAL", "CREDIT", "SUBTOTAL", "CARD", "TAX", "TIP", "TRANSACTION"]
  let actualItems = items.filter((item) => {
    for (let i = 0; i < ignore.length; i++) {
      if (!item.name) {
        return false;
      }
      if (item.name.toUpperCase().includes(ignore[i])) {
        return false;
      }
    }
    if (item.price.includes('.')) {
      item.price = Math.floor(Number(item.price) * 100);
      return true;
    } else {
      return false;
    }
  })
  console.log(items)
  console.log('Actual items', actualItems)
  return actualItems;
}





