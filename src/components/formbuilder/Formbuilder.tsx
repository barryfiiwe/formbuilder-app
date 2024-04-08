<<<<<<< HEAD
import React, { useState, ChangeEvent } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Box, FormHelperText } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
// import { FormElements } from '../formbuilder/UserFormElements';
=======
import React from 'react';
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  FormHelperText,
  styled,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
>>>>>>> 2b28489a413f245de3601c1062ea93d0efa2e6cd

interface FormElement {
  id: string;
<<<<<<< HEAD
  eType: 'checkbox' | 'radio' | 'text' | 'select';
  placeholder: string;
  mData?: { option: string[] };
  helpText?: string;
};

interface TextData {
  [key: string]: string;
=======
  label: string;
  name: string;
  eType: string;
  dType: string;
  options?: Array<{ value: string | number; label: string }>;
  placeholder?: string;
  validation?: any;
  width?: number;
  helperText?: string;
  mData?: object;
>>>>>>> 2b28489a413f245de3601c1062ea93d0efa2e6cd
}

interface FormBuilderProps {
  elements: FormElement[];
  onSubmit: (data: any) => void;
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const FormBuilder: React.FC<FormBuilderProps> = ({ elements, onSubmit }) => {
  const { control, handleSubmit, setError } = useForm();

<<<<<<< HEAD
  const renderSelectedComponent = (element: FormElement) => {
    // return elements.map((element, index) => {
    //   console.log('elements', element.eType);
    switch (element.eType) {
      case 'checkbox':
        return <Checkbox key={element.id} name={element.name} />;
      case 'radio':
        return <Radio key={element.id} name={element.name} />;
      case 'text':
        return (
          <TextField
            key={element.id}
            name={element.name}
            id={element.id}
            placeholder={element.placeholder}
            onChange={handleTextData}
            sx={{ width: '100%' }}
=======
  const renderInput = (fieldProps, element: FormElement) => {
    switch (element.eType) {
      case 'text':
      case 'password':
      case 'email':
      case 'number':
      case 'date':
      case 'time':
      case 'file':
        return (
          <TextField
            {...fieldProps}
            label={element.label}
            type={element.dType}
            placeholder={element.placeholder}
            {...element.mData}
          />
        );
      case 'upload':
        return (
          <Button
            {...fieldProps}
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            // startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput type="file" />
          </Button>
        );
      case 'checkbox':
        return (
          <FormControlLabel
            control={<Checkbox {...fieldProps} />}
            label={element.label}
>>>>>>> 2b28489a413f245de3601c1062ea93d0efa2e6cd
          />
        );
      case 'select':
        return (
<<<<<<< HEAD
          <Select value={textData[element.name]} onChange={handleSelectChange}>
            {element.mData?.option?.map((option: string, index: number) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
=======
          <>
            <InputLabel>{element.label}</InputLabel>
            <Select {...fieldProps} label={element.label}>
              {element?.mData?.options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </>
>>>>>>> 2b28489a413f245de3601c1062ea93d0efa2e6cd
        );
      default:
        return null;
    }
<<<<<<< HEAD
    // });
  };

  // const handleSubmit = (values: any, actions: FormikHelpers<any>) => {
  //   console.log(values);
  //   actions.setSubmitting(false);
  // };
  return (
    // <Formik
    //   initialValues={{}}
    //   validationSchema={validationSchema}
    //   onSubmit={handleSubmit}
    // >
    //   {({ isSubmitting }) => (
    formElements.map((element) => {
      return (
        <Box width='100%' bgcolor={'red'} my={4}>
          {/* <Form> */}
          <FormControl sx={{ width: '100%' }} key={element.id}>
            <InputLabel htmlFor={element.name}>
              {element.placeholder}
            </InputLabel>
            {renderSelectedComponent(element)}
            <FormHelperText id={element.name}>
              {element.helpText}
            </FormHelperText>
          </FormControl>
          {/* <Button type='submit' disabled={isSubmitting}>
          Submit
        </Button> */}
          {/* </Form> */}
        </Box>
      );
    })
    // )}
    // </Formik>
=======
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        marginY="10px"
      >
        {elements.map((element, index) => {
          const isHalfWidth = element.width === 48;
          return (
            <Box
              key={element.id}
              width={isHalfWidth ? '48%' : '100%'}
              display="inline-flex"
              justifyContent={isHalfWidth ? 'space-between' : 'flex-start'}
              marginY="10px"
            >
              {element.eType === 'button' ? (
                <Button variant="outlined" type={element.name}>
                  {element.label}
                </Button>
              ) : (
                <Controller
                  name={element.name}
                  control={control}
                  rules={element.validation}
                  shouldUnregister={true}
                  render={({ field, fieldState: { error } }) => (
                    <FormControl fullWidth>
                      {renderInput(
                        { ...field, error: !!error, helperText: error?.type },
                        element
                      )}
                      <FormHelperText id={`${element.id}-helper-text`}>
                        {element.helperText}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
              )}
            </Box>
          );
        })}
      </Box>
    </form>
>>>>>>> 2b28489a413f245de3601c1062ea93d0efa2e6cd
  );
};

export default FormBuilder;
