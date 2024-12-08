"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberRegisterschema = void 0;
const Joi = require('joi');
exports.memberRegisterschema = Joi.object({
    firstname: Joi.string().min(1).required().messages({
        'string.base': 'First name should be a type of text',
        'string.empty': 'First name is required',
        'any.required': 'First name is required'
    }),
    lastname: Joi.string().min(1).required().messages({
        'string.base': 'Last name should be a type of text',
        'string.empty': 'Last name is required',
        'any.required': 'Last name is required'
    }),
    email: Joi.string().email().required().messages({
        'string.base': 'Email should be a type of text',
        'string.email': 'Email must be a valid email address',
        'any.required': 'Email is required'
    }),
    password: Joi.string().min(8).pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\];:"<>,.?\/\\|~`-]).{8,}$/).required().messages({
        'string.base': 'Password should be a type of text',
        'string.empty': 'Password is required',
        'string.min': 'Password should have a minimum length of 8',
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        'any.required': 'Password is required'
    }),
    birthday: Joi.date().required().messages({
        'date.base': 'Birthday should be a valid date',
        'any.required': 'Birthday is required'
    }),
    phonenumber: Joi.string().pattern(/^(\+98|0)9\d{9}$/).required().messages({
        'string.base': 'Phone number should be a type of text',
        'string.empty': 'Phone number is required',
        'string.pattern.base': 'Phone number must be a valid Iranian phone number (e.g. +98xxxxxxxxx or 09xxxxxxxxx)',
        'any.required': 'Phone number is required'
    }),
});
