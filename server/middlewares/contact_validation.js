import Joi from '@hapi/joi';

const contactValidation=( body)=>{
    const ContactPostSchema = Joi.object({
        names: Joi.string().min(3).max(20).required(),
        subject: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        message:Joi.string().min(10).required()
    });
    return ContactPostSchema.validate(body);

}

export default contactValidation;