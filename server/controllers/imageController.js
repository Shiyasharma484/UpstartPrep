var multer = require("multer");
const path = require("path");
const util = require("util");
const con = require("../models/db");
const fs = require("fs-extra"); //npm install fs.extra
const urlprefix = process.env.REACT_APP_DOMAIN_ENDPOINT;
//
function replaceAll(string, search, replace) {
  return string.split(search).join(replace);
}
//++++++++++++++++++++++++MULTIPLE++++++++++++++++++++++++++++//STARTS
const InsertImagePost = (req, res) => {
  console.log("inside InsertImagePost");
  //console.log(req);
  var multerConfig = multer.diskStorage({
    destination: function (req, file, callback) {
      //console.log("2nd destination:  "); //yes file
      //console.log(file);
      //THIS
      //const directory = `./uploads/posts/${req.params.id}`;
      const directory = `../client/public/uploads/posts`;
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
      }
      callback(null, directory); //giving location OR callBack(null, "./public/images/");
      //OR
      // callback(null, "uploads"); //giving location OR callBack(null, "./public/images/");
    },
    filename: function (req, file, callback) {
      //console.log("3rd filename:  ");
      //console.log(file);
      const ext = file.mimetype.split("/")[1];
      // callback(null, `image-${Date.now()}.${ext}`);//both works fine

      callback(
        null,
        //  file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        Date.now().toString(11) + path.extname(file.originalname)
      );
    },
  });

  const isImagePdfDocxXlsxCsv = (req, file, callback) => {
    //console.log("1st isImagePdfDocxXlsxCsv:  "); //yes file
    //console.log(file);
    if (file.mimetype.startsWith("image")) {
      callback(null, true);
    } else {
      callback(new Error("Only Image is allowed"));
    }
  };

  //1--works
  // var upload = util.promisify(
  //   multer({ storage: multerConfig, fileFilter: isImage }).array("photo", 3)
  // ); //multiple
  //2--works
  var upload = multer({
    storage: multerConfig,
    fileFilter: isImagePdfDocxXlsxCsv,
  }).array(
    "photo",
    10 //limit of 10 files
  ); //multiple files upload

  //var uploadFilesMiddleware = util.promisify(uploadFiles);

  upload(req, res, function (err) {
    //console.log(req.file); //complete file
    if (!req.files) {
      // console.log("No file upload");
      return res.end("Error uploading files.");
    } else {
      const filesUploaded = req.files;
      console.log(filesUploaded);
      let pathOfFiles = {};
      //  pathOfFiles = filesUploaded.map((a) => a.path); //shows error double slashes //dsds//sdsd/
      pathOfFiles = filesUploaded.map(
        //  (a) => "/" + a.destination + "/" + a.filename
        (a) => "/" + replaceAll(a.path, "\\", "/")
      );
      //   console.log(pathOfFiles);
      res.status(200).json({
        success: "Success",
        url: pathOfFiles,
      });
    }
  });
};
//++++++++++++++++++++++++MULTIPLE++++++++++++++++++++++++++++//ENDS
//

const Insertlogo = (req, res) => {
  var multerConfig = multer.diskStorage({
    destination: function (req, file, callback) {
      // console.log("2nd destination:  "); //yes file
      // console.log(file);
      callback(null, "../client/public/uploads/logo"); //giving location OR callBack(null, "./public/images/");
    },
    filename: function (req, file, callback) {
      // console.log("3rd filename:  ");
      // console.log(file);
      const ext = file.mimetype.split("/")[1];
      // callback(null, `image-${Date.now()}.${ext}`);//both works fine

      callback(
        null,
        // file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        Date.now().toString(11) + path.extname(file.originalname)
      );
    },
  });

  const isImage = (req, file, callback) => {
    // console.log("1st isImage:  "); //yes file
    // console.log(file);

    if (file.mimetype.startsWith("image")) {
      callback(null, true);
    } else {
      callback(new Error("Only Image is allowed"));
    }
  };

  // var upload = multer({ storage: multerConfig, fileFilter: isImage }).array(
  //   "photo",
  //   2
  // ); //multiple
  var upload = multer({ storage: multerConfig, fileFilter: isImage }).single(
    "photo"
  ); //single

  upload(req, res, function (err) {
    // console.log(req.file); //complete file
    if (!req.file) {
      // console.log("No file upload");
      return res.end("Error uploading file.");
    } else {
      // console.log(req.file.filename);
      // var imgsrc = domainpath + "/uploads/category/" + req.file.filename; //url to save
      var imgsrc = "/uploads/logo/" + req.file.filename; //url to save this is correct wd /slash
      console.log("KKKKKKKKKKKKKKKKKKKKKKKK");
      console.log(req.file.destination);
      // console.log(imgsrc);
      res.status(200).json({
        success: "Success",
        url: imgsrc,
      });
    }
  });
};

module.exports = {
  InsertImagePost,
  Insertlogo,
};
