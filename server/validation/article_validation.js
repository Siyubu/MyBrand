import Joi from '@hapi/joi';

const blogValidation=(body)=>{
    const blogPostSchema = Joi.object({ 
        title: Joi.string().min(3).max(30).required(),
         body: Joi.string().min(10).max(90), 
      });
    
      return blogPostSchema.validate(body);
}


  export default blogValidation ;