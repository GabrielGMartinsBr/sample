import { useState } from 'react';

export function useFormField(initValue: any) {
    const [value, setValue] = useState(initValue);
    const [hasError, setHasError] = useState(initValue);

    return {
        value, setValue,
        error: hasError, setError: setHasError,
    }
}

export interface FormField {
    value: any;
    setValue: React.Dispatch<any>;
    error: any;
    setError: React.Dispatch<any>;
}