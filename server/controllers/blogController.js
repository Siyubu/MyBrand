import db from "../config/database.js";

export default class BlogController {
  
    static async createBlog(req, res) {
      db.cloudinary.uploader.upload(req.files.images.path, function(result) {
  
      try 
      {
        const blog = new db.blogModel({
          title: req.body.title,
          body: req.body.body,
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

    static async getBlogs(req, res) {
      try {
        const blogs = await db.blogModel.find({});
        return res.status(200).json(blogs);
      } 
      catch 
      {
        res.status(400)
        res.send({ error: "No blog in the database!" })
      }
    }

    static async getOneBlog (req, res){
        try {
            const blog = await db.blogModel.findOne({ _id: req.params.id })
            res.send(blog)
        } catch {
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
        } catch {
            res.status(404)
            res.send({ error: "Blog doesn't exist!" })
        }
    }
  
    static async deleteBlog(req, res) {
      try {
         await db.blogModel.deleteOne({ _id: req.params.id });
         res.status(204).send({message:"Blog is successfuly deleted"});
      } catch {
        res.status(404)
        res.send({ error: "Blog doesn't exist!" })
      }
    }
  }
  