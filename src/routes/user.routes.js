import express from 'express';
import multer from "../middlewares/multer_config.js";
import passport from "passport";
import {

   httpLoginUser,
   httpRegisterUser,
   httpDeleteOneUser,
   httpGetOneUser,
   httpUpdateOneUser,
   httpGetAllUsers,
   httpResetPassword,
} from '../controllers/user.controller.js';

import {
   httpVerifyEmail,
   httpResetPasswordByEmail,
   httpResendVerificationEmail,
} from '../controllers/mailling.controller.js';



import { body } from 'express-validator';
import {
   ensureAdmin,
   ensureUser,
   ensureLoggedIn,
   ensureAuth,
} from '../middlewares/authorization-handler.js';

import {
   
   httpAddAppartment,
   httpGetOneAppartment,
   httpUpdateOneAppartment,
   httpDeleteOneAppart,

} from '../controllers/apartment.controller.js';

import {
   httpAddService,
   httpGetAllServices,
   httpGetOneService,
   httpUpdateOneService,
   httpDeleteOneService,

} from '../controllers/service.controller.js';

import { 
   httpCreateReservation,
   httpGetMyReservations,
   httpGetAllReservations,
   httpGetOneReservation,
   httpDeclineReservation,
   httpAdminAcceptReservation,
   httpAdminDeclineReservation,
} from '../controllers/reservation.controller.js';
/** Defining the router */
const userRouter = express.Router();

/** Handling requests */

userRouter
   .route('/register')
   .post(
      multer("img", 512 * 1024),
      body('name').isLength({ min: 5 }),
      body('email').isEmail(),
      body('number').isLength({ min: 8 }),
      body('password').isLength({ min: 4 }),
      body('birthday').isDate(),
      httpRegisterUser
   );
userRouter.route('/login').post(httpLoginUser);
userRouter
   .route('/:param')
   .get(httpGetOneUser)
   .put(ensureUser, httpUpdateOneUser)
   .delete(ensureUser, httpDeleteOneUser);

userRouter
   .route('/')
   .get(httpGetAllUsers);

userRouter
   .route('/reset/:param')
   .get(httpResetPasswordByEmail)
   .post(ensureLoggedIn, httpResetPassword);

userRouter
   .route('/verify/:param')
   .get(httpResendVerificationEmail)
   .post(httpVerifyEmail);
//add appartment
   userRouter
   .route('/appartments/addAppartment')
   .post(
      ensureAdmin,
      multer("img", 512 * 1024),
      body('name').isLength({ min: 5 }),
      body('description'),
      body('pricePerNight'),
      body('FromDate').isDate(),
      body('ToDate').isDate(),
      body('location'),
      body('rooms'),
      httpAddAppartment,


   );
   //add service
   userRouter
   .route('/services/addService')
   .post(
      ensureAdmin,
      multer("img", 512 * 1024),
      body('name').isLength({ min: 5 }),
      body('description'),
      body('pricePerNight'),
    
      httpAddService,


   );
   //admin/appartment routes
   userRouter
   .route('/appartments/:param')
   .get(httpGetOneAppartment)
   .put(ensureAdmin, httpUpdateOneAppartment)
   .delete(ensureAdmin, httpDeleteOneAppart);
// get/update/delete service
   userRouter
   .route('/services/:param')
   .get(httpGetOneService)
   .put(ensureAdmin, httpUpdateOneService)
   .delete(ensureAdmin, httpDeleteOneService);
   //get all services
   userRouter
   .route('/service/getAllServices')
   .get(httpGetAllServices);
//reservations
   userRouter
   .route('/reservations/getall')
   .get(ensureUser,httpGetMyReservations);
//admin get all reservations
   userRouter
   .route('/reservations/getallReservations')
   .get(ensureAuth,httpGetAllReservations);

   userRouter
   .route('/reservations/addReservation')
   .post(
      
      body('description').isLength({ min: 5 }),
      body('totalPrice'),
      body('checkIn').isDate(),
      body('checkOut').isDate(),
      body('servicesFee'),
      body('nightsFee'),
      //ensureLoggedIn,
      ensureUser,
      httpCreateReservation
   );

   userRouter
   .route('/reservations/decline/:param')
   .delete(ensureUser,httpDeclineReservation);
   userRouter
   .route('/reservations/getOne/:param')
   .get(ensureUser,httpGetOneReservation);
   userRouter
   .route('/reservations/accept/:param')
   .post(ensureAdmin,httpAdminAcceptReservation);

   userRouter
   .route('/reservations/adminDecline/:param')
   .delete(ensureAdmin,httpAdminDeclineReservation);


   userRouter
   .get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

  userRouter
  .get('/api/sessions/oauth/google', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect(200,'/user/reservations/getallReservations');
    
  });

export { userRouter };


