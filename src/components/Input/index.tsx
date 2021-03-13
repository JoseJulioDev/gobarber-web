import React,  {InputHTMLAttributes, ComponentType, useEffect, useRef, useState, useCallback} from 'react';
import {IconBaseProps,} from 'react-icons';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';

import {Container, Error} from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon ?: ComponentType<IconBaseProps>;
}

const Input:React.FC<InputProps> = ({name ,icon:Icon ,...rest}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const {fieldName, defaultValue, error, registerField} = useField(name, )
    
    const handleFocus = useCallback( () => {
        setIsFocused(true)
    }, []);

    const handleBlur = useCallback(() => {
        setIsFocused(false);
        setIsFilled( !! inputRef.current?.value);
    }, []);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        });
    }, [fieldName, registerField]);

    return (
        <Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled} >
            {Icon && <Icon size={20} />}
            <input onFocus={handleFocus} onBlur={handleBlur} 
                   defaultValue={defaultValue} ref={inputRef} {...rest} />
           
            {error && 
                (<Error title={error}> 
                    <FiAlertCircle color="#c93030" size={20} />    
                </Error>)
            }
        </Container>   
    );
}

export default Input;