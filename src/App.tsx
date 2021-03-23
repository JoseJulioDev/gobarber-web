import React from 'react';

import GlobalStyle from './styles/global';
import SignIn from './pages/SignIn';
//import SignUp from './pages/SingUp';

import AppProvider from './hooks';

const App: React.FC = () => ( 
    <>
        <AppProvider>
            <SignIn />
        </AppProvider>
       
        <GlobalStyle />
    </>
);

export default App;
