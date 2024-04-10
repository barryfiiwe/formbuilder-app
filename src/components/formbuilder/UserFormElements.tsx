interface FormElement {
  id: string;
  label?: string;
  name: string;
  eType: string;
  dType?: string;
  options?: Array<{ value: string | number; label: string }>;
  placeholder?: string;
  validation?: any;
  width?: number;
  helperText?: string;
  mData?: object;
}

export const formElements: FormElement[] = [
  {
    id: 'firstname',
    label: 'First Name',
    name: 'firstname',
    eType: 'text',
    dType: 'text',
    placeholder: 'Enter your first name',
    helperText: 'Your first name',
  },
  {
    id: 'uplaod',
    name: 'file',
    eType: 'file',
    dType: 'file',
    placeholder: 'Upload',
  },
  {
    id: 'age',
    label: 'Age',
    name: 'number',
    eType: 'number',
    dType: 'number',
    placeholder: 'Enter your age',
  },
  {
    id: 'password',
    label: 'Password',
    name: 'password',
    eType: 'password',
    dType: 'password',
    placeholder: 'Enter your password',
    width: 48,
    validation: {
      required: true,
    },
  },
  {
    id: 'email',
    label: 'Email',
    name: 'email',
    eType: 'email',
    dType: 'email',
    placeholder: 'Enter your email',
    width: 48,
    validation: {
      required: true,
    },
  },
  {
    id: 'textarea',
    label: 'TextArea',
    name: 'textarea',
    eType: 'textarea',
    dType: 'text',
    placeholder: 'Enter your message',
    width: 78,
    mData: {
      multiline: true,
      rows: 8,
    },
  },
  {
    id: 'newsletter',
    label: 'Subscribe to newsletter',
    name: 'newsletter',
    eType: 'checkbox',
  },
  {
    id: 'uplaod',
    label: 'Upload',
    name: 'upload',
    eType: 'upload',
    width: 30,
    mData: {
      align: 'center',
      accept: 'application/pdf,text/csv, .png, .jpg, jpeg',
    },
  },
  {
    id: 'gender',
    label: 'Gender',
    name: 'gender',
    eType: 'select',
    mData: {
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' },
      ],
    },
  },
  {
    id: 'button',
    label: 'Submit',
    name: 'submit',
    eType: 'button',
    dType: 'submit',
    width: 40,
    mData: {
      align: 'center',
      variant: 'outlined',
    },
  },
  {
    id: 'button',
    label: 'Cancel',
    name: 'cancel',
    eType: 'button',
    dType: 'button',
    width: 40,
    mData: {
      align: 'center',
      variant: 'contained',
      color: 'error',
    },
  },
];
