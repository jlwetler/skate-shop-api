import joi from 'joi';

export async function addressSchema(body) {
    const addressSchema = joi.object({
        street: joi.string().min(8).max(40).trim().required(), 
        cep: joi.string().length(8).required(),
        district: joi.string().min(3).required(),
        city: joi.string().min(3).required(),
        email: joi.string().min(3).email().required().label('Email'), 
        phone: joi.string().min(10).max(11).required(),
    })

    const addressObject = await addressSchema.validateAsync(body);

    return addressObject;
}