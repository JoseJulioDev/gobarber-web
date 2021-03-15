import React from 'react';

import GlobalStyle from './styles/global';
import SignIn from './pages/SignIn';
//import SignUp from './pages/SingUp';

import AuthContent from './content/AuthContent';

const App: React.FC = () => ( 
    <>
        <AuthContent.Provider value={{name: 'José Julio'}}>
            <SignIn />
        </AuthContent.Provider>
        <GlobalStyle />
    </>
);

export default App;
