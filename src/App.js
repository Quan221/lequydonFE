import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Example from './component/Home';
import Test from './component/Test';
import SignIn from './component/SignIn';
import SignUp from './component/SignUp';
import ContentSide from './component/ContentSide';
import Header from './component/Header';
import myReducer from './reducer/UseReducer';
import { createContext, useReducer } from 'react';
import { StateContext } from './reducer/StateContext';
import PasswordReset from './component/Sendotp';





export const UserContext = createContext()
function App() {
  const [user, dispatch] = useReducer(myReducer)
  let btn = <>


  </>
  if (user != null) {
    btn = <>
      <Header />

    </>
  }

  return (
    <BrowserRouter>
      < UserContext.Provider value={[user, dispatch]} >
        <StateContext>
          {btn}

          <Routes>
            <Route path='/' element={<SignIn />} />
            <Route path="/trangchu" element={<Example />} />


            <Route path='/dangky' element={<SignUp />} />
            <Route path='/chitiet' element={<ContentSide />} />
            <Route path='/test' element={<PasswordReset />} />
          </Routes>
        </StateContext>
      </UserContext.Provider>
    </BrowserRouter >
  );
}

export default App;
