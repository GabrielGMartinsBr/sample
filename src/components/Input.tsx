import { FormField } from './FormField';

interface BaseInputProps {
    id: string;
    name: string;
    label: string;
    placeholder?: string;
    validator?: (value: any) => boolean | string;
    formField: FormField;
}

interface TextInputProps extends BaseInputProps {
    type: 'text' | 'number' | 'email' | 'color';
}

interface RadioInputProps extends BaseInputProps {
    type: 'radio';
    options: { value: string; label: string; }[];
}

interface CheckboxInputProps extends BaseInputProps {
    type: 'checkbox';
}

type InputProps = TextInputProps | RadioInputProps | CheckboxInputProps;

export default function Input(props: InputProps) {
    const { formField } = props;

    const handleBlur = () => {
        if (typeof props.validator !== 'function') {
            return;
        }
        formField.setError(
            props.validator(formField.value)
        );
    }

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
                            onChange={e => formField.setValue(e.target.value)}
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
                        checked={formField.value}
                        onChange={e => formField.setValue(e.target.checked)}
                        onBlur={handleBlur}
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
                value={formField.value}
                onChange={e => formField.setValue(e.target.value)}
                onBlur={handleBlur}
                className={formField.error ? 'has-error' : ''}
                required={!!props.validator}
                placeholder={props.placeholder}
            />
            {formField.error && typeof formField.error === 'string' && (
                <div className="error-message">{formField.error}</div>
            )}
        </div>
    );
}
