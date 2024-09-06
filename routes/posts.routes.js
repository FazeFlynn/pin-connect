import { Router } from 'express';
import {
    deletePost,
    getAllPosts,
    getPostById,
    publishAPost,
    // togglePublishStatus,
} from "../controllers/posts.controller.js"

import {ensureAuthenticated} from "../middlewares/auth.middleware.js"
import {upload} from "../middlewares/multer.middleware.js"
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();
router.use(ensureAuthenticated); // Apply verifyJWT middleware to all routes in this file


router.get('/', getAllPosts);




router.get('/upload', (req, res) => {
    res.render('upload');
});

router.post(
    '/upload',
    upload.single('post'),
    // (req,res) => {
        // console.log("frmo route : " + req.file)
        // res.send(req.file)
        // ensureAuthenticated,
        publishAPost
    // }
);

router.get('/:postId', getPostById);
router.delete('/:postId', deletePost);


// router.patch('/:postId', upload.single('post'), updatePost);
    

// router.route("/toggle/publish/:videoId").patch(togglePublishStatus);
// router.patch('/toggle/publish/:videoId', togglePublishStatus);

export default router