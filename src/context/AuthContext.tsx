import React, {createContext, useCallback, useState, useContext} from 'react';

import api from '../services/api';

interface AuthState {
    token: string;
    user: object;
}

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContentData {
    user: object;
    signIn(credentials: SignInCredentials): Promise<void>;
}

const AuthContent = createContext<AuthContentData>({} as AuthContentData);

export const AuthProvider:React.FC = ({children}) => {

    const[data, setData] = useState<AuthState>( () =>{
        const token = localStorage.getItem('@GoBarber:token');
        const user = localStorage.getItem('@GoBarber:user');

        if(token && user) {
            return {
                token,
                user: JSON.parse(user)
            }
        }

        return {} as AuthState;
    });

    const signIn = useCallback(async ({email, password}) => {
        const response = await api.post('sessions', {
            email,
            password
        });

        const {token, user} = response.data;

        localStorage.setItem('@GoBarber:token', token);
        localStorage.setItem('@GoBarber:user', JSON.stringify(user));

        setData({token, user});
    }, []);

    return(
        <AuthContent.Provider value={{user: data.user, signIn}}>
            {children}
        </AuthContent.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContent);

    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}
