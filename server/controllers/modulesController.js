const con = require("../models/db");

const {
  encrypttheid,
  decodetheid,
  generateVerificationCodePF,
} = require("../helpers/encode-decode");

// GetAllModulesNamesAndIds from database table --modules-DONE--------------------------------------------------------------
const GetAllModulesNamesAndIds = (req, res) => {
  con.query(
    "SELECT id, name from modules WHERE active=1 AND trash=0",
    (err, response) => {
      if (!err) {
        if (response && response.length > 0) {
          console.log(response);
          //if (response) {
          //array is defined and is not empty
          // let o = Object.fromEntries(
          //   Object.entries(response).filter(([_, v]) => v != null)
          // );
          const Response = {
            status: "success",
            responsedata: { modules: response },
          };
          res.status(200).json(Response);
        } else {
          const Response = {
            status: "error",
            message: "no data in database",
          };
          res.status(204).json(Response);
        }
      } else {
        console.log(err);
        const Error = { status: "error", message: "Server Error" };
        res.status(400).json(Error);
      }
    }
  );
};
//-------------------------------------------------------------------------------------------------------------

//CHECK IF Module ALREADY EXISTS --- FOR ADDING NEW Module---------------------+++++++++++++++++++
const checkmodulealready = (req, res) => {
  // console.log("inside check module name already");
  // console.log(req.body);
  const name = req.body.name;
  //console.log(name);
  const slug = req.body.slug;
  //console.log(slug);
  const parent_id = req.body.parent_id;
  //console.log(parent_id);
  if (
    (name && name.length > 0 && slug && slug.length > 0) ||
    (name &&
      name.length > 0 &&
      slug &&
      slug.length > 0 &&
      parent_id &&
      parent_id > 0)
  ) {
    // -----------------------------------------------------------------------------------------------------------------1
    var sqll;
    var params;
    if (parent_id && parent_id > 0) {
      console.log("Wd parent_id");
      sqll = "SELECT id from modules WHERE name=? AND slug=? AND parent_id=?";
      params = [name, slug, parent_id];
    } else {
      console.log("Wdout parent_id");
      sqll = "SELECT id from modules WHERE name=? AND slug=?";
      params = [name, slug];
    }
    const sql1 = con.query(
      // "SELECT id from modules WHERE name=? AND slug=?",
      // [name, slug],
      sqll,
      params,
      (err, response) => {
        console.log(response);
        console.log(response.length);
        if (!err) {
          if (response && response.length > 0) {
            console.log("Module Name And Slug Name Already Exists");
            // const encryptedid = encrypttheid(response[0].id);
            const Response = {
              // userId: encryptedid,
              message: "Module Name And Slug Name Already Exists",
            };
            res.status(200).json(Response);
          }
          //----------------------------------------------------------------------------------------------2
          else {
            console.log("Check Module Name");
            var sqll1;
            var params1;
            if (parent_id && parent_id > 0) {
              console.log("Wd parent_id - chk module name");
              sqll1 = "SELECT id from modules WHERE name=? AND parent_id=?";
              params1 = [name, parent_id];
            } else {
              console.log("Wdout parent_id - chk module name");
              sqll1 = "SELECT id from modules WHERE name=?";
              params1 = [name];
            }

            con.query(
              sqll1,
              params1,
              // "SELECT id from modules WHERE name=?",
              // [name],
              (err, response) => {
                if (!err) {
                  if (response && response.length > 0) {
                    //console.log("Module Name already exists");
                    // const encryptedid = encrypttheid(response[0].id);
                    const Response = {
                      // userId: encryptedid,
                      message: "Module Name Already Exists",
                    };
                    res.status(200).json(Response);
                  }
                  //-----------------------------------------------------------------------------3
                  else {
                    console.log("Check Slug Name");
                    var sqll2;
                    var params2;
                    if (parent_id && parent_id > 0) {
                      console.log("Wd parent_id - chk slug name");
                      sqll2 =
                        "SELECT id from modules WHERE slug=? AND parent_id=?";
                      params2 = [slug, parent_id];
                    } else {
                      console.log("Wdout parent_id - chk slug name");
                      sqll2 = "SELECT id from modules WHERE slug=?";
                      params2 = [slug];
                    }
                    con.query(
                      sqll2,
                      params2,
                      // "SELECT id from modules WHERE slug=?",
                      // [slug],
                      (err, response) => {
                        if (!err) {
                          if (response && response.length > 0) {
                            //console.log("Module Name already exists");
                            // const encryptedid = encrypttheid(response[0].id);
                            const Response = {
                              // userId: encryptedid,
                              message: "Slug Name Already Exists",
                            };
                            res.status(200).json(Response);
                          } else {
                            // console.log("No Module Name found in db");
                            const Response = {
                              message: "itsnewmodule",
                            };
                            res.status(201).json(Response);
                          }
                        } else {
                          console.log(err);
                          const Response = {
                            Error: err,
                          };
                          res.status(400).json(Response);
                        }
                      }
                    );
                  }
                  //-----------------------------------------------------------------------------3
                } else {
                  console.log(err);
                  const Response = {
                    Error: err,
                  };
                  res.status(400).json(Response);
                }
              }
            );
          }
          //-----------------------------------------------------------------------------------------------2
        } else {
          console.log(err);
          const Response = {
            Error: err,
          };
          res.status(400).json(Response);
        }
      }
    );
    console.log(sql1.sql);
    //----------------------------------------------------------------------------------------------------------------------1
  } else {
    console.log("Invalid Details");
    const Error = { status: "error", message: "Invalid Details" };
    res.status(400).json(Error);
  }
};

