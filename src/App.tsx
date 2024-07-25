import Form from './components/Form';

function App() {
  return (
    <div>
      <Form
        formId="57a1c67b-872d-4183-84e1-b36a696c58f0"
        onCompleted={(data) => {
          console.log(data);
        }}
        onStepChange={(step) => {
          console.log(step);
        }}
        onLoading={(loading) => {
          console.log(loading);
        }}
        onLoaded={(loaded) => {
          console.log(loaded);
        }}
      />
    </div>
  );
}

export default App;
