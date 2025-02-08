const http = require("http")
const path = require("path")
const fs = require("fs")
const url = require("url")//манипулювати посиланнями

let server = http.createServer((req, res)=>{
    if(req.url == "/jokes" && req.method == "GET"){
        getAllJokes(req,res)
    }
    else if(req.url == "/jokes" && req.method =="POST"){
        addNewJoke(req,res)
    }
    else if(req.url.startsWith("/like") && req.method =="GET"){
        likePost(req, res)
    }
    else if(req.url.startsWith("/dislike") && req.method =="GET"){
        disPost(req, res)
    }
    else{
        res.writeHead(404, {"content-type": "text/plain"})
        res.end("404 not found")
    }
})

server.listen(3000, ()=>console.log("Server is on!"))

function getAllJokes(req,res){
    let pathToJokes = path.join(__dirname, "static", "data")
    let jokes = fs.readdirSync(pathToJokes)
    let jokesArray =[]
    jokes.forEach((el)=>{
        let pathToFile = path.join(pathToJokes, el)
        let content = fs.readFileSync(pathToFile)
        let text = Buffer.from(content).toString()
        let joke = JSON.parse(text)
        jokesArray.push(joke)
    })
    res.writeHead(200, {"content-type": "text/json"})
    res.end(JSON.stringify(jokesArray))
}

function addNewJoke(req,res){
    let content=""
    req.on("data", function(chunk){
        content+=chunk
    })
    req.on("end", function(){
        content =JSON.parse(content).content
        console.log(content)
        let pathToJokes = path.join(__dirname, "static", "data")
        let jokes = fs.readdirSync(pathToJokes)
        let count= jokes.length
        let newContent= {
            content,
            likes:0,
            dislikes:0
    }
    fs.writeFileSync(path.join(pathToJokes, count+".json"), JSON.stringify(newContent))
    res.end("ok")
    })
}

function likePost(req, res){
    let params=url.parse(req.url, true).query
    console.log(params)
    let pathToJoke = path.join(__dirname, "static", "data", params.id + ".json")
    let joke= fs.readFileSync(pathToJoke)
    joke= Buffer.from(joke).toString()
    joke= JSON.parse(joke)

    joke.likes++

    joke = JSON.stringify(joke)
    fs.writeFileSync(pathToJoke, joke)//(куда записуємо, що записуємо)

    res.end(joke)
}
function disPost(req, res){
    let params=url.parse(req.url, true).query
    console.log(params)
    let pathToJoke = path.join(__dirname, "static", "data", params.id + ".json")
    let joke= fs.readFileSync(pathToJoke)
    joke= Buffer.from(joke).toString()
    joke= JSON.parse(joke)

    joke.dislike++

    joke = JSON.stringify(joke)
    fs.writeFileSync(pathToJoke, joke)//(куда записуємо, що записуємо)

    res.end(joke)

}