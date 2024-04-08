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

interface FormElement {
  id: string;
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
          />
        );
      case 'select':
        return (
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
        );
      default:
        return null;
    }
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
  );
};

export default FormBuilder;
