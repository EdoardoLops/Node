import {createServer} from "node:http"

const server = createServer((req, res) => {
    console.log("request ricevuto");
    
    res.statusCode = 200

    res.setHeader("Content-Type", "text/html");

    res.end("<html><body><h1>Questo server funziona</h1></body></html>")
})

server.listen(3000, ()=> {
    console.log("i server ascolta a http://localhost:3000");
    
})