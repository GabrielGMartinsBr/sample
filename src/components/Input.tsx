import { KeyboardEvent } from 'react';

interface BaseInputProps {
    id: string;
    name: string;
    label: string;
    onChange: (e: KeyboardEvent<HTMLInputElement>) => void;
}

interface TextInputProps extends BaseInputProps {
    type: 'text' | 'number' | 'email' | 'color';
    value: string;
}

interface RadioInputProps extends BaseInputProps {
    type: 'radio';
    options: { value: string; label: string; }[];
    value: string;
}

interface CheckboxInputProps extends BaseInputProps {
    type: 'checkbox';
    value: boolean;
}

type InputProps = TextInputProps | RadioInputProps | CheckboxInputProps;

export default function Input(props: InputProps) {
    if (props.type === 'radio') {
        return (
            <div className="form-field">
                <label>{props.label}</label>
                {props.options.map((option, index) => (
                    <label key={props.name + index}>
                        <input
                            name={props.name}
                            type="radio"
                            value={option.value}
                            onChange={props.onChange}
                        />
                        <span className='ml-1'>{option.label}</span>
                    </label>
                ))}
            </div>
        )
    }

    if (props.type === 'checkbox') {
        return (
            <div className="form-field">
                <label>
                    <input
                        name={props.name}
                        type="checkbox"
                        checked={props.value}
                        onChange={props.onChange}
                    />
                    <span>{props.label}</span>
                </label>
            </div>
        )
    }

    return (
        <div className="form-field">
            <label htmlFor={props.id}>{props.label}</label>
            <input
                id={props.id}
                name={props.name}
                type={props.type}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    );
}
