import { FormEvent } from 'react'
import Button from './Button';
import { useFormField } from './FormField';
import Heading from './Heading';
import Input from './Input';
import SubHeading from './SubHeading';

export interface FormValues {
    name: string;
    surname: string;
    email: string;
    age: string;
    favoriteColor: string;
    gender: 'male' | 'female' | '';
    receiveNotifications: boolean;
}

interface AppFormProps {
    onSubmit: (e: FormValues) => void
}

class Validators {
    static text(fieldName: string) {
        return (d: string) => {
            if (!d || typeof d !== 'string') {
                return `${fieldName} is a required field`;
            }
            if (!/^[a-z ]+$/gi.test(d)) {
                return `${fieldName} must not contain numbers or special characters`;
            }
            return false;
        }
    }

    static email(fieldName: string) {
        return (d: string) => {
            if (!d || typeof d !== 'string') {
                return `${fieldName} is a required field`;
            }
            if (
                !/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(d)
            ) {
                return `${fieldName} must be a valid email`;
            }
            return false;
        }
    }

    static age(fieldName: string) {
        return (d: string) => {
            const value = parseInt(d);
            if (!(value > 0)) {
                return `${fieldName} must be greater than 0`;
            }
            return false;
        }
    }
}

export default function AppForm(props: AppFormProps) {

    const formFields = {
        name: useFormField(''),
        surname: useFormField(''),
        email: useFormField(''),
        age: useFormField(''),
        gender: useFormField(''),
        favoriteColor: useFormField(''),
        receiveNotifications: useFormField(false),
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const formValues = {} as any;
        for (const entry of Object.entries(formFields)) {
            formValues[entry[0]] = entry[1].value;
        }
        props.onSubmit(formValues);

    }

    const handleClear = () => {
        for (const field of Object.values(formFields)) {
            field.setValue('');
            field.setError(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} >
            <Heading />
            <SubHeading />
            <Input
                id='name'
                name='name'
                type='text'
                label='Name'
                formField={formFields.name}
                validator={Validators.text('Name')}
                placeholder="Name"
            />
            <Input
                id='surname'
                name='surname'
                type='text'
                label='Surname'
                formField={formFields.surname}
                validator={Validators.text('Surname')}
                placeholder="Surname"
            />
            <Input
                id='email'
                name='email'
                type='email'
                label='Email'
                formField={formFields.email}
                validator={Validators.email('Email')}
                placeholder="Email"
            />
            <Input
                id='age'
                name='age'
                type='text'
                label='Age'
                formField={formFields.age}
                validator={Validators.age('Age')}
                placeholder="Age"
            />
            <Input
                id='favoriteColor'
                name='favoriteColor'
                type='text'
                label='Favorite Color'
                formField={formFields.favoriteColor}
                validator={Validators.text('Favorite Color')}
                placeholder="e.g.: blue"
            />
            <Input
                type='radio'
                id='gender'
                name='gender'
                label='Gender'
                formField={formFields.gender}
                options={[
                    { label: 'Male', value: 'male' },
                    { label: 'Female', value: 'female' },
                ]}
            />
            <Input
                type='checkbox'
                id='receiveNotifications'
                name='receiveNotifications'
                label='Receive notifications'
                formField={formFields.receiveNotifications}
            />

            <Button
                type='submit'
                backgroundColor='#5c5'
                textColor='#fff'
                padding='.75rem 1rem'
            >
                Submit
            </Button>
            <Button
                className='ml-1'
                type='button'
                onClick={handleClear}
                backgroundColor='#f55'
                textColor='#fff'
                padding='.75rem 1rem'
            >
                Cancel
            </Button>
        </form>
    )
}