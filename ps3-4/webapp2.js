http = require('http')
fs = require('fs')
readline = require("readline")
url = require('url')
var port = process.env.PORT || 8080
const mc = require('mongodb').MongoClient;
const connString = "mongodb+srv://lastproblemset:OIyuywDdK7hNz9LJ@cluster0.pillj9x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

async function getMongo(request, callback) {
    client = new mc(connString)
    db = client.db("ps3-4")
    collection = db.collection("places")
    option = { "projection" : {"_id" : 0 } }
    if (isNaN(request[0])) {
        query = { "place" : request }
    } 
    else {
        query = { "zip" : request }
    }

    collection.findOne(query, option)
        .then((res) => {
            if (res == null) {
                callback("Couldn't find " + request)
            } else {
                callback(JSON.stringify(res))
            }
        })
}

http.createServer(function (req, res) {
    urlObj = url.parse(req.url, true)

    if(urlObj.pathname == "/") {
        fileName= "home.html"
        fs.readFile(fileName, function (err, text) {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(text)
            res.end()
        })

    } else if(urlObj.pathname == "/process") {
        lookup = urlObj.query.lookup
        getMongo(lookup, function (text) {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(text)
            res.end()
        })
    }
}).listen(port)
