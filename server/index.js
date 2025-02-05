const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
var cron = require("node-cron");
//
const cors = require("cors");
// const log = require("node-file-logger");
// const consoler = require("./util/logger").console.error;

const port = process.env.PORT; //5000

// We support json requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { RunScheduler } = require("../server/controllers/scheduleController");

//to get attachments via url++++++++++++++++++++++++++++++++STARTS
app.use(express.json({ limit: "10mb", extended: true }));
app.use("/uploads", express.static("uploads"));
//to get attachments via url++++++++++++++++++++++++++++++++ENDS

//CORS --Allow cors everywhere
// app.use(cors());
//specific
app.use(
  cors({
    origin: [
      process.env.CORS_ORIGIN1,
      process.env.CORS_ORIGIN2,
      process.env.CORS_ORIGIN3,
      process.env.CORS_ORIGIN4,
    ], //3000 frontend and 5000backend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
const { ValidateToken } = require("./ApiMiddleware");
//
app.get("/", (req, res) => {
  var currentdate = new Date();
  let nz_date_string = new Date().toLocaleString("en-US", {
    timeZone: "Europe/Moscow",
  });
  let date_nz = new Date(nz_date_string);
  let year = date_nz.getFullYear();
  let month = ("0" + (date_nz.getMonth() + 1)).slice(-2);
  let date = ("0" + date_nz.getDate()).slice(-2);
  let hours = ("0" + date_nz.getHours()).slice(-2);
  let minutes = ("0" + date_nz.getMinutes()).slice(-2);
  let sch_date = year + "-" + month + "-" + date;
  let sch_time = hours + ":" + minutes;

  const Response = `${sch_date} -- ${sch_time}  <h1>"Hello You are Welcome to MPI App."</h1>
<h2>This is test url to check whether server is working fine on port ${port}</h2>`;

  res.send(Response);
});

//--------------ROUTES-----------------------------------------------------------------------------------------
const userRouter = require("./routes/User");
app.use("/user", userRouter);

const postRouter = require("./routes/Post");
app.use("/post", ValidateToken, postRouter);

//IMAGES--------------------------------------------------------
const imagesRouter = require("./routes/Images");
app.use("/images", ValidateToken, imagesRouter);

//SETTINGS------------------------------------------------------
const configurationRouter = require("./routes/Configuration");
// app.use("/configuration", ValidateToken, configurationRouter);
app.use("/configuration", configurationRouter);

const encodedecodeRouter = require("./routes/EncodeDecode"); //for generating and testing ids
app.use("/encodedecode", ValidateToken, encodedecodeRouter);

const boardsRouter = require("./routes/Boards");
app.use("/board", ValidateToken, boardsRouter);

const pinsRouter = require("./routes/Pins");
app.use("/pin", ValidateToken, pinsRouter);

const attachmentRouter = require("./routes/Attachment");
app.use("/attachment", ValidateToken, attachmentRouter);

const pinterestRouter = require("./routes/Pinterest");
app.use("/pinterest", ValidateToken, pinterestRouter);

const scheduleRouter = require("./routes/Schedule");
app.use("/schedule", ValidateToken, scheduleRouter);

const defaultImageRouter = require("./routes/DefaultImage");
app.use("/default", defaultImageRouter);

const gptRouter = require("./routes/GPT");
app.use("/gpt", ValidateToken, gptRouter);

const SectionRouter = require("./routes/Section");
app.use("/section", SectionRouter);

const SkillsRouter = require("./routes/Skills");
app.use("/skills", SkillsRouter);

const TopicRouter = require("./routes/Topics");
app.use("/topics", TopicRouter);

const TagsRouter = require("./routes/Tags");
app.use("/tags", TagsRouter);

const CategoryRouter = require("./routes/Category");
app.use("/category", CategoryRouter);

const subCategoryRouter = require("./routes/SubCategory");
app.use("/subcategory", subCategoryRouter);

const entityRouter = require("./routes/Entity");
app.use("/entity", entityRouter);

const modulesRouter = require("./routes/Modules");
app.use("/module", modulesRouter);

const rolesRouter = require("./routes/Role");
app.use("/role", rolesRouter);

const permissionRouter = require("./routes/Permission");
app.use("/permission", permissionRouter);

const examRouter = require("./routes/Exams");
app.use("/exams", examRouter);

const groupRouter = require("./routes/Group");
app.use("/group", groupRouter);

const scheduleLearnRouter = require("./routes/ScheduleLearn");
app.use("/schedulelearn", scheduleLearnRouter);

const subscriptionRouter = require("./routes/Subscription");
app.use("/subscription", subscriptionRouter);

const lessonRouter = require("./routes/Lesson");
app.use("/lesson", lessonRouter);

const practiceSetsRouter = require("./routes/PracticeSets");
app.use("/practicesets", practiceSetsRouter);

const questionBankRouter = require("./routes/QuestionBank");
app.use("/questionBank", questionBankRouter);

const quizRouter = require("./routes/Quiz");
app.use("/quiz", quizRouter);

const comprehensionRouter = require("./routes/Comprehension");
app.use("/comprehension", comprehensionRouter);

const videoRouter = require("./routes/VideoBank");
app.use("/videobank", videoRouter);

const userLogsRouter = require("./routes/UserLogs");
app.use("/userlogs", ValidateToken, userLogsRouter);

const countryRouter = require("./routes/Country");
app.use("/country", countryRouter);

const taxesRouter = require("./routes/Taxes");
app.use("/taxes", taxesRouter);

const examSectionRouter = require("./routes/examSection");
app.use("/examsection", examSectionRouter);

const examMarksRouter = require("./routes/examMarks");
app.use("/exammarks", examMarksRouter);

const examQuestionRouter = require("./routes/examQuestion");
app.use("/examquestion", examQuestionRouter);

const quizQuestionRouter = require("./routes/quizQuestion");
app.use("/quizquestion", quizQuestionRouter);

const contactUsRouter = require("./routes/contactUs");
app.use("/contactus", contactUsRouter);

const pagesRouter = require("./routes/page");
app.use("/pages", pagesRouter);

const groupUserRouter = require("./routes/groupUser");
app.use("/groupuser", groupUserRouter);

const practiceQuestionRouter = require("./routes/practiceQuestion");
app.use("/practicequestion", practiceQuestionRouter);

const courseRouter = require("./routes/Course");
app.use("/course", courseRouter);

const contentsRouter = require("./routes/Contents");
app.use("/contents", contentsRouter);

const consultationRouter = require("./routes/ConsultationRequests");
app.use("/consultation", consultationRouter);

const parentRouter = require("./routes/parent");
app.use("/parent", parentRouter);

const blogsRouter = require("./routes/Blogs");
app.use("/blogs", blogsRouter);

// var run_cron = cron.schedule("*/1 * * * *", () => {
//   RunScheduler();
// });

app.listen(port, () => {
  console.log(`Listen on port ${port}`);
  // log.Info(`Listen on port ${port}`);
});
