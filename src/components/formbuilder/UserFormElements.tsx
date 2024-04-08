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
    validation: {
      required: true,
      min: 1,
    },
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
    mData: {
      multiline: true,
      rows: 8,
    },
    validation: {
      required: true,
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
  },
];
