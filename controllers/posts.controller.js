import mongoose, {isValidObjectId} from "mongoose"
import {Post} from "../models/post.model.js"
import {User} from "../models/users.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const getAllPosts = asyncHandler(async (req, res) => {
    // const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    // res.send('all post here')
    const posts = await Post.find().populate('owner', 'username');
    
    if (!posts) {
      res.status(404).json({ success: false, message: 'No posts found' });
      return;
    }
  
    res.status(200).json({ success: true, data: posts });
    res.render('profile')
});
    //TODO: get all posts based on query, sort, pagination

const publishAPost = asyncHandler(async(req,res) =>  {
    // res.send('publish post here');
    // res.send(req.session.userId);
    // console.log("frmo controller : " + req.file)

    const { title, description} = req.body
    console.log("title : " + title)
    console.log("desc : " + description)
    // TODO: get post, upload to cloudinary, create post
    const post = req.file;
    
    console.log("post obj : " + post);

    if (!title || !description || !post) {
        throw new ApiError(400, "Title, description, video file, and thumbnail are required.");
    }

    // Upload video and thumbnail to Cloudinary
    console.log("came here");
    // console.log("path of post : " + post[0].path);



    const postUploadResult = await uploadOnCloudinary(post.path, 'post');
    // const thumbnailUploadResult = await uploadOnCloudinary(thumbnail[0].path, 'image');
    console.log("contrller 1");
    console.log(postUploadResult.secure_url);
    // Create the post
    const newPost = new Post({
        post: postUploadResult.secure_url,
        // post: 'asdfafsdffasdfasdf',
        title,
        description,
        owner: req.session.userId
    });

    console.log("contrller 3");


    const savedPost = await newPost.save();
    await User.findByIdAndUpdate(req.session.userId, { $push: { posts: savedPost._id } });

    console.log("contrller 4");


    res.status(201).json(new ApiResponse({
        message: "Post created successfully.",
        data: newPost,
    }));
});


const getPostById = asyncHandler(async (req, res) => {
    const currPostId = req.params;
    // console.log(currPostId);
    res.send('get post by id here : '+ currPostId.postId);
    // res.status(300).send(body)

    //TODO: get video by id
})

// const updateVideo = asyncHandler(async (req, res) => {
//     const { videoId } = req.params
//     //TODO: update video details like title, description, thumbnail

// })

const deletePost = asyncHandler(async (req, res) => {
    res.send('delete post here')

    const { videoId } = req.params
    //TODO: delete video
})

// const togglePublishStatus = asyncHandler(async (req, res) => {
//     const { videoId } = req.params
// })


    

export {
    getAllPosts,
    publishAPost,
    getPostById,
    deletePost,
    // togglePublishStatus
}
