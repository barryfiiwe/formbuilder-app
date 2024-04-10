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
      setPreview(data);
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
        }}
      >
        {
          <>
            <p>{preview.firstname}</p>
            <p>{preview.email}</p>
            <p>{preview.gender}</p>
            <p>{preview.age}</p>
            <p>{preview.newsletter}</p>
            <p>{preview.password}</p>
            <p>{preview.textarea}</p>
            <div
              style={{
                height: '400px',
                border: '1px solid red',
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              {preview?.upload?.map((i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(i)}
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
        }
      </div>
    </div>
  );
}

export default App;
