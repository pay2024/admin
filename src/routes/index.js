import React from "react"
import { Redirect } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

// Dashboard
import Dashboard from "../pages/Dashboard/index"

//testr
import Test from "pages/Test"

//pages
import Aboutus from "../pages/About/Aboutus"
import Tearms from "pages/About/Tearms"

//users
import Users from "pages/App users/Users"

//banners
import MainBanners from "pages/Banners/MainBanners"
import Secondarybanner from "pages/Banners/Secondarybanner"

//Category
import BulkUpload from "pages/Catagory/BulkUpload"
import Categories from "pages/Catagory/Categories"
import Dealproduct from "pages/Catagory/Dealproduct"
import HomeCategory from "pages/Catagory/HomeCategory"
import Products from "pages/Catagory/Products"

//coupons
import Coupons from "pages/Coupons/Coupons"

//devery
import Deliveryboy from "pages/Delivery boys/Deliveryboy"

//locations
import Areas from "pages/Locations/Areas"
import Cities from "pages/Locations/Cities"
import Districts from "pages/Locations/Districts"
import Pincode from "pages/Locations/Pincode"
import States from "pages/Locations/States"

//Notifications
import Notifications from "pages/Notifications/Notifications"

//orders
import Cancelledorders from "pages/Orders/Cancelledorders"
import Compleatedorders from "pages/Orders/Compleatedorders"
import Pendingorders from "pages/Orders/Pendingorders"
import Rejuctedbystore from "pages/Orders/Rejuctedbystore"

//wallet
import Payoutrequests from "pages/Payout Requests/Payoutrequests"
import Payoutvalue from "pages/Payout Requests/Payoutvalue"

//Rewards
import Redeemvalue from "pages/Rewards/Redeemvalue"
import RewardValue from "pages/Rewards/RewardValue"

//Service
import Addsystemmodule from "pages/services/Addsystemmodule"
import Modules from "pages/services/Modules"

//settings
import AppNoties from "pages/Settings/AppNoties"
import Appsettings from "pages/Settings/Appsettings"
import Gobalsettings from "pages/Settings/Gobalsettings"
import Mapapi from "pages/Settings/Mapapi"
import Smsotp from "pages/Settings/Smsotp"

//store Managers
import Store from "pages/Store Managers/Store"
import StoreEarnings from "pages/Store Managers/StoreEarnings"
import Watingforapproval from "pages/Store Managers/Watingforapproval"

import SubCategory from "pages/Catagory/SubCategory"
import SubSubCategory from "pages/Catagory/SubSubCategory"
import Specifications from "pages/Catagory/Specifications"
import SpecificationsValues from "pages/Catagory/SpecificationsValues"

import Language from "pages/Settings/Language"

import ViewProducts from "pages/Catagory/ViewProducts"

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },

  { path: "/SubCategory", component: SubCategory },
  { path: "/SubSubCategory", component: SubSubCategory },
  { path: "/Specifications", component: Specifications },
  { path: "/SpecificationsValues", component: SpecificationsValues },

  { path: "/ViewProducts", component: ViewProducts },

  { path: "/Language", component: Language },
  // //profile
  { path: "/profile", component: UserProfile },
  { path: "/Test", component: Test },

  { path: "/Aboutus", component: Aboutus },
  { path: "/Tearms", component: Tearms },

  { path: "/Users", component: Users },

  { path: "/MainBanners", component: MainBanners },
  { path: "/Secondarybanner", component: Secondarybanner },

  { path: "/BulkUpload", component: BulkUpload },
  { path: "/Categories", component: Categories },
  { path: "/Dealproduct", component: Dealproduct },
  { path: "/HomeCategory", component: HomeCategory },
  { path: "/Products", component: Products },

  { path: "/Coupons", component: Coupons },

  { path: "/Deliveryboy", component: Deliveryboy },
  { path: "/Areas", component: Areas },

  { path: "/Cities", component: Cities },
  { path: "/Districts", component: Districts },
  { path: "/Pincode", component: Pincode },
  { path: "/States", component: States },
  { path: "/Notifications", component: Notifications },

  { path: "/Cancelledorders", component: Cancelledorders },

  { path: "/Compleatedorders", component: Compleatedorders },
  { path: "/Pendingorders", component: Pendingorders },
  { path: "/Rejuctedbystore", component: Rejuctedbystore },
  { path: "/Payoutrequests", component: Payoutrequests },
  { path: "/Payoutvalue", component: Payoutvalue },
  { path: "/Redeemvalue", component: Redeemvalue },
  { path: "/RewardValue", component: RewardValue },

  { path: "/Addsystemmodule", component: Addsystemmodule },

  { path: "/Modules", component: Modules },
  { path: "/AppNoties", component: AppNoties },

  { path: "/Appsettings", component: Appsettings },
  { path: "/Gobalsettings", component: Gobalsettings },
  { path: "/Mapapi", component: Mapapi },
  { path: "/Smsotp", component: Smsotp },

  { path: "/Store", component: Store },

  { path: "/StoreEarnings", component: StoreEarnings },

  { path: "/Watingforapproval", component: Watingforapproval },

  { path: "/", exact: true, component: () => <Redirect to="/login" /> },
]

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
]

export { publicRoutes, authProtectedRoutes }
