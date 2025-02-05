import { combineReducers } from 'redux';
import themeUsersReducer from './themeUsers/reducers';
import { readMessageReducer } from './message/reducers';
import { readNotificationReducer } from './notification/reducers';
import authReducer from './authentication/reducers';
import ChangeLayoutMode from './themeLayout/reducers';
import { teamReducer } from './team/reducers';
import { userReducer } from './users/reducers';
import { sellersReducer } from './sellers/reducers';
import { headerSearchReducer } from './headerSearch/reducers';
import orderReducer from './orders/reducers';
import categoryReducer from './categories/reducers';
import subcategoryReducer from './subcategories/reducers';
import transactionReducer from './transactions/reducers';
import subscriptionsReducer from './subscriptions/reducers';
import paymentsReducer from './payments/reducers';
// import userslistReducer from './userslist/reducers';
import usersroleReducer from './usersrole/reducers';
import addusersroleReducer from './addusersrole/reducers';
import userspermissionReducer from './userspermission/reducers';
import customerslistReducer from './customerslist/reducers';
import partnerlistReducer from './partnerlist/reducers';
import moduleslistReducer from './moduleslist/reducers';
import variantslistReducer from './variants/reducers';
import ticketsReducer from './tickets/reducers';
import storesReducer from './stores/reducers';
import storeslistReducer from './storeslist/reducers';
import storeuserslistReducer from './storeuserslist/reducers';
import productinventoryReducer from './productinventory/reducers';
import productlistReducer from './productlist/reducers';
import invoicelistReducer from './invoicelist/reducers';
import galleryReducer from './gallary/reducers';
import chartContentReducer from './chartContent/reducers';
import { emailReducer, SingleEmailReducer } from './email/reducers';
import { productReducer, SingleProductReducer } from './product/reducers';
import { chatReducer, SingleChatReducer, groupChatReducer, SingleChatGroupReducer } from './chat/reducers';
import { projectReducer, SingleProjectReducer } from './project/reducers';
import cartData from './cart/reducers';
import Todo from './todo/reducers';
import Note from './note/reducers';
import Task from './task/reducers';
import kanbanBoardReducer from './kanban/reducers';
import Contact from './contact/reducers';
import Profile from './profile/reducers';
import Calender from './calendar/reducers';
import FileManager from './fileManager/reducers';
import { axiosCrudReducer, axiosSingleCrudReducer } from './crud/axios/reducers';

const rootReducers = combineReducers({
  themeUsers: themeUsersReducer,
  headerSearchData: headerSearchReducer,
  message: readMessageReducer,
  notification: readNotificationReducer,
  stores: storesReducer,
  storeslist: storeslistReducer,
  storeuserslist: storeuserslistReducer,
  productinventory: productinventoryReducer,
  productlist: productlistReducer,
  orders: orderReducer,
  category: categoryReducer,
  subcategory: subcategoryReducer,
  subscriptions: subscriptionsReducer,
  payments: paymentsReducer,
  transactions: transactionReducer,
  // userslist: userslistReducer,
  usersrole: usersroleReducer,
  addusersrole: addusersroleReducer,
  userspermission: userspermissionReducer,
  customerslist: customerslistReducer,
  partnerlist: partnerlistReducer,
  moduleslist: moduleslistReducer,
  variantslist: variantslistReducer,
  tickets: ticketsReducer,
  invoicelist: invoicelistReducer,

  sellers: sellersReducer,
  users: userReducer,
  // userGroup: userGroupReducer,
  team: teamReducer,
  auth: authReducer,
  gallery: galleryReducer,
  email: emailReducer,
  emailSingle: SingleEmailReducer,
  products: productReducer,
  product: SingleProductReducer,
  chatSingle: SingleChatReducer,
  chatSingleGroup: SingleChatGroupReducer,
  chat: chatReducer,
  groupChat: groupChatReducer,
  projects: projectReducer,
  project: SingleProjectReducer,
  ChangeLayoutMode,
  chartContent: chartContentReducer,
  cart: cartData,
  Todo,
  Note,
  Task,
  KanbanBoard: kanbanBoardReducer,
  Contact,
  Profile,
  Calender,
  FileManager,
  AxiosCrud: axiosCrudReducer,
  SingleAxiosCrud: axiosSingleCrudReducer,
});

export default rootReducers;
