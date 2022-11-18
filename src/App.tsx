import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Intro from '@/pages/Intro';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import Main from '@/pages/Main';
import Temp from '@/pages/Temp';

const queryClient = new QueryClient();

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/login/:provider" element={ <Login /> }/>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/main" element={<Main />} />
          <Route path="/temp" element={<Temp />} />
        </Routes>
      </BrowserRouter>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
