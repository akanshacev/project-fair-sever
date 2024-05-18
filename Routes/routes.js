const express=require('express')
const userController=require('../Controller/userController')
const projectController=require('../Controller/projectController')
const router=express.Router()
const jwtMiddle=require('../Middlewares/jwtMiddleware')
const multerconfig=require('../Middlewares/multerMiddleware')


router.post('/register',userController.useRegister)
router.post('/login',userController.userLogin)
router.post('/addproject',jwtMiddle,multerconfig.single('image'),projectController.addProjects)
router.get('/home-projects',projectController.homeProjects)
router.get('/all-projects',jwtMiddle,projectController.allProjects)
router.get('/user-projects',jwtMiddle,projectController.userProjects)
router.put('/edit-project/:pid',jwtMiddle,multerconfig.single('image'),projectController.editProject)
router.delete('/delete-project/:pid',jwtMiddle,projectController.removeProject)
router.put('/update-userprofile',jwtMiddle,multerconfig.single('profile'),userController.userUpdateProfile)


module.exports=router