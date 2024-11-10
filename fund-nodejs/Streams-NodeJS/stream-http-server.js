import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumerStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1

        console.log(transformed) 

        callback(null , Buffer.from(String(transformed)))
    }
}

//req = ReadableStream
//res = RestableStream

const server = http.createServer(async (req ,res ) => {
   
   const buffers = []

   // percorre cada pedaço da req e adic em buffers
   for await (const chunk of req ){
    buffers.push(chunk)
   }
   
   // 

   const fullSreamContent = Buffer.concat(buffers).toString()

   console.log(fullSreamContent)

   return res.end(fullSreamContent)
   
    // return req
    //     .pipe(new InverseNumerStream())
    //     .pipe(res)

})

server.listen(3334)