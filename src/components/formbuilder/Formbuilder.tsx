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
  IconButton,
  InputAdornment,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm, Controller } from 'react-hook-form';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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
  mData?: {
    align?: string;
    variant?: string;
    color?: string;
    rows?: number;
    accept?: string;
  };
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

const FormBuilder: React.FC<FormBuilderProps> = ({
  elements,
  onSubmit,
  loadingState,
}) => {
  const { control, handleSubmit, setError, reset } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);
  const [previewUrl, setPreviewUrl] = React.useState([]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleFormSubmit = async (data: any) => {
    try {
      onSubmit(data);
      reset();
      setPreviewUrl([]);
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      const newFileUrls = newFiles.map((file) => URL.createObjectURL(file));

      setPreviewUrl((prev) => [...prev, ...newFileUrls]);
      field.onChange([...(field.value || []), ...newFiles]);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        marginY="10px"
      >
        {elements.map((element, index) => {
          return (
            <Box
              key={index}
              width={element.width ? `${element.width}%` : '100%'}
              display="flex"
              marginY="10px"
              sx={{
                marginLeft:
                  element.mData?.align === 'right'
                    ? 'auto'
                    : element.mData?.align === 'center'
                    ? 'auto'
                    : '',
                marginRight: element.mData?.align === 'center' ? 'auto' : '',
              }}
            >
              <Controller
                name={element.name}
                control={control}
                rules={element.validation}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <FormControl fullWidth>
                      {element.eType === 'upload' ? (
                        <>
                          <Button
                            component="label"
                            variant="contained"
                            startIcon={<CloudUploadIcon />}
                          >
                            {element.label}
                            <VisuallyHiddenInput
                              type="file"
                              accept={element.mData?.accept}
                              onChange={(event) =>
                                handleFileChange(event, field)
                              }
                            />
                          </Button>
                          <div
                            style={{
                              display: 'flex',
                              gap: '10px',
                              flexWrap: 'wrap',
                            }}
                          >
                            {previewUrl.length > 0 &&
                              previewUrl.map((e) => (
                                <img
                                  key={e}
                                  src={e}
                                  alt="File preview"
                                  style={{
                                    marginTop: '10px',
                                    maxWidth: '100px',
                                    height: 'auto',
                                  }}
                                />
                              ))}
                          </div>
                        </>
                      ) : (
                        renderInput(
                          {
                            ...field,
                            error: error,
                            helperText: error?.message,
                          },
                          element,
                          loadingState,
                          handleClickShowPassword,
                          handleMouseDownPassword,
                          showPassword
                        )
                      )}
                      <FormHelperText id={`${element.id}-helper-text`}>
                        {element.helperText}
                      </FormHelperText>
                    </FormControl>
                  );
                }}
              />
            </Box>
          );
        })}
      </Box>
    </form>
  );
};

export default FormBuilder;

const renderInput = (
  fieldProps: any,
  element: FormElement,
  loadingState: any,
  handleClickShowPassword,
  handleMouseDownPassword,
  showPassword
) => {
  const passwordCheck = showPassword ? 'text' : 'password';
  switch (element.eType) {
    case 'text':
    case 'password':
    case 'email':
    case 'number':
    case 'date':
    case 'time':
    case 'textarea':
    case 'file':
      return (
        <TextField
          {...fieldProps}
          label={element.label}
          type={element.dType === 'password' ? passwordCheck : element.dType}
          placeholder={element.placeholder}
          {...element.mData}
          value={fieldProps.value || ''}
          InputProps={{
            endAdornment: element.dType === 'password' && (
              <InputAdornment position="start">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      );

    case 'checkbox':
      return (
        <FormControlLabel
          control={<Checkbox {...fieldProps} />}
          label={element.label}
        />
      );
    case 'button':
      return loadingState ? (
        <LoadingButton loading {...element.mData}>
          Submit
        </LoadingButton>
      ) : (
        <Button {...element.mData} type={element.dType}>
          {element.label}
        </Button>
      );

    case 'select':
      return (
        <>
          <InputLabel>{element.label}</InputLabel>
          <Select
            {...fieldProps}
            label={element.label}
            value={fieldProps.value || ''}
          >
            {element?.mData?.options?.map((option: any) => (
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
