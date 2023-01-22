import { celebrate, Joi } from 'celebrate';

export const urlValidator = /^https?:\/\/(www\.)?[\w\-._~:/?#[\]@!$&'()*+,;=]{1,}#?/;

export const signUpDataValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(new RegExp(urlValidator)),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export const signInDataValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export const profileUpdateValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

export const avatarUpdateValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(new RegExp(urlValidator)).required(),
  }),
});

export const userIdValidation = celebrate({
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
});

export const newCardDataValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(new RegExp(urlValidator)).required(),
  }),
});

export const cardIdValidator = celebrate({
  params: Joi.object({
    cardId: Joi.string().hex().length(24).required(),
  }),
});
