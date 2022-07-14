import * as yup from 'yup';

export const schemaAuthentication = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
}).required();

export const schemaClientBasicInfo = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().max(11).required(),
  cpf: yup.string().max(11).required(),
  consultationPrice: yup.number().required(),
}).required();

export const schemaClientAddress = yup.object({
  zipcode: yup.string(),
  street: yup.string(),
  district: yup.string(),
  number: yup.number(),
  city: yup.string(),
  complement: yup.string(),
  state: yup.string(),
}).required();

export const schemaClientEmergency = yup.object({
  name: yup.string(),
  phone: yup.string(),
}).required();
