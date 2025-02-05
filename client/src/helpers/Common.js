import Axios from 'axios';
import Cookies from 'js-cookie';
import { headers } from './variables';
const { decrypt } = require('./encryption-decryption');
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

const api_url = [];

// api_url['get_pinall'] = '/pin/pinterestpins/';
api_url['get_gpt_all'] = '/gpt/all';
api_url['user_pinall'] = '/pin/userpins/all';
api_url['create_user'] = '/user/';
api_url['create_urlattachment'] = '/attachment/uploadimgurl/url';
api_url['create_configuration'] = '/configuration/';
api_url['create_gpt'] = '/gpt/';
api_url['get_all_defaultimage'] = '/default/all/';
api_url['get_all_users_pins'] = '/pin/userpins/all/';
api_url['get_all_users'] = '/user';
api_url['get_all_configurations'] = '/configuration/';
api_url['get_all_configurations_byid'] = '/configuration/';
api_url['update_pinterestby_UserId'] = '/pinterest/auth/';
api_url['get_pinterestby_UserId'] = '/pinterest/auth/';
api_url['get_schedule_byId'] = '/schedulelearn/';
api_url['delete_questionby_id'] = '/questionBank/';
api_url['getquestion_type_byparent'] = '/questionBank/questiontypes/';
api_url['comprehension_all'] = '/comprehension/get/all';
api_url['create_comprehension'] = '/comprehension/';
api_url['create_questions'] = '/questionBank';
api_url['search_question'] = '/questionBank/search';
api_url['get_auth_url'] = '/pinterest/auth_url/';
api_url['trash_user'] = '/user/trash/';
api_url['delete_pinBy_id'] = '/pin/userpin/';
api_url['delete_scheduleby_id'] = '/schedulelearn/';
//api_url['get_board_all'] = '/board/userboards/all';
api_url['get_schedule_all'] = '/schedulelearn/get/all';
api_url['get_schedulelearn_all'] = '/schedulelearn/get/all';
api_url['get_pinterest_auth_all'] = '/pinterest/auth/all';
api_url['get_defaultimage_byuserid'] = '/default/';
api_url['create_pin'] = '/pin/';
api_url['create_description'] = '/pin/generatediscription/';
api_url['create_board'] = '/board';
// api_url['create_schedule'] = '/schedulelearn/';
api_url['create_defaultImage'] = '/default/';
api_url['create_Attachment'] = '/attachment/posts';
api_url['update_access_token'] = '/pinterest/access_token/';
api_url['update_pin'] = '/pin/';
api_url['update_userpinByid'] = '/pin/userpins/';
api_url['update_gpt'] = '/gpt/';
api_url['getall_modules'] = '/module/all';
api_url['update_schedulebyId'] = '/schedulelearn/';
api_url['update_configurationBYId'] = '/configuration/';
api_url['get_configurationBYId'] = '/configuration/';
api_url['updatebyuserId_defaultImage'] = '/default/';
api_url['delete_userpins'] = '/pin/userpins/';
api_url['getallquestions'] = '/questionBank/get/all/';
api_url['get_questions_by_id'] = '/questionBank/';
api_url['create_entity'] = '/entity/';
api_url['get_entity_byparentid'] = '/entity/parent/';
api_url['get_entity_byid'] = '/entity/';
api_url['getall_entity'] = '/entity/all';
api_url['update_entity_byId'] = '/entity/';
api_url['delete_entity_byId'] = '/entity/';

api_url['create_quiz'] = '/quiz/';
api_url['getquiz_by_id'] = '/quiz/';
api_url['get_all_quiz'] = '/quiz/get/all';
api_url['delete_quiz_byId'] = '/quiz/';

api_url['get_all_exam'] = '/exams/get/all';
api_url['delete_exam_id'] = '/exams/';
api_url['create_exam'] = '/exams/';
api_url['get_exam_byId'] = '/exams/';
api_url['update_exam_byId'] = '/exams/';

api_url['create_section'] = '/section/';
api_url['get_section'] = '/section/get/all';
api_url['update_section_id'] = '/section/';
api_url['get_section_id'] = '/section/';
api_url['delete_section_id'] = '/section/';

api_url['create_group'] = '/group/';
api_url['get_group'] = '/group/get/all';
api_url['update_group_id'] = '/group/';
api_url['delete_group_id'] = '/group/';

api_url['create_skills'] = '/skills/';
api_url['get_skills'] = '/skills/get/all';
api_url['update_skills_id'] = '/skills/';
api_url['get_skills_id'] = '/skills/';
api_url['delete_skills_id'] = '/skills/';

