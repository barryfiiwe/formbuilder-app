import React from 'react';
import './App.css';
import Formbuilder from './components/formbuilder/Formbuilder';
import { formElements } from './components/formbuilder/UserFormElements';

function App() {
  const [loadingState, setLoadingState] = React.useState(false);
  const [preview, setPreview] = React.useState([]);
  const handleSubmit = (data) => {
    setLoadingState(true);

    setTimeout(() => {
      setLoadingState(false);
      console.log(data);
      setPreview(data.upload);
    }, 2000);
  };

  console.log('prev', preview);
  return (
    <div
      className=""
      style={{
        // width: '50%',
        margin: 'auto',
        border: '1px solid gray',
        padding: '30px',
      }}
    >
      <Formbuilder
        elements={formElements}
        onSubmit={handleSubmit}
        loadingState={loadingState}
      />
      <div
        className=""
        style={{
          height: '400px',
          border: '1px solid red',
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {preview?.length > 0 &&
          preview?.map((e) => (
            <img
              key={e}
              src={URL.createObjectURL(e)}
              alt="File preview"
              style={{
                marginTop: '10px',
                maxWidth: '50%',
                height: 'auto',
              }}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
