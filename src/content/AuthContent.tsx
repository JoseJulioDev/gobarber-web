import React, {createContext, useCallback} from 'react';

import api from '../services/api';

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContentData {
    name: string;
    signIn(credentials: SignInCredentials): Promise<void>;
}

export const AuthContent = createContext<AuthContentData>({} as AuthContentData);

export const AuthProvider:React.FC = ({children}) => {
    const signIn = useCallback(async ({email, password}) => {
        const response = await api.post('sessions', {
            email,
            password
        });

        console.log(response.data);
    }, []);

    return(
        <AuthContent.Provider value={{name: 'José Julio', signIn}}>
            {children}
        </AuthContent.Provider>
    );
}