api_url['create_topics'] = '/topics/';
api_url['get_topics'] = '/topics/get/all';
api_url['update_topics_id'] = '/topics/';
api_url['get_topics_id'] = '/topics/';
api_url['delete_topics_id'] = '/topics/';

api_url['create_tags'] = '/tags/';
api_url['get_tags'] = '/tags/get/all';
api_url['update_tags_id'] = '/tags/';
api_url['get_tags_id'] = '/tags/';
api_url['delete_tags_id'] = '/tags/';

api_url['create_category'] = '/category/';
api_url['get_category'] = '/category/get/all';
api_url['get_category_id'] = '/category/';
api_url['update_category_id'] = '/category/';
api_url['delete_category_id'] = '/category/';

api_url['create_plans'] = '/subscription/plan';
api_url['get_plans'] = '/subscription/plan/get/all';
api_url['get_plans_id'] = '/subscription/plan/';
api_url['update_plans_id'] = '/subscription/plan/';
api_url['delete_plans_id'] = '/subscription/plan/';

api_url['create_subcategory'] = '/subcategory';
api_url['get_subcategory'] = '/subcategory/get/all';
api_url['get_subcategory_id'] = '/subcategory/';
api_url['update_subcategory_id'] = '/subcategory/';
api_url['delete_subcategory_id'] = '/subcategory/';
api_url['get_plans_by_category_id'] = '/subscription/category/';
api_url['create_subscription'] = '/subscription';
api_url['get_subscription'] = '/subscription/get/all';
api_url['get_subscription_plans_id'] = '/subscription/';
api_url['update_plans_id'] = '/subscription/plan/';
api_url['delete_subscription_id'] = '/subscription/';

api_url['create_lesson'] = '/lesson';
api_url['get_lesson'] = '/lesson/get/all';
api_url['update_lesson_id'] = '/lesson/';
api_url['get_lesson_id'] = '/lesson/';
api_url['delete_lesson_id'] = '/lesson/';

api_url['get_roles'] = '/role/all/all';
api_url['admin_user_role'] = '/role/admin/';

api_url['create_schedule'] = '/schedulelearn';
api_url['get_schedules_learn'] = '/schedulelearn/get/all';
api_url['update_schedules_id'] = '/schedulelearn/';
api_url['get_schedules_id'] = '/schedulelearn/';
api_url['delete_schedules_id'] = '/schedulelearn/';
api_url['get_schedules_by_event_id'] = '/schedulelearn/event/';
api_url['get_schedules_by_event_type'] = '/schedulelearn/eventtype/';

api_url['create_practice'] = '/practicesets/';
api_url['get_practice'] = '/practicesets/get/all';
api_url['update_practice_id'] = '/practicesets/';
api_url['get_practice_id'] = '/practicesets/';
api_url['delete_practice_id'] = '/practicesets/';

api_url['create_video_bank'] = '/videobank';
api_url['get_video_bank'] = '/videobank/get/all';
api_url['update_video_bank_id'] = '/videobank/';
api_url['get_video_bank_id'] = '/videobank/';
api_url['delete_video_bank_id'] = '/videobank/';

api_url['update_quiz_byId'] = '/quiz/';
api_url['delete_user_id'] = '/user/';
api_url['update_user_id'] = '/user/';
api_url['get_config'] = '/configuration/';

api_url['get_user_by_role'] = '/user/role/';
api_url['get_allStudents'] = '/user/students/all';
api_url['createparent'] = '/parent';
api_url['get_allparents'] = '/parent/get/all';
api_url['getChild_byParent'] = '/parent/child/';
api_url['get_allInstructor'] = '/user/instructor/all';

api_url['create_exam_section'] = '/examsection/';
api_url['get_section_by_exam_id'] = '/examsection/';
api_url['get_exam_by_section_id'] = '/examsection/single/';
api_url['update_by_id'] = '/examsection/';
api_url['delete_by_id'] = '/examsection/';

api_url['getQuestion_by_quizID'] = '/quizquestion/';
api_url['add_question'] = '/quizquestion/';
api_url['remove_question_by_questionID'] = '/quizquestion/';
api_url['getquizquestion_by_quizID'] = '/quiz/ques/';
api_url['get_country'] = '/country/';
//

api_url['addexam_question'] = '/examquestion/';
api_url['getexam_question'] = '/examquestion/';
api_url['getquestion_bysectionID'] = '/questionBank/section/';

api_url['global_auth_url'] = '/global/auth/url';

/*UserList */
api_url['facebook'] = '/facebook/';
api_url['facebook_by_user'] = '/facebook/user/';
api_url['facebook_accesstoken'] = '/facebook/accesstoken';

