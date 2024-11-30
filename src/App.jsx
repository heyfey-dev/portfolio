import Formpage from './Components/FormPage';
import Submission from './Components/Submission.';

import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Formpage />} />
        <Route path="/submission" element={<Submission />} />
       
      </Routes>
    </div>
  );
}

export default App;
