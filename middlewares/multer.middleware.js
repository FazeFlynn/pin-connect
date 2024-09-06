import multer from "multer";
// console.log('came in multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // console.log('came in multer2')
      cb(null, "public/temp/")

    },
    filename: function (req, file, cb) {
      // console.log('came in multer3')

      
      cb(null, file.originalname)
    }
  })
  
export const upload = multer({ 
    storage
})