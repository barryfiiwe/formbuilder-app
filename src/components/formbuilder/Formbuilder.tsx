import { Formik, Form, Field, ErrorMessage } from 'formik';
import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import * as Yup from 'yup';
import {useState, ChangeEvent} from "react"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { FormHelperText } from "@mui/material";
import { AnyNsRecord } from "dns";
import {formElement} from "../formbuilder/UserFormElements"


const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  phonenumber: Yup.string().required('Phone number is required'),
  // Add more fields and validation rules as needed
});



const Formbuilder = ({formElement}:any) => {
  const [textData , setTextData ]=useState<{ [key: string]: string }>({}) 
  
  const handleTextData = (e:ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
   setTextData({ ...textData, [name]: value })
}

  const handleSelectChange=(e: SelectChangeEvent)=>{
  const {name, value} =e.target;
  setTextData({ ...textData, [name]: value })
}


  const {eType}=formElement;

  const renderSelectedComponent = (element:any) => {
    switch (element.eType) {
      case "checkbox":
        return <Checkbox name={element.name}/>;
      case "radio":
        return <Radio name={element.name}/>;
      case "textfield":
        return <TextField  name={element.name} id={element.id} placeholder={element.placeholder} onChange={handleTextData}/>;
      case "button":
        return <Button/>
      case "select":
        return 
        <Select 
      value={textData[element.name]} 
      onChange={handleSelectChange}
    >
      {element.mData.option.map((option: any, index: any) => (
        <MenuItem key={index} value={option}>{option}</MenuItem>
      ))}
    </Select>
      
      default:
        return null;
    }
  };
  return (
    <Formik
    initialValues={{}}
    validationSchema={validationSchema}
    onSubmit={(values, { setSubmitting }) => {
      // Handle form submission
      console.log(values);
      setSubmitting(false);
    }}
  >
    {({ isSubmitting }) => (
      <Form>
        {
          formElement.map((element, index) => (
            <FormControl key={index}>
              <InputLabel htmlFor={element.name}>
                {element.placeholder}
              </InputLabel>
              {renderSelectedComponent(element)}
              <FormHelperText id={element.name}>
                {element.helpText}
              </FormHelperText>
            </FormControl>
          ))
        }
        <Button type="submit" disabled={isSubmitting}>Submit</Button>
      </Form>
    )}
  </Formik>
  )
}

export default Formbuilder

