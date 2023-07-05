import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createProfitability } from 'apiSdk/profitabilities';
import { Error } from 'components/error';
import { profitabilityValidationSchema } from 'validationSchema/profitabilities';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { AssetInterface } from 'interfaces/asset';
import { getAssets } from 'apiSdk/assets';
import { ProfitabilityInterface } from 'interfaces/profitability';

function ProfitabilityCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ProfitabilityInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createProfitability(values);
      resetForm();
      router.push('/profitabilities');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ProfitabilityInterface>({
    initialValues: {
      rate: 0,
      asset_id: (router.query.asset_id as string) ?? null,
    },
    validationSchema: profitabilityValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Profitability
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="rate" mb="4" isInvalid={!!formik.errors?.rate}>
            <FormLabel>Rate</FormLabel>
            <NumberInput
              name="rate"
              value={formik.values?.rate}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('rate', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.rate && <FormErrorMessage>{formik.errors?.rate}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<AssetInterface>
            formik={formik}
            name={'asset_id'}
            label={'Select Asset'}
            placeholder={'Select Asset'}
            fetcher={getAssets}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'profitability',
    operation: AccessOperationEnum.CREATE,
  }),
)(ProfitabilityCreatePage);
