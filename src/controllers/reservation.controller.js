import mongoose from 'mongoose';
import Stripe from 'stripe';
import reservationDb from '../models/reservation.model.js';
import appartmentDb from '../models/appartment.model.js';
import userDb from '../models/user.model.js';
import { validationResult } from 'express-validator';
import { findOneUserByFilter, userFormat } from '../controllers/user.controller.js';
import { sendReservationEmail, sendDeclineReservationEmail ,sendUserReservationEmail} from '../controllers/mailling.controller.js';

import { createCustomer, addCard, httpMakePayment, createCheckoutSession } from '../controllers/stripePayment.controller.js';
import dotenv from 'dotenv';

/* Accessing .env content */
dotenv.config();

const stripe = new Stripe(process.env.SECRET_KEY, {
   apiVersion: '2020-08-27',
});
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
      return res.status(400).json({ error: validationResult(req).array() });
   }

   const user = req.user;
   const newReservation = req.body.reservation;


   userDb.findOne({ email: user.email })
      .then((foundUser) => {
         if (!foundUser) {
            return res.status(404).json({ message: 'User not found!' });
         }

         const appartment = req.body.reservation.appartment;
         newReservation.User = foundUser;

         appartmentDb.findOne({ name: appartment.name })
            .then((foundAppartment) => {
               if (!foundAppartment) {
                  return res.status(404).json({ message: 'Appartment not found!' });
               }

               newReservation.appartment = foundAppartment;
               newReservation.code = generateRandomCode(6);

               // Call payment function to make payment
               const paymentAmount = calculateReservationTotalFee(newReservation);
               newReservation.totalPrice=paymentAmount;
               createCustomer(foundUser)
                  .then((customerId) => {
                     const cardDetails = req.body.paymentMethod.card;


                     if (!cardDetails.number || !cardDetails.exp_month || !cardDetails.exp_year || !cardDetails.cvc) {
                        return res.status(400).json({ error: 'Card details are incomplete' });
                     }

                     stripe.tokens.create(
                        {

                           card: {

                              number: cardDetails.number,
                              exp_month: cardDetails.exp_month,
                              exp_year: cardDetails.exp_year,
                              cvc: cardDetails.cvc,
                           },
                        },
                        function (err, token) {

                           if (err) {
                              return res.status(500).json({ error: err.message });
                           }
                           console.log(token);
                           addCard(customerId, token.id)
                              .then((card) => {
                                 console.log(card);
                                 // Check if the card is not null before creating the payment intent
                                 if (card) {

                                    stripe.paymentMethods.create({
                                       type: 'card',
                                       card: {
                                          number: cardDetails.number,
                                          exp_month: cardDetails.exp_month,
                                          exp_year: cardDetails.exp_year,
                                          cvc: cardDetails.cvc,
                                       },

                                    },


                                    ).then((paymentMethod) => {

                                       stripe.paymentMethods.attach(paymentMethod.id, {
                                          customer: customerId,
                                       }).then((payment_method) => {

                                          httpMakePayment(req, res, newReservation.totalPrice, customerId, newReservation._id, paymentMethod.id)
                                             .then((paymentIntent) => {

                                                // Update reservation with payment status
                                                //newReservation.paymentStatus = 'paid';
                                                //newReservation.paymentIntentId = paymentIntent.id;
                                                //  createCheckoutSession(customer.id, newReservation, paymentAmount); // pass the paymentMethodId to the function

                                                reservationDb.create(newReservation)
                                                   .then((result) => {
                                                      findOneReservationByFilter(result._id)
                                                      sendUserReservationEmail(foundUser,newReservation,newReservation.totalPrice);
                                                   })
                                                   .catch((err) => res.status(500).json({ error: err.message }));
                                             })
                                             .catch((error) => res.status(500).json({ error: error.message }));



                                       });





                                    })


                                 } else {
                                    return res.status(400).json({ error: 'No card found for the customer.' });
                                 }
                              })
                              .catch((error) => res.status(500).json({ error: error.message }));
                        }
                     );
                  })
                  .catch((error) => res.status(500).json({ error: error.message }));
            })
            .catch((err) => res.status(500).json({ error: err.message }));
      })
      .catch((err) => res.status(500).json({ error: err.message }));
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




function calculateReservationTotalFee(reservation) {
   const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
 
   const checkIn = new Date(reservation.checkIn);
   const checkOut = new Date(reservation.checkOut);
   const nights = Math.round((checkOut - checkIn) / millisecondsPerDay); // Number of nights
 
   const nightsFee = nights * reservation.nightsFee;
   const servicesFee = nights * reservation.servicesFee;
   const totalPrice = nightsFee + servicesFee;
 
   return totalPrice;
 }