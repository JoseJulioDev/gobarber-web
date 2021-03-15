import {createContext} from 'react';

interface AuthContentData {
    name: string;
}

const AuthContent = createContext<AuthContentData>({} as AuthContentData);

export default AuthContent;