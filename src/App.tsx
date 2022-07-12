import { useState } from 'react';
import './App.css';
import AppForm, { FormValues } from './components/AppForm';
import Card from './components/Card';

function App() {
  const [result, setResult] = useState<any>();

  const handleSubmit = (values: FormValues) => {
    setResult(values);
  }

  return (
    <div className="App">
      <Card backgroundColor='#fff'>
        <AppForm onSubmit={handleSubmit} />
      </Card>

      {result &&
        <Card backgroundColor='#efe'>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </Card>
      }

      <footer>
        developed by <a href="https://gabrielmartins.dev">gabrielmartins.dev</a>
      </footer>
    </div>
  );
}

export default App;
