const findInObject = props => {
  const { object, search } = props

  let result

  for (const key in object) {
    const objectItem = object[key]
    const searchKey = Object.keys(search)[0]
    const objectItemValue = objectItem[searchKey]
    const searchValue = search[searchKey]

    if (objectItemValue === searchValue) {
      result = key
    }
  }

  return result
}

module.exports = findInObject
