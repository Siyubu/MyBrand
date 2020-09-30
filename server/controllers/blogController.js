import db from "../config/database.js";
import blogValidation from "../validation/article_validation.js";
import mongoose from "mongoose"

export default class BlogController {

    static async createBlog(req, res) {
      const auth = blogValidation(req.body)
      if (auth.error){
        return res.send({error:auth.error.details[0].message})

      }
      else{
        db.cloudinary.uploader.upload(req.files.images.path, function(result) {
         // console.log(auth)
  
          try 
          {
            
            const blog = new db.blogModel({
              title: auth.value.title,
              body: auth.value.body,
              image:result.url
            })
             blog.save();
            return res.status(200).json(blog);
          } 
          catch (err) 
          {
             res.status(400).send({error:"Failed to post this blog"});
          }
    
        });

      }
      
      
    }

    static async getBlogs(req, res) {
      try {
        const blogs = await db.blogModel.find({});
        return res.status(200).json(blogs);
      } 
      catch (err)
      {
        res.status(400)
        res.send({ error: "No blog in the database!" })
      }
    }

    static async getOneBlog (req, res){
        try {
            const blog = await db.blogModel.findOne({ _id: req.params.id })
            res.send(blog)
        } 
        catch(err)
         {
            res.status(404)
            res.send({ error: "blog doesn't exist!" })
        }
    }

    static async updateBlog (req, res) {
        try {
            const blog = await db.blogModel.findOne({ _id: req.params.id })
    
            if (req.body.title) {
                blog.title = req.body.title
            }
    
            if (req.body.body) {
                blog.body = req.body.body
            }
    
            await blog.save()
            res.send(blog)
        } catch (err) {
            res.status(404)
            res.send({ error: "Blog doesn't exist!" })
        }
    }
  
    static async deleteBlog(req, res) {
      try {
         await db.blogModel.deleteOne({ _id: req.params.id });
         res.status(204).send({message:"Blog is successfuly deleted"});
      } catch (err){
        res.status(404)
        res.send({ error: "Blog doesn't exist!" })
      }
    }


    static async blogComment(req, res) {
      
      try {
        var comment={};
        const blog = await db.blogModel.findOne({ _id: req.params.id })
        var commentValue={
          body: req.body.body,
          name: req.body.name
        };
       comment[mongoose.Types.ObjectId()]=commentValue;
        blog.comments.push(comment);
        await blog.save()
        res.send(blog.comments)
    } catch (err){
        res.status(404)
        res.send({ error: "Blog doesn't exist!" })
    }
 
    }

    static async bloglikes(req, res) {
      
      try {
        const blog = await db.blogModel.findOne({ _id: req.params.id })
        blog.likes+=1;
        await blog.save()
        res.send(blog)
    } 
    catch (err) {
        res.status(404)
        res.send({ error: "Blog doesn't exist!" })
    }
 
    }


  }
  