api_url['linkedin'] = '/linkedin/';
api_url['linkedin_by_user'] = '/linkedin/user/';
api_url['linkedin_accesstoken'] = '/linkedin/accesstoken';

api_url['instagram'] = '/instagram/';
api_url['instagram_by_user'] = '/instagram/user/';
api_url['instagram_accesstoken'] = '/instagram/accesstoken';

api_url['twitter'] = '/twitter/';
api_url['twitter_by_user'] = '/twitter/user/';
api_url['twitter_accesstoken'] = '/twitter/accesstoken';

/*Post */
//api_url['create_post'] = '/post/';
api_url['create_post'] = '/post/';
api_url['get_all_posts'] = '/post/';
api_url['get_posts_byid'] = '/post/user/';
api_url['trash_posts_byid'] = '/post/trash/';

/*Customer */
api_url['create_user'] = '/user/';
api_url['get_all_users'] = '/user/';
api_url['trash_user'] = '/user/trash/';

/* UpdatePassword */
api_url['UpdatePassword'] = '/user/password/update/';

/*   Pages   */
api_url['getallpages'] = '/pages/all/';
api_url['createpage'] = '/pages/';
api_url['getby_slug'] = '/pages/';
api_url['updatepage_byid'] = '/pages/';
api_url['deletepage_byID'] = '/pages/';

/* Images */

api_url['url'] = '/images/post';
api_url['verifyotp'] = '/user/verifyotp/';
api_url['forgot_password'] = '/user/password/forgot';
/*+++++++++++++++MPI+++++++++++++++++++++++++ENDS */

/*UserList */
api_url['user'] = '/user/admin/';
api_url['delete_user'] = '/user/';

const get_rolesby_store = id => {
  api_url['get_rolesby_store'] = `/store/${id}/role/`;
  return api_url['get_rolesby_store'];
};

/*Edit Category */
api_url['get_productcategory_single'] = '/productcategory/single/';

/*Store Modules */
api_url['get_modulesingle_byID'] = '/module/single/';
api_url['get_allmodules'] = '/module/all';
api_url['module_checkmodulealready'] = '/module/checkmodulealready';
api_url['update_module'] = '/module/';
api_url['getPermissions_byRoleID'] = '/permission/role/';

/*Store Discount */
api_url['get_storesall'] = '/store/all';
api_url['discount_checkalready'] = '/discount/checkalready';
api_url['create_discount'] = '/discount/';

/*Store Discount */
api_url['customer_delete'] = '/customer/delete/';
api_url['create_consultation'] = '/consultation/';
api_url['customer_delete'] = '/customer/delete/';

/*Student Dashboard */
api_url['get_allschedules_byuserID'] = '/schedulelearn/user/';
api_url['get_allquestion_byexamID'] = '/exams/ques/';

api_url['practicequestion'] = '/practicequestion/get/all';
api_url['get_practicequestion_byID'] = '/practicesets/ques/';
api_url['create_practice_question'] = '/practicequestion';
api_url['get_practice_addedquestion'] = '/practicequestion/';
api_url['delete_practice_addedquestion'] = '/practicequestion/';
//
api_url['exam_taken'] = '/exams/taken';
api_url['getExam_score_byID'] = '/exams/score/';
api_url['getExam_byInstructorID'] = '/exams/instructor/list/';
api_url['quiz_taken'] = '/quiz/taken';
api_url['getQuiz_byInstructorID'] = '/quiz/instructor/list/';
api_url['getQuiz_score_byID'] = '/quiz/score/';
api_url['practice_set_taken'] = '/practicesets/taken';
api_url['getStudents_byTeacherID'] = '/user/student/';
api_url['getPracticeSet_score_byID'] = '/practicesets/score/';

api_url['get_all_consultations'] = '/consultation/get/all';
api_url['get_exam_history'] = '/exams/details/';

api_url['create_blogs'] = '/blogs/';
api_url['get_all_Blogs'] = '/blogs/get/all';
api_url['delete_blog_by_id'] = '/blogs/';
api_url['get_blog_by_id'] = '/blogs/';
api_url['update_blog_by_id'] = '/blogs/';
api_url['get_pastpaper_byid'] = '/exams/pastpapers/';
api_url['get_allcourse_byuserid'] = '/course/get/all';

