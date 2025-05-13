
const http = require("http")
const server = http.createServer((req,res)=>{
 res.write("Hello from local system")
 res.end()
})

const port = 5000;

server.listen(port)