//----------------------------------------------------------------------------------++++++++++++++++++++++

// GetAllModules from database table --modules-DONE--------------------------------------------------------------
const GetAllModules = (req, res) => {
  console.log("Inside GetAllModules");
  //
  const sql = con.query(
    "SELECT m.id, m.name, m.parent_id, m1.name as parent_name, m.slug, m.active from modules as m LEFT JOIN modules as m1 ON m.parent_id=m1.id WHERE m.trash = 0 ORDER BY m.updated_at DESC",
    (err, response) => {
      if (!err) {
        if (response && response.length > 0) {
          console.log(response);
          //array is defined and is not empty
          const Response = {
            status: "success",
            responsedata: { modules: response },
          };
          res.status(200).json(Response);
        } else {
          console.log("No data for Modules in DB");
          const Response = {
            status: "error",
            message: "no data in database",
          };
          res.status(204).json(Response);
        }
      } else {
        console.log(err);
        const Error = { status: "error", message: "Server Error" };
        res.status(400).json(Error);
      }
    }
  );
  console.log(sql.sql);
};
//-------------------------------------------------------------------------------------------------------------

// // //Get a single product_category by id --DONE-------------------------------------------------------------------------------
// // const GetSingleProductCategoryById = (req, res) => {
// //   // console.log(req.params.id);
// //   console.log("inside 1");
// //   const encryptedid = req.params.id;
// //   const productcategoryId = decodetheid(encryptedid);

