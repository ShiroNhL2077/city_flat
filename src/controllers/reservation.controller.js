import mongoose from 'mongoose';
import reservationDb from '../models/reservation.model.js';
import appartmentDb from '../models/appartment.model.js';
import userDb from '../models/user.model.js';
import { validationResult } from 'express-validator';
import { findOneUserByFilter, userFormat } from '../controllers/user.controller.js';
import { sendReservationEmail, sendDeclineReservationEmail } from '../controllers/mailling.controller.js';
import cardDb from '../models/card.model.js';
import { createCustomer, addCard, generatePaymentIntent } from '../services/stripe.service.js';

export function httpGetMyReservations(req, res) {
   console.log(req.user);
   findOneUserByFilter(req.user.id)
      .then((foundUser) => {
         if (!foundUser) {

            return res.status(404).json({ error: 'User not found!' });
         } else {
            reservationDb
               .find({
                  User: foundUser,
               })
               .then((reservations) => {
                  res.status(200).json(reservationListFormat(reservations));
               })
               .catch((err) => res.status(500).json({ error: err.message }));

         }
      })
      .catch((err) => res.status(500).json({ error: err.message }));
}


export function httpGetOneReservation(req, res) {

   findOneReservationByFilter(req.params.param)
      .then((foundReservation) => {
         if (!foundReservation) {

            return res.status(404).json({ error: 'Reservation not found!' });
         } else {

            res.status(200).json(reservationFormat(foundReservation));


         }
      })
      .catch((err) => res.status(500).json({ error: err.message }));
}

export function httpCreateReservation(req, res) {
   if (!validationResult(req).isEmpty()) {
      res.status(400).json({ error: validationResult(req).array() });
   } else {
      const user = req.user;
      const newReservation = req.body;
      console.log(req.body.services);
      userDb
         .findOne({ email: user.email })
         .then((founduser) => {
            if (!founduser) {
               return res.status(404).json({
                  message: 'User not found!',
               });
            } else {

               const appartment = req.body.appartment;
               console.log(founduser);
               newReservation.User = founduser;

               appartmentDb
                  .findOne({ name: appartment.name })
                  .then((appartment) => {
                     if (!appartment) {
                        return res.status(404).json({
                           message: 'Appartment not found!',
                        });
                     } else {



                        newReservation.appartment = appartment;

                        newReservation.code = generateRandomCode(6);

                        reservationDb
                           .create(newReservation)
                           .then((result) => {
                              findOneReservationByFilter(result._id)
                                 .then((register) => {

                                    res.status(201).json(reservationFormat(register));




                                 }





                                 )
                                 .catch((err) =>
                                    res.status(500).json({ error: err.message })
                                 );


                           })
                           .catch((err) => res.status(500).json({ error: err.message }));




                     }
                  })
                  .catch((err) => res.status(500).json({ error: err.message }));



            }
         })
         .catch((err) => res.status(500).json({ error: err.message }));



   }
}


async function AddServicesToReservation(req, res, reservation, services) {

   if (!validationResult(req).isEmpty()) {
      res.status(400).json({ error: validationResult(req).array() });
   } else {


      reservationDb
         .findByIdAndUpdate(
            reservation._id,
            {
               $pushAll: {
                  services: services,
               },

            },
            { new: true }
         ).then((register) => {
            res.status(201).json(reservationFormat(register));
         })
         .catch((err) => res.status(500).json({ error: err.message }));
   }




}

// export function httpDeclineReservation(req, res) {
//    const user = req.user;

//    userDb
//       .findOne({ email: user.email })
//       .then((founduser) => {
//          if (!founduser) {
//             return res.status(404).json({
//                message: 'User not found!',
//             });
//          } else {

//             findOneReservationByFilter(user)
//             .then((foundReservation) => {
//                if (!foundReservation) {
//                   res.status(404).json({ error: 'Reservation not found!' });
//                } else {
//                   reservationDb
//                      .findByIdAndDelete(foundReservation._id)
//                      .then((result) => {
//                         res.status(200).json({
//                            message: `${foundReservation.name} deleted successfully`,
//                         });
//                      })
//                      .catch((err) => res.status(500).json({ error: err.message }));
//                }
//             })
//             .catch((err) => res.status(500).json({ error: err.message }));


//          }
//       })
//       .catch((err) => res.status(500).json({ error: err.message }));


// }

export function httpDeclineReservation(req, res) {
   const user = req.user;

   findOneReservationByFilter(req.params.param)
      .then((foundReservation) => {
         if (!foundReservation) {
            res.status(404).json({ error: 'Reservation not found!' });
         } else {

            console.log("found user : " + foundReservation.User._id);
            console.log("param user : " + user.id);
            if (user.id == foundReservation.User._id) {
               reservationDb
                  .findByIdAndDelete(foundReservation._id)
                  .then((result) => {
                     res.status(200).json({
                        message: `${foundReservation.code} delclined successfully`,
                     });
                  })
                  .catch((err) => res.status(500).json({ error: err.message }));
            } else {
               res.status(500).json({ error: 'User does not correspond to the reservation' });

            }

         }
      })
      .catch((err) => res.status(500).json({ error: err }));
}

