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

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  phonenumber: Yup.string().required('Phone number is required'),
});

type FormElement = {
  name: string;
  id: string;
  eType: 'checkbox' | 'radio' | 'text' | 'select';
  placeholder: string;
  mData?: { option: string[] };
  helpText?: string;
};

interface TextData {
  [key: string]: string;
}

const Formbuilder: React.FC<{ formElements: FormElement[] }> = ({
  formElements,
}) => {
  const [textData, setTextData] = useState<TextData>({});

  const handleTextData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTextData({ ...textData, [name]: value });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setTextData({ ...textData, [name]: value as string });
  };

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
          />
        );
      case 'select':
        return (
          <Select value={textData[element.name]} onChange={handleSelectChange}>
            {element.mData?.option?.map((option: string, index: number) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        );
      default:
        return null;
    }
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
  );
};

export default Formbuilder;
