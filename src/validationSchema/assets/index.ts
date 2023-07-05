import * as yup from 'yup';

export const assetValidationSchema = yup.object().shape({
  name: yup.string().required(),
  type: yup.string().required(),
  price: yup.number().integer().required(),
  business_id: yup.string().nullable(),
});
