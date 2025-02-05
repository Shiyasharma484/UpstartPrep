const { response } = require("express");
const { dirname } = require("path");
var multer = require("multer");
var https = require("https");
const fs = require("fs");
const Path = require("path");
const Axios = require("axios");
const { parse } = require("csv-parse");
const SQL = require("../helpers/sql");
const reader = require("xlsx");
// const csvDemo = require("../csv/csvDemo.csv");
// var bodyParser = require("body-parser");

// app.use(
//   bodyParser.urlencoded({
//     limit: "50mb",
//     parameterLimit: 100000,
//     extended: false,
//   })
// );

// app.use(
//   bodyParser.json({
//     limit: "50mb",
//   })
// );

const con = require("../models/db");
const mime = require("mime");
const bcrypt = require("bcrypt");
const resizer = require("node-image-resizer");
const setup = {
  all: {
    path: "./uploads/thumbnails/",
    quality: 80,
  },
  versions: [
    {
      prefix: "big_",
      width: 1024,
      height: 768,
    },
    {
      prefix: "medium_",
      width: 512,
      height: 256,
    },
    {
      quality: 100,
      prefix: "small_",
      width: 128,
      height: 64,
    },
  ],
};
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

const CreateAttachment = (req, res) => {
  var allowed_mime_types = ["image/png", "image/jpeg", "image/jpg"];

  var folder = req.params.folder;
  var base64Image = req.body.file;
  var filename = req.body.filename;
  var mime_type = req.body.mime_type;
  let newname = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijfilenameklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 10) {
    newname += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  var dir = "/uploads/" + folder + "/";
  var img_name = newname + "_" + filename;
  filename = dir + newname + "_" + filename;
  fs.writeFile(
    "." + filename,
    base64Image,
    { encoding: "base64" },
    function (err) {
      if (err === null) {
        const Response = {
          status: "success",
          responsedata: {
            path: filename,
            thumbnails: [
              "/uploads/thumbnails/big_" + img_name,
              "/uploads/thumbnails/medium_" + img_name,
              "/uploads/thumbnails/small_" + img_name,
            ],
          },
        };
        const appDir = dirname(filename);
        console.log(appDir);
        (async () => {
          await resizer("./" + filename, setup);
        })();
        res.status(201).json(Response);
        console.log("File created");
      } else {
        const Error = { status: "error", message: "Server Error" };
        res.status(204).json(Error);
      }
    }
  );
};
const Resize = (req, res) => {
  var allowed_mime_types = ["image/png", "image/jpeg", "image/jpg"];

  var folder = req.params.folder;
  let newname = "";
  var fullPath = "./uploads/" + folder;
  fs.readdir(fullPath, (error, files) => {
    if (error) console.log(error);
    // const Error = { status: "error", message: "Server Error" };
    //res.status(204).json(Error);
    files.forEach((file) => {
      (async () => {
        await resizer(fullPath + "/" + file, setup);
      })();
      console.log(file);
    });
  });
};
const downloadFromUrl = async (req, res) => {
  var url = req.body.url;
  var filename = Path.basename(url);

  let newname = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijfilenameklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 10) {
    newname += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  filename = newname + "_" + filename;
  const path = Path.resolve(__dirname, "../uploads/posts", filename);
  const writer = fs.createWriteStream(path);
  try {
    const response = await Axios({
      url,
      method: "GET",
      responseType: "stream",
    });
    response.data.pipe(writer);
    res.status(201).json({ path: "/uploads/posts/" + filename });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const readCSV = async () => {
  var data = [];
  await fs
    .createReadStream("./uploads/csvDemo.csv")
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
      data.push(row);
      const create_data = SQL.addData("users", {
        first_Name: row[0],
        last_Name: row[1],
        phone: row[2],
        gender: row[3],
        email: row[4],
        password: row[5],
      });
    })

    .on("error", function (error) {
      console.log(error.message);
    })
    .on("end", function () {
      return data;
    });
};
const readCSVxls = async (req, res) => {
  // Reading our test file
  const file = reader.readFile("./uploads/csvDemo.xls");

  let data = [];

  const sheets = file.SheetNames;

  for (let i = 0; i < sheets.length; i++) {
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
    temp.forEach((res) => {
      data.push(res);
    });
  }

  // Printing data
  console.log(data);
};

const InsertDoc = (req, res) => {
  var allowed_mime_types = [
    "xlsx",
    "csv",
    "xls",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];
  console.log(allowed_mime_types);
  console.log(req.mimetype);
  var multerConfig = multer.diskStorage({
    destination: function (req, file, callback) {
      console.log("2nd destination:  "); //yes file
      console.log(file);
      callback(null, "uploads/doc"); //giving location OR callBack(null, "./public/images/");
    },
    filename: function (req, file, callback) {
      console.log("3rd filename:  ");
      console.log(file);
      const ext = file.mimetype.split("/")[1];
      // callback(null, `image-${Date.now()}.${ext}`);//both works fine
      callback(
        null,
        // file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        Date.now().toString(11) + Path.extname(file.originalname)
      );
    },
  });
  const isImage = (req, file, callback) => {
    console.log("1st isImage:  "); //yes file
    if (allowed_mime_types.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error("Only Document is allowed"));
    }
  };
  // var upload = multer({ storage: multerConfig, fileFilter: isImage }).array(
  //   "photo",
  //   2
  // ); //multiple
  var upload = multer({ storage: multerConfig, fileFilter: isImage }).single(
    "photo"
  ); //single
  console.log(isImage);

  upload(req, res, function (err) {
    // console.log(req.file); //complete file
    if (!req.file) {
      // console.log("No file upload");
      return res.end("Error uploading file.");
    } else {
      // console.log(req.file.filename);
      // var imgsrc = domainpath + "/uploads/category/" + req.file.filename; //url to save
      var imgsrc = "/" + req.file.destination + "/" + req.file.filename; //url to save this is correct wd /slash
      // console.log(imgsrc);
      res.status(200).json({
        success: "Success",
        url: imgsrc,
      });
    }
  });
};

const InsertImage = (req, res) => {
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
        Date.now().toString(11) + Path.extname(file.originalname)
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
      // console.log(imgsrc);
      res.status(200).json({
        success: "Success",
        url: imgsrc,
      });
    }
  });
};

module.exports = {
  CreateAttachment,
  Resize,
  downloadFromUrl,
  readCSV,
  readCSVxls,
  InsertDoc,
  InsertImage,
};
