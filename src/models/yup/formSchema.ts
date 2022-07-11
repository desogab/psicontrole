import * as yup from 'yup';

export const schemaClientBasicInfo = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().max(11).required(),
  cpf: yup.string().max(11).required(),
  consultationPrice: yup.number().required(),
}).required();

export const schemaClientAddress = yup.object({
  zipcode: yup.string().required(),
  street: yup.string().required(),
  district: yup.string().required(),
  number: yup.number().required(),
  city: yup.string().required(),
  complement: yup.string(),
  state: yup.string().required(),
}).required();

export const schemaClientEmergency = yup.object({
  name: yup.string().required(),
  phone: yup.string().required(),
}).required();
