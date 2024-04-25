const MC = require('mongodb').MongoClient;
const url = "mongodb+srv://lastproblemset:OIyuywDdK7hNz9LJ@cluster0.pillj9x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const readline = require('readline')
const fs = require('fs')

main()

async function main() {
    client = new MC(url)
    db = client.db('ps3-4')
    collection = db.collection('places')
    await start(collection)

    client.close()
}

async function start(collection) {
    file = readline.createInterface({input: fs.createReadStream("zips.csv")})
    for await (line of file) {
        [place, zip] = line.split(",")
        await upsert(place, zip, collection)
    }
}

async function upsert(place, zip, collection) {
    query = { "place": place }
    update = { $set: { "place": place }, $push: { "zip" : zip } }
    options = { upsert : true }

    await collection.updateOne(query, update, options)
        .then((res) => {
            if (res.upsertedCount > 0) {
                console.log("inserted " + place)
            }
            else {
                console.log("updated " + place)
            }
        })
}