// //   //const sql = con.query(
// //   con.query(
// //     "SELECT s.id, s.name, s.parent_category_id, s1.name AS parent_category_name, s.store_type_id, st.name AS store_type_name, s.description, s.active, s.image, s.created_at, s.updated_at from product_category as s INNER JOIN store_type as st ON s.store_type_id = st.id LEFT JOIN product_category as s1 ON s.parent_category_id = s1.id WHERE s.id=?",
// //     [productcategoryId],
// //     (err, response) => {
// //       if (!err) {
// //         if (response && response.length) {
// //           //array is defined and is not empty
// //           const Response = {
// //             status: "success",
// //             responsedata: { productcategory: response },
// //           };
// //           res.status(200).json(Response);
// //         } else {
// //           const Response = {
// //             status: "error",
// //             message: "no data in database",
// //           };
// //           res.status(204).json(Response);
// //         }
// //       } else {
// //        console.log(err);
// const Error = { status: "error", message: "Server Error" };
// //         res.status(400).json(Error);
// //       }
// //     }
// //   );
// //   // console.log(sql.sql);
// // };
// // //-----------------------------------------------------------------------------------------------------------
// CreateModule  into database table --modules-DONE--------------------------------------------------------------
const CreateModule = async (req, res) => {
  const data = req.body;
  //
  const name = req.body.name;
  //console.log(name);
  const slug = req.body.slug;
  //console.log(slug);
  const parent_id = req.body.parent_id;
  //console.log(parent_id);
  if (
    (name && name.length > 0 && slug && slug.length > 0) ||
    (name &&
      name.length > 0 &&
      slug &&
      slug.length > 0 &&
      parent_id &&
      parent_id > 0)
  ) {
    //
    let filteredData = Object.fromEntries(
      Object.entries(data).filter(
        ([_, v]) => v != "null" && v != "" && v != null
      )
    );
    //console.log(filteredData);
    con.query("INSERT INTO modules SET ?", [filteredData], (err, result) => {
      if (!err) {
        //res.json("Registered Successfully");

        //1--finding id of last record inserted and then finding that data from mysql and sending that data to url to show inpostman
        const LastID = result.insertId;
        // console.log(LastID);
        con.query(
          "SELECT m.id, m.name, m.parent_id, m1.name as parent_name, m.slug, m.active, m.created_at, m.updated_at from modules as m LEFT JOIN modules as m1 ON m.parent_id=m1.id WHERE m.id=?",
          [LastID],
          (err, response) => {
            if (!err) {
              if (response && response.length > 0) {
                const Response = {
                  status: "success",
                  data: { modules: response },
                };
                res.status(201).json(Response);
              } else {
                const Error = { status: "error", message: "No Data" };
                res.status(204).json(Error);
              }
            } else {
              console.log(err);
              const Error = { status: "error", message: "Server Error" };
              res.status(400).json(Error);
            }
          }
        );
        //end--1
        //end--1
      } else {
        console.log(err);
        console.log(err);
        const Error = { status: "error", message: "Server Error" };
        res.status(400).json(Error);
      }
    });
  } else {
    console.log("Invalid Details");
    const Error = { status: "error", message: "Invalid Details" };
    res.status(400).json(Error);
  }
};
//-----------------------------------------------------------------------------------------------------------------
// UPDATE a module  in database table --modules-----------------------------------------------
const UpdateModuleById = (req, res) => {
  console.log("Inside UpdateModuleById");
  //console.log(req.body);
  //
  const data = req.body;
  //console.log(data);
  //
  // const encryptedid = req.params.id;
  // const productcategoryId = decodetheid(encryptedid);
  const moduleId = req.params.id;
  //console.log(moduleId);
  if (
    moduleId &&
    moduleId > 0 &&
    data &&
    data !== undefined &&
    Object.keys(data).length != 0
  ) {
    console.log("Valid Details");
    //
    // let filteredData = Object.fromEntries(
    //   Object.entries(data).filter(
    //     ([_, v]) => v != "null" && v != "" && v != null
    //   )
    // );
    // console.log(filteredData);
    //
    var module_data = {};
    if (data.hasOwnProperty("name") && data.name.length > 0) {
      module_data.name = data.name;
    }
    if (
      data.hasOwnProperty("parent_id")
      //&& data.parent_id > 0
    ) {
      module_data.parent_id = data.parent_id;
    }
    if (data.hasOwnProperty("slug") && data.slug.length > 0) {
      module_data.slug = data.slug;
    }
    if (
      data.hasOwnProperty("active") &&
      (data.active == 0 || data.active == 1)
    ) {
      module_data.active = data.active;
    }
    // console.log(module_data);
    //
    if (
      module_data &&
      module_data !== undefined &&
      Object.keys(module_data).length != 0
    ) {
      console.log("Valid Details");
      //
      const sql = con.query(
        "UPDATE modules SET ? WHERE id=?",
        [module_data, moduleId],
        (err, result) => {
          console.log(err);
          console.log("inside query after execution");
          if (!err) {
            if (result && result.affectedRows > 0) {
              console.log("inside query no eror--LLLLLLLLLLLLLL");
              //res.json("Updated Successfully");
              //1--START- FETCHING data by id of record updated
              // con.query(
              //   "SELECT * FROM modules WHERE id=?",
              //   [moduleId],
              //   (err, response) => {
              //     if (!err) {
              //       console.log("no error mysql");
              //       const Response = {
              //         status: "success",
              //         data: { module: response },
              //       };
              //       res.status(201).json(Response);
              //     } else {
              //       console.log(err);
              //       const Error = { status: "error", message: "Server Error" };
              //       res.status(400).json(Error);
              //     }
              //   }
              // );
              //end--1
              console.log("Everything done");
              const Response = {
                status: "success",
                message: "Updated Successfully",
              };
              res.status(200).json(Response);
            } else {
              console.log("Update error sql");
              const Error = { status: "error", message: "Server Error" };
              res.status(400).json(Error);
            }
          } else {
            console.log("ERRRRRRRRRRRRRRRRORRRRRRRRRR");
            console.log(err);
            const Error = { status: "error", message: "Server Error" };
            res.status(400).json(Error);
          }
        }
      );
      console.log(sql.sql);
      //
    } else {
      console.log("Invalid Details");
      const Error = { status: "error", message: "Invalid Details" };
      res.status(400).json(Error);
    }
    //
  } else {
    console.log("Invalid Details to update module");
    const Error = { status: "error", message: "Invalid Details" };
    res.status(400).json(Error);
  }
};
//-----------------------------------------------------------------------------------------------------------------
// EnableModuleById in database table --modules-----------------------------------------------STARTS
const EnableModuleById = (req, res) => {
  //console.log("inside enable");
  //
  const moduleID = req.params.id;
  //console.log(moduleID);
  //
  if (moduleID && moduleID > 0) {
    const sql = con.query(
      "UPDATE modules SET active = 1 WHERE id=?",
      [moduleID],
      (err, response) => {
        console.log(response);
        if (!err) {
          if (response && response.affectedRows > 0) {
            const Response = {
              status: "success",
              data: { message: "Module Enabled successfully" },
            };
            res.status(200).json(Response);
          } else {
            console.log(err);
            const Error = { status: "error", message: "Server Error" };
            res.status(400).json(Error);
          }
        } else {
          console.log(err);
          const Error = { status: "error", message: "Server Error" };
          res.status(400).json(Error);
        }
      }
    );
    console.log(sql.sql);
  } else {
    const Error = { status: "error", message: "Invalid Details" };
    res.status(400).json(Error);
  }
};
// EnableModuleById in database table --modules-----------------------------------------------ENDS
// DisableModuleById in database table --modules-----------------------------------------------STARTS
const DisableModuleById = (req, res) => {
  //console.log("inside disable");
  //
  const moduleID = req.params.id;
  //console.log(moduleID);
  //
  if (moduleID && moduleID > 0) {
    const sql = con.query(
      "UPDATE modules SET active = 0 WHERE id=?",
      [moduleID],
      (err, response) => {
        //  console.log(response);
        if (!err) {
          if (response && response.affectedRows > 0) {
            const Response = {
              status: "success",
              data: { message: "Module Disabled successfully" },
            };
            res.status(200).json(Response);
          } else {
            console.log(err);
            const Error = { status: "error", message: "Server Error" };
            res.status(400).json(Error);
          }
        } else {
          console.log(err);
          const Error = { status: "error", message: "Server Error" };
          res.status(400).json(Error);
        }
      }
    );
    //console.log(sql.sql);
  } else {
    const Error = { status: "error", message: "Invalid Details" };
    res.status(400).json(Error);
  }
};
// DisableDiscount in database table --modules-----------------------------------------------ENDS
// DeleteModuleById in database table --modules-----------------------------------------------STARTS
const DeleteModuleById = (req, res) => {
  //console.log("inside delete");
  const moduleID = req.params.id;
  //console.log(pincodeID);
  if (moduleID && moduleID > 0) {
    const sql = con.query(
      "UPDATE modules SET trash = 1 WHERE id=?",
      [moduleID],
      (err, response) => {
        //  console.log(response);
        if (!err) {
          if (response && response.affectedRows > 0) {
            const Response = {
              status: "success",
              data: { message: "Module deleted successfully" },
            };
            res.status(200).json(Response);
          } else {
            console.log("Nothing Changed");
            console.log(err);
            const Error = { status: "error", message: "Server Error" };
            res.status(400).json(Error);
          }
        } else {
          console.log(err);
          const Error = { status: "error", message: "Server Error" };
          res.status(400).json(Error);
        }
      }
    );
    //console.log(sql.sql);
  } else {
    const Error = { status: "error", message: "Invalid Details" };
    res.status(400).json(Error);
  }
};
// DeleteModuleById in database table --modules-----------------------------------------------ENDS
// GetModuleById from database table --modules-DONE--------------------------------------------------------------
const GetModuleById = (req, res) => {
  const moduleID = req.params.id;
  //console.log(pincodeID);
  if (moduleID && moduleID > 0) {
    con.query(
      "SELECT m.id, m.name, m.parent_id, m1.name as parent_name, m.slug, m.active from modules as m LEFT JOIN modules as m1 ON m.parent_id=m1.id WHERE m.id=? AND m.trash=0",
      [moduleID],
      (err, response) => {
        if (!err) {
          if (response && response.length > 0) {
            console.log(response);
            //array is defined and is not empty
            const Response = {
              status: "success",
              responsedata: { module: response },
            };
            res.status(200).json(Response);
          } else {
            const Response = {
              status: "error",
              message: "no data in database",
            };
            res.status(204).json(Response);
          }
        } else {
          console.log(err);
          const Error = { status: "error", message: "Server Error" };
          res.status(400).json(Error);
        }
      }
    );
  } else {
    const Error = { status: "error", message: "Invalid Details" };
    res.status(400).json(Error);
  }
};
//-------------------------------------------------------------------------------------------------------------
// GetModuleByParentId from database table --modules-DONE--------------------------------------------------------------
const GetModuleByParentId = (req, res) => {
  const moduleParentID = req.params.id;
  //console.log(pincodeID);
  if (moduleParentID && moduleParentID > 0) {
    con.query(
      "SELECT m.id, m.name, m.parent_id, m1.name as parent_name, m.slug, m.active from modules as m LEFT JOIN modules as m1 ON m.parent_id=m1.id WHERE m.parent_id=? AND m.trash=0",
      [moduleParentID],
      (err, response) => {
        if (!err) {
          if (response && response.length > 0) {
            console.log(response);
            //array is defined and is not empty
            const Response = {
              status: "success",
              responsedata: { module: response },
            };
            res.status(200).json(Response);
          } else {
            const Response = {
              status: "error",
              message: "no data in database",
            };
            res.status(204).json(Response);
          }
        } else {
          console.log(err);
          const Error = { status: "error", message: "Server Error" };
          res.status(400).json(Error);
        }
      }
    );
  } else {
    const Error = { status: "error", message: "Invalid Details" };
    res.status(400).json(Error);
  }
};
//-------------------------------------------------------------------------------------------------------------

module.exports = {
  checkmodulealready,
  GetAllModulesNamesAndIds,
  GetAllModules,
  CreateModule,
  UpdateModuleById,
  EnableModuleById,
  DisableModuleById,
  DeleteModuleById,
  GetModuleById,
  GetModuleByParentId,
};
