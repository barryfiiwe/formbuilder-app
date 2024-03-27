
export const formElement=[
    {
      name:"firstname",
      id: "firstname",
      eType: "text",
      dType: "string",
      placeholder:"firstname",
      // onChange:{handleTextData}
    },
    {
      name:"phonenumber",
      id: "phonenumber",
      eType: "text",
      dType: "number",
      placeholder:"Enter Phone number",
      onChange:'handleTextData'
    },
    {
      name:"gender",
      id: "gender",
      eType: "select",
      dType: "string",
      placeholder:"gender",
      mData:{
        option: ["Male","Female","prefer not to say"]
      }
  
    }
  ]