interface FormField {
  name: string;
  id: string;
  eType: 'text' | 'select';
  dType: 'string' | 'number';
  placeholder: string;
  onChange?: string;
  mData?: { option: string[] };
}

export const FormElements: FormField[] = [
  {
    name: 'firstname',
    id: 'firstname',
    eType: 'text',
    dType: 'string',
    placeholder: 'firstname',
  },
  {
    name: 'phonenumber',
    id: 'phonenumber',
    eType: 'text',
    dType: 'number',
    placeholder: 'Enter Phone number',
  },
  {
    name: 'gender',
    id: 'gender',
    eType: 'select',
    dType: 'string',
    placeholder: 'gender',
    mData: {
      option: ['Male', 'Female', 'prefer not to say'],
    },
  },
];
