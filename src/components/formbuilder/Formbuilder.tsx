import React, { useState, ChangeEvent } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { FormHelperText } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import { FormElements } from '../formbuilder/UserFormElements';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  phonenumber: Yup.string().required('Phone number is required'),
});

type FormElement = {
  name: string;
  id: string;
  eType: 'checkbox' | 'radio' | 'textfield' | 'select';
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

  const renderSelectedComponent = (elements: FormElement[]) => {
    console.log('elements', elements);

    return elements.map((element, index) => {
      switch (element.eType) {
        case 'checkbox':
          return <Checkbox key={index} name={element.name} />;
        case 'radio':
          return <Radio key={index} name={element.name} />;
        case 'textfield':
          return (
            <TextField
              key={index}
              name={element.name}
              id={element.id}
              placeholder={element.placeholder}
              onChange={handleTextData}
            />
          );
        case 'select':
          return (
            <FormControl key={index}>
              <InputLabel htmlFor={element.name}>
                {element.placeholder}
              </InputLabel>
              <Select
                value={textData[element.name]}
                onChange={handleSelectChange}
              >
                {element.mData?.option?.map((option: string, index: number) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText id={element.name}>
                {element.helpText}
              </FormHelperText>
            </FormControl>
          );
        default:
          return null;
      }
    });
  };

  const handleSubmit = (values: any, actions: FormikHelpers<any>) => {
    console.log(values);
    actions.setSubmitting(false);
  };
  return (
    <Formik
      initialValues={{}}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          {renderSelectedComponent(formElements)}
          <Button type='submit' disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default Formbuilder;
