import { store } from './store/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";
import Approuter from "./routes/Approuter";

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Approuter/>
      </BrowserRouter>
    </Provider>
  )
}

export default App
