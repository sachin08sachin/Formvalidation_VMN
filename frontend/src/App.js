
import { BrowserRouter,Routes,Route} from "react-router-dom";
import FormInput from "./components/formInput/FormInput";
import RetrieveData from "./components/retriveData/RetriveData";
import TestCaseForm from "./components/testCaseList/TestCaseList";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FormInput/>}/>
          <Route path="/retrive-data" element={<RetrieveData/>}/>
          <Route path="/test-case-list/:dataId" element={<TestCaseForm/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;