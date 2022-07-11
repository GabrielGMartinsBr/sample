import './App.css';
import AppForm, { FormValues } from './components/AppForm';
import Card from './components/Card';

function App() {
  const handleSubmit = (values: FormValues) => {
    console.log(values)
  }

  return (
    <div className="App">
      <Card backgroundColor='#fff'>
        <AppForm onSubmit={handleSubmit} />
      </Card>
    </div>
  );
}

export default App;
