import Joi from '@hapi/joi';

const userValidation=(body)=>{
    const userValidationSchema=Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });
    return userValidationSchema.validate(body);
}
export default userValidation;