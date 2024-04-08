import './App.css';
import Formbuilder from './components/formbuilder/Formbuilder';
import { formElements } from './components/formbuilder/UserFormElements';

function App() {
  const handleSubmit = (data) => {
    console.log(data);
  };
  return (
    <div
      className=""
      style={{
        width: '50%',
        margin: 'auto',
        border: '1px solid gray',
        padding: '30px',
      }}
    >
      <Formbuilder elements={formElements} onSubmit={handleSubmit} />
    </div>
  );
}

export default App;
