import * as yup from 'yup';

export const profitabilityValidationSchema = yup.object().shape({
  rate: yup.number().integer().required(),
  asset_id: yup.string().nullable(),
});