export function httpAdminDeclineReservation(req, res) {


   findOneReservationByFilter(req.params.param)
      .then((foundReservation) => {
         if (!foundReservation) {
            return res.status(404).json({ message: 'Reservation not found!' });
         } else {

            if (foundReservation.accepted == true) {
               return res.status(400).json({
                  message: ' reservation already accepted',
               });
            } else {
               userDb
                  .findById(foundReservation.User._id)
                  .then((founUser) => {


                     appartmentDb
                        .findById(foundReservation.appartment._id)
                        .then((foundAppart) => {

                           sendDeclineReservationEmail(founUser, foundReservation, foundAppart);
                           reservationDb
                              .findByIdAndUpdate(foundReservation._id, {
                                 $set: {
                                    accepted: false,
                                    state: "DECLINED",
                                 },
                              })
                              .then((reservation) => {


                                 res.status(200).json({
                                    message: `${foundReservation.code} delclined successfully`,
                                 });
                              })
                              .catch((err) => res.status(500).json({ error: err.message }));


                        }).catch((err) => res.status(500).json({ error: err.message }));



                  });



            }

         }
      })
      .catch((err) => res.status(500).json({ error: err.message }));

}

export function httpAdminAcceptReservation(req, res) {

   findOneReservationByFilter(req.params.param)
      .then((foundReservation) => {
         if (!foundReservation) {
            return res.status(404).json({ message: 'Reservation not found!' });
         } else {

            if (foundReservation.accepted == true) {
               return res.status(400).json({
                  message: ' reservation already accepted',
               });
            } else {

               reservationDb
                  .findByIdAndUpdate(foundReservation._id, {
                     $set: {
                        accepted: true,
                        state: "ACCEPTED",
                     },
                  })
                  .then((result) => {
                     userDb
                        .findById(foundReservation.User._id)
                        .then((founUser) => {
                           sendReservationEmail(founUser, foundReservation);

                           res.status(200).json({
                              message: `${foundReservation.code} accepted successfully`,
                           });
                        }

                        )
                        .catch((err) =>
                           res.status(500).json({
                              error: err.message,
                           })
                        );


                  }

                  )
                  .catch((err) =>
                     res.status(500).json({ error: err.message })
                  );

            }

         }
      })
      .catch((err) => res.status(500).json({ error: err.message }));


}

//get all reservations
export function httpGetAllReservations(req, res) {
   reservationDb
      .find()
      .then((reservations) => {
         res.status(200).json(reservationListFormat(reservations));
      })
      .catch((err) => res.status(500).json({ error: err.message }));
}

export async function findOneReservationByFilter(reservationFilter) {
   var reservationtId = null;
   if (mongoose.Types.ObjectId.isValid(reservationFilter)) {
      reservationtId = reservationFilter;
   }
   return await reservationDb.findOne({
      $or: [
         { _id: reservationtId },
         { code: reservationFilter },
         { User: reservationFilter },

      ],
   });
}

function reservationFormat(reservation) {
   return {
      id: reservation._id,
      description: reservation.description,
      totalPrice: reservation.totalPrice,
      checkIn: reservation.checkIn,
      checkOut: reservation.checkOut,
      code: reservation.code,
      servicesFee: reservation.servicesFee,
      nightsFee: reservation.nightsFee,
      accepted: reservation.accepted,
      state: reservation.state,
      services: reservation.services,
      User: reservation.User,
      appartment: reservation.appartment,
      transactionId: reservation.transactionId
   };
}
export function reservationListFormat(reservations) {
   let foundReservations = [];
   reservations.forEach((reservation) => {
      foundReservations.push(reservationFormat(reservation));
   });
   return foundReservations;
}

function generateRandomCode(length) {
   var result = '';
   var characters = '0123456789';
   var charactersLength = characters.length;
   for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
         charactersLength));
   }
   return result;
}


export async function createReservation(req,res) {

   findOneUserByFilter(req.user.id)
      .then((foundUser) => {
         if (!foundUser) {

            return res.status(404).json({ error: 'User not found!' });
         } else {
           let model = {


           };
            if (!foundUser.stripeCustomerID) {
               createCustomer(

                  {
                     "name": foundUser.name,
                     "email": foundUser.email


                  }

               ).then((result) => {
                foundUser.stripeCustomerID = result.id;
                userDb
                .findByIdAndUpdate(foundUser._id, foundUser)
                model.stripeCustomerID= result.id;

               }).catch((err) =>
                  res.status(500).json({ error: err.message })
               );
             

            }else{
               model.stripeCustomerID=foundUser.stripeCustomerID;


            }
            //card  
            cardDb.findOne({
               customerId:model.stripeCustomerID,
               cardNumber:req.params.card_Number,
               cardExpMonth:req.params.card_ExpMonth,
               cardExpYear:req.params.cardExp_Year,


               },async function(err,cardDb){
                   if(err){

                     res.status(500).json({ error: err.message });
                   }else{
//no information found
                  if(!cardDb){

                 await  addCard({
                  "card_Name":req.params.card_Name,
                  "card_Number": req.params.card_Number,
                  "card_ExpMonth":req.params.card_ExpMonth , 
                  "card_ExpYear":req.params.card_ExpYear , 
                 "card_CVC":req.params.card_CVC
                  },(err,results)=>{

                     if(err){
                        res.status(500).json({ error: err.message });

                     }

                     if(results){

                 const  cardModel = new  cardDb({

                   cardId:results.card,
                   cardName : req.params.card_Name,
                   cardNumber: req.params.card_Number,
                   cardExpMonth:req.params.card_ExpMonth,
                   cardExpYear:req.params.card_ExpYear,
                   cardCVC:req.params.card_CVC,
                   customerId:


                 })

                     }
                  }
                 )

                  }

                   }

               }
            )


         }
      })
      .catch((err) => res.status(500).json({ error: err.message }));



}