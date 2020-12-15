import express from "express"


const main = async () => {

   const app = express()

   const port = process.env.PORT || 4000
   app.listen(port, () => {
      console.log(`Server started on port ${port}`)
   })

}

try {
   main()
} catch (error) {
   console.log(error)
}