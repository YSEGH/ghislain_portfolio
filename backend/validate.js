import Joi from "@hapi/joi";

const messageValidation = (data) => {
  const schema = Joi.object({
    lastname: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().allow(""),
    company: Joi.string().allow(""),
    message: Joi.string().required(),
  });
  return schema.validate(data);
};

export { messageValidation };
