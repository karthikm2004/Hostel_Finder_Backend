const express = require('express')
const multerConfig = require('../Middlewares/multerMiddleware')
const jwtmiddle = require('../Middlewares/jwtMiddleware')
const verifyAdmin = require('../Middlewares/verifyAdmineMiddlewaare')

const userControllers = require('../Controllers/userController')
const hostelController = require('../Controllers/hostelController')
const ownerUserController = require('../Controllers/ownerUserController')
const favoriteController = require('../Controllers/whishlistController')
const bookingController = require('../Controllers/bookingController')

const router = express.Router()


console.log(jwtmiddle)
console.log(hostelController.addHostel)
console.log(multerConfig)

// users
router.post('/signup', userControllers.signUp)
router.post('/signin', userControllers.signIn)
router.get('/all-users', jwtmiddle, userControllers.getAllUsers)

// owner
router.post('/owner/signup', ownerUserController.ownerSignUp)
router.post('/owner/signin', ownerUserController.ownerSignIn)

// hostel
router.post('/add-hostel', jwtmiddle, multerConfig.array('uploadImg', 3), hostelController.addHostel)
router.get('/home-hostels', hostelController.getHomeHostels)
router.get('/all-hostels', hostelController.getAllHostels)
router.get('/get-hostel/:id', hostelController.getHostel)
router.get('/owner-hostels', jwtmiddle, hostelController.getOwnerHostels)
router.put('/update-hostel/:id', jwtmiddle, hostelController.updateHostel)
router.get('/recent-hostels', hostelController.getRecentHostels)

router.post('/add-favorite', jwtmiddle, favoriteController.addFavorite)
router.get('/get-favorites', jwtmiddle, favoriteController.getFavorites)
router.delete('/remove-favorite/:id', jwtmiddle, favoriteController.removeFavorite)


router.post('/add-booking', jwtmiddle, bookingController.addBooking)
router.get('/user-bookings', jwtmiddle, bookingController.getUserBookings)
router.get('/owner-bookings', jwtmiddle, bookingController.getOwnerBookings)
router.put('/confirm-booking/:id', jwtmiddle, bookingController.confirmBooking)
router.put('/update-booking-status/:id', jwtmiddle, bookingController.updateBookingStatus)
router.get('/all-bookings', bookingController.getAllBookings)
router.get('/recent-bookings', bookingController.getRecentBookings)


router.get('/pending-hostels', jwtmiddle, verifyAdmin, hostelController.getPendingHostels)

router.delete(   '/delete-hostel/:id', jwtmiddle, hostelController.deleteHostel)
 
router.put('/approve-hostel/:id', jwtmiddle, verifyAdmin, hostelController.approveHostel)

router.delete('/reject-hostel/:id', jwtmiddle, verifyAdmin, hostelController.rejectHostel)

// router.get('/owner-hostels', jwtmiddle, verifyAdmin, hostelController.getOwnerHostels)



module.exports = router