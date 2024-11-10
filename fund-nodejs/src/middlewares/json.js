export async function json(req, res) {

    const buffers = []

   // percorre cada pedaço da req e adic em buffers
   for await (const chunk of req ){
    buffers.push(chunk)
   }

   try{
    req.body = JSON.parse(Buffer.concat(buffers).toString())
   } catch{
    req.body = null
   }

   res.setHeader('Content-Type', 'application/json')

}