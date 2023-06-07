class HashTable {
  public table: string[][][]
  public size: number
  constructor() {
    this.table = []
    this.size = 0
  }

  hashCode(key: string) {
    let index = 0
    for (let i = 0; i < key.length; i++) {
      index += key.charCodeAt(i)
    }
    return index % this.size
  }

  set(key: string, value: string) {
    const index = this.hashCode(key)
    let bucket: string[][] | undefined = this.table[index]

    if (!bucket || !bucket.length) {
      bucket = [[key, value]]
    } else {
      const item = bucket.find(([itemKey]) => itemKey === key)
      if (item) {
        item[1] = value
      } else {
        bucket.push([key, value])
      }
    }
    this.table[index] = bucket
  }

  get(key: string) {
    const index = this.hashCode(key)
    const bucket = this.table[index]
    if (!bucket) {
      return null
    }

    const item = bucket.find(([itemKey]) => itemKey === key)

    if (!item) {
      return null
    }

    return item[1]
  }

  isEmpty() {
    return this.size <= 0
  }
}

const hashTable = new HashTable()
hashTable.set("name", "liao")

console.log(hashTable.get("name"))

hashTable.set("mane", "oho")

console.log(hashTable.get("mane"))
console.log(hashTable.get("name"))
console.log(hashTable.get("nae"))
