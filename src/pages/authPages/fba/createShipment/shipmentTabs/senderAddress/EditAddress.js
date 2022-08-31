import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import IntlMessages from '@shipsavvy/utility/IntlMessages';
import {IntlMessagesRequired} from '@shipsavvy/utility/IntlMessagesRequired';
import SsLoading from 'sScomponents/Common/SsLoading';
import {Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import * as yup from 'yup';
import ProtoTypes from 'prop-types';
import {useAddressActions} from '@shipsavvy/services/apis/AddressProvider/AddressProvider';

const AddEditAddress = React.forwardRef(
  ({address, showSubmitButton, afterSubmit, notValidCallback}, ref) => {
    const [addressEntity, setAddressEntity] = useState({
      Id: '',
      Title: (address && address.Title) || '',
      CountryId: '',
      PostalCode: '',
      ProvinceId: '',
      CityId: '',
      AddressLine1: '',
      AddressLine2: '',
    });
    const [countries, setCountries] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const {
      getAddress,
      searchCountry,
      getPostalAddressByCode,
      searchProvince,
      searchCity,
      addAddress,
      updateAddress,
    } = useAddressActions();

    useEffect(() => {
      setIsLoading(true);
      searchCountry({PageSize: 1000}, (data) => {
        setIsLoading(false);
        setCountries(data.Response);
        if (data.Response && data.Response.length > 0 && !address.Id) {
          setAddressEntity((prev) => ({
            ...prev,
            CountryId: data.Response[0].Id,
          }));
          searchProvince(
            {CountryId: data.Response[0].Id, PageSize: 10000},
            (dataProvince) => {
              setProvinces(dataProvince.Response);
            },
          );
        }
      });
      if (address.Id && address.Id != undefined) {
        getAddress(address.Id, (data) => {
          setAddressEntity(data.Response);
          searchProvince(
            {CountryId: data.Response.CountryId, PageSize: 10000},
            (dataProvince) => {
              setProvinces(dataProvince.Response);
            },
          );
          searchCity(
            {ProvinceId: data.Response.ProvinceId, PageSize: 10000},
            (dataCity) => {
              setCities(dataCity.Response);
            },
          );
        });
      }
    }, []);

    const validationSchema = yup.object({
      Title: yup
        .string()
        .required(<IntlMessages id='myAddress.validation.title' />),
      CountryId: yup
        .string()
        .required(<IntlMessages id='myAddress.validation.country' />),
      PostalCode: yup
        .string()
        .required(<IntlMessages id='myAddress.validation.postalCode' />),
      ProvinceId: yup
        .string()
        .required(<IntlMessages id='myAddress.validation.state' />),
      CityId: yup
        .string()
        .required(<IntlMessages id='myAddress.validation.city' />),
      AddressLine1: yup
        .string()
        .required(<IntlMessages id='myAddress.validation.addressLineOne' />),
      AddressLine2: yup.string().nullable(),
    });

    // Input events
    const handleCountryChanged = (event) => {
      setAddressEntity((prevState) => ({
        ...prevState,
        CountryId: event.target.value,
      }));

      searchProvince(
        {CountryId: event.target.value, PageSize: 10000},
        (data) => {
          setProvinces(data.Response);
        },
      );
    };

    const handlePostalCodeChanged = (event) => {
      setAddressEntity((prevState) => ({
        ...prevState,
        PostalCode: event.target.value,
      }));
    };

    const handlePostalCodeChangeFinished = (event) => {
      if (!event.target.value || event.target.value === '') return;
      setIsLoading(true);
      getPostalAddressByCode(
        {CountryId: addressEntity.CountryId, PostalCode: event.target.value},
        (data) => {
          console.log(data);
          renderCities(data.Response.ProvinceId, () => {
            setIsLoading(false);
            setAddressEntity((prevState) => ({
              ...prevState,
              ProvinceId: data.Response.ProvinceId,
              CityId: data.Response.CityId,
              AddressLine1: data.Response.AddressLine1,
              AddressLine2:
                data.Response.AddressLine2 === null
                  ? ''
                  : data.Response.AddressLine2,
            }));
          });
        },
        () => {
          setIsLoading(false);
        },
      );
    };

    const handleProvinceChanged = (event) => {
      setAddressEntity((prevState) => ({
        ...prevState,
        ProvinceId: event.target.value,
      }));
      renderCities(event.target.value);
    };

    const renderCities = (provinceId, callback) => {
      searchCity(
        {
          CountryId: addressEntity.CountryId,
          ProvinceId: provinceId,
          PageSize: 10000,
        },
        (data) => {
          setCities(data.Response);
          if (callback) callback(data);
        },
      );
    };

    const handleCityChanged = (event) => {
      setAddressEntity((prevState) => ({
        ...prevState,
        CityId: event.target.value,
      }));
    };

    const handleAddressLine1Changed = (event) => {
      setAddressEntity((prevState) => ({
        ...prevState,
        AddressLine1: event.target.value,
      }));
    };

    const handleAddressLine2Changed = (event) => {
      setAddressEntity((prevState) => ({
        ...prevState,
        AddressLine2: event.target.value,
      }));
    };

    const handleTitleChanged = (event) => {
      setAddressEntity((prevState) => ({
        ...prevState,
        Title: event.target.value,
      }));
    };

    return (
      <>
        <Formik
          validateOnChange={true}
          enableReinitialize={true}
          initialValues={addressEntity}
          validationSchema={validationSchema}
          innerRef={ref}
          onSubmit={(formData, {setSubmitting}) => {
            setSubmitting(true);

            if (address.Id) {
              updateAddress(formData, (data) => {
                if (afterSubmit) afterSubmit(data);
                setSubmitting(false);
              });
            } else {
              addAddress(formData, (data) => {
                if (afterSubmit) afterSubmit(data);
                setSubmitting(false);
              });
            }
          }}
        >
          {(form) => {
            if (Object.keys(form.errors).length) {
              if (notValidCallback) notValidCallback();
            }

            return (
              <Form noValidate autoComplete='false'>
                <Stack direction='column' spacing={3}>
                  <Box>
                    <FormControl
                      fullWidth
                      sx={{
                        width: '100%',
                      }}
                    >
                      <InputLabel id='status-select-label'>
                        {<IntlMessagesRequired id='myAddress.country' />}
                      </InputLabel>
                      <Select
                        sx={{
                          width: '60%',
                          maxWidth: '100%',
                        }}
                        labelId='country-select-label'
                        id='country-select'
                        name='CountryId'
                        label={<IntlMessagesRequired id='myAddress.country' />}
                        value={addressEntity.CountryId}
                        onChange={handleCountryChanged}
                        error={
                          form.touched &&
                          form.errors.CountryId != undefined &&
                          form.errors.CountryId != ''
                        }
                      >
                        {countries.map((country) => (
                          <MenuItem key={country.Id} value={country.Id}>
                            {country.Name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>

                  <Box>
                    <TextField
                      label={<IntlMessagesRequired id='common.postalCode' />}
                      name='PostalCode'
                      variant='outlined'
                      value={addressEntity.PostalCode}
                      onChange={handlePostalCodeChanged}
                      onBlur={handlePostalCodeChangeFinished}
                      helperText={
                        form.touched && form.errors.PostalCode
                          ? form.errors.PostalCode
                          : ''
                      }
                      error={
                        form.touched &&
                        form.errors.PostalCode != undefined &&
                        form.errors.PostalCode != ''
                      }
                      sx={{
                        width: '60%',
                        maxWidth: '100%',
                      }}
                    />
                  </Box>

                  <Box>
                    <FormControl fullWidth>
                      <InputLabel id='status-select-label'>
                        {<IntlMessagesRequired id='common.province' />}
                      </InputLabel>
                      <Select
                        labelId='province-select-label'
                        id='province-select'
                        name='ProvinceId'
                        label={
                          <IntlMessagesRequired required id='common.province' />
                        }
                        value={addressEntity.ProvinceId}
                        onChange={handleProvinceChanged}
                        error={
                          form.touched &&
                          form.errors.ProvinceId != undefined &&
                          form.errors.ProvinceId != ''
                        }
                      >
                        {provinces.map((province) => (
                          <MenuItem key={province.Id} value={province.Id}>
                            {province.Name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl fullWidth>
                      <InputLabel id='status-select-label'>
                        {<IntlMessagesRequired id='common.city' />}
                      </InputLabel>
                      <Select
                        labelId='city-select-label'
                        id='city-select'
                        name='CityId'
                        label={
                          <IntlMessagesRequired required id='common.city' />
                        }
                        value={addressEntity.CityId}
                        onChange={handleCityChanged}
                        error={
                          form.touched &&
                          form.errors.CityId != undefined &&
                          form.errors.CityId != ''
                        }
                      >
                        {cities.map((city) => (
                          <MenuItem key={city.Id} value={city.Id}>
                            {city.Name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box>
                    <TextField
                      fullWidth
                      label={<IntlMessagesRequired id='common.addressLine1' />}
                      name='AddressLine1'
                      variant='outlined'
                      // error={Vali.error && meta.touched ? meta.error : ''}
                      value={addressEntity.AddressLine1}
                      onChange={handleAddressLine1Changed}
                      helperText={
                        form.touched && form.errors.AddressLine1
                          ? form.errors.AddressLine1
                          : ''
                      }
                      error={
                        form.touched &&
                        form.errors.AddressLine1 != undefined &&
                        form.errors.AddressLine1 != ''
                      }
                    />
                  </Box>
                  <Box>
                    <TextField
                      fullWidth
                      label={<IntlMessages id='common.addressLine2' />}
                      name='AddressLine2'
                      variant='outlined'
                      value={addressEntity.AddressLine2}
                      onChange={handleAddressLine2Changed}
                    />
                  </Box>
                  <Box>
                    <TextField
                      fullWidth
                      label={<IntlMessagesRequired id='common.title' />}
                      placeholder=' Ex: Work, Home, Customer Address...'
                      name='Title'
                      variant='outlined'
                      onChange={handleTitleChanged}
                      value={addressEntity.Title}
                      helperText={
                        form.touched && form.errors.Title
                          ? form.errors.Title
                          : ''
                      }
                      error={
                        form.touched &&
                        form.errors.Title != undefined &&
                        form.errors.Title != ''
                      }
                    />
                  </Box>
                  <SsLoading open={isLoading} />
                  {showSubmitButton ? (
                    <Box>
                      <Button
                        variant='contained'
                        color='primary'
                        type='submit'
                        disabled={form.isSubmitting}
                      >
                        <IntlMessages id='myAddress.saveAdress' />
                      </Button>
                    </Box>
                  ) : (
                    <></>
                  )}
                </Stack>
              </Form>
            );
          }}
        </Formik>
      </>
    );
  },
);
AddEditAddress.propTypes = {
  showSubmitButton: ProtoTypes.bool,
  afterSubmit: ProtoTypes.func,
  notValidCallback: ProtoTypes.func,
  address: ProtoTypes.object,
};
export default AddEditAddress;