/*Request Function Starts +++++*/
const get_api_request = (url, headers = null) => {
  const promise1 = new Promise((resolve, reject) => {
    Axios.get(domainpath + url, { headers })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        const Error = {
          status: 'error',
          message: error,
        };
        reject(Error);
      });
  });
  const response_promise = promise1
    .then(value => {
      return value;
    })
    .catch(error => {
      console.log(error);
      const Error = {
        status: 'error',
        message: error,
      };
      console.log(Error);
      return Error;
    });
  return response_promise;
};
//--------------------------------------------------------
const post_api_request = (url, payload, headers = null) => {
  // Axios.post(domainpath + url, payload, { headers }).then(response => {
  //   return response;
  // });
  const promise1 = new Promise((resolve, reject) => {
    Axios.post(domainpath + url, payload, { headers })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        const Error = {
          status: 'error',
          message: error,
        };
        reject(Error);
      });
  });
  const response_promise = promise1
    .then(value => {
      return value;
    })
    .catch(error => {
      const Error = {
        status: 'error',
        message: error,
      };
      return Error;
    });
  return response_promise;
};
//---------------------------------------------------------
const put_api_request = (url, payload, headers = null) => {
  // Axios.put(domainpath + url, payload, { headers }).then(response => {
  //   return response;
  // });
  const promise1 = new Promise((resolve, reject) => {
    Axios.put(domainpath + url, payload, { headers })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        const Error = {
          status: 'error',
          message: error,
        };
        reject(Error);
      });
  });
  const response_promise = promise1
    .then(value => {
      return value;
    })
    .catch(error => {
      var message = '';
      if (error?.message?.response?.data?.message) {
        message = error.message.response.data.message;
      } else {
        message = error;
      }
      const Error = {
        status: 'error',
        message: message,
      };
      return Error;
    });
  return response_promise;
};
//----------------------------------------------------------
const delete_api_request = (url, headers = null) => {
  const promise1 = new Promise((resolve, reject) => {
    Axios.delete(domainpath + url, { headers })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        const Error = {
          status: 'error',
          message: error,
        };
        reject(Error);
      });
  });
  const response_promise = promise1
    .then(value => {
      return value;
    })
    .catch(error => {
      const Error = {
        status: 'error',
        message: error,
      };
      return Error;
    });
  return response_promise;
};

/*++++++++Get Module Permissions From Cookies +++++++++++++++++STARTS*/
const ModulePermissions = ModuleName => {
  var Array_of_Modules = [];
  var UserRole = [];
  var currentUserModules = [];
  var ModulePermissions = {};
  var getModule = [];

  async function GetUserDetail(ModuleName) {
    const enc_user_detail = Cookies.get('UserDetail');
    var userDetail = decrypt(enc_user_detail);
    var data = userDetail?.sessdata?.user?.[0];
    var currectStoreID = userDetail?.sessdata?.store_id;
    var currectUserRoleID = userDetail?.sessdata?.user_role_id;
    var userStore = userDetail?.store;
    var login_stort_TypeID = userDetail?.store?.[0].store_type_id;
    //get User Role dynamicaly ----
    UserRole = data?.user_role.toUpperCase();
    // userStore?.map(item => {
    //   if (currectUserRoleID == item.user_role_id) {
    //     UserRole = item?.user_role.toUpperCase();
    //   }
    // });
    currentUserModules = data?.permissions?.[UserRole]?.MODULES;
    //get Modules dynamicaly ----
    // userStore?.map(item => {
    //   if (item.store_id == currectStoreID) {
    //     currentUserModules = item.permissions?.[UserRole].MODULES;
    //   }
    //   //  else {
    //   //   currentUserModules = item.permissions?.[UserRole].MODULES
    //   // }
    // });
    var Modules_key = Object.keys(currentUserModules); // to check is modules available or not?
    Modules_key?.map((item, value) => {
      if (item == ModuleName) {
        return (getModule = item);
      }
    });
    //------------ Make array for all modules------------start

    var modules_array = Object.entries(currentUserModules).map(([key, value]) => ({ key, value }));
    Array_of_Modules = modules_array;
    modules_array?.map(item => {
      if (item.key == ModuleName) {
        ModulePermissions = { item: item, role: UserRole };
        // const perminssion_values = item.value.split(','); // get module value
        // ModulePermissions['view'] = perminssion_values[0];
        // ModulePermissions['add'] = perminssion_values[1];
        // ModulePermissions['edit'] = perminssion_values[2];
        // ModulePermissions['delete'] = perminssion_values[3];
      }
    });

    //---------------make array for all modules---------------end
  }
  GetUserDetail(ModuleName);
  return ModulePermissions;
};
/*++++++++Get Module Permissions From Cookies +++++++++++++++++ENDS*/

export { get_api_request, post_api_request, put_api_request, delete_api_request, api_url, ModulePermissions };
