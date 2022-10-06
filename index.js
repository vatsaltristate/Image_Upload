const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const router = express.Router();


// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const stg = multer.diskStorage({
  destination: (req, res, abc) => {
    abc(null, "uploads");
  },
  filename: (req, file, abc) => {
    console.log(file);
    abc(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFlt = (req, file, abc,err) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    abc(null, true);
  } else { 
    abc(null, false);
  }
  console.log(err, '::::::::: err')
};

const fileupload = multer({ storage: stg, fileFilter: fileFlt });

app.post('/img', fileupload.single('image') , (req, res, next) => {

    try{
        return res.status(201).json({
            message : 'file upload successfully please check it'
        })
    } catch(err){
        console.log(err)
    }
});


router.get('/img',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

// app.get("/", (req, res) => {
//   res.send("image upload");
// });  

app.use('/', router);

app.listen(4000, (err) => {
  console.log("your server is starting http://localhost:4000");
});
