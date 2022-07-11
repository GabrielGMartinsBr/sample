import { ChangeEvent, FormEvent, KeyboardEvent, useState } from 'react'
import Input from './Input';

export interface FormValues {
    name: string;
    surname: string;
    gender: 'male' | 'female' | '';
    email: string;
    age: string;
    favoriteColor: string;
    receiveNotifications: boolean;
}

interface AppFormProps {
    onSubmit: (e: FormValues) => void
}

const Validators = {
    text(fieldName: string) {
        return (d: string) => {
            if (!d || typeof d !== 'string') {
                return `${fieldName} is a required field`;
            }
            if (!/^[a-z ]+$/gi.test(d)) {
                return `${fieldName} must not contain numbers or special characters`;
            }
            return false;
        }
    },
    email(fieldName: string) {
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
    },
}

export default function AppForm(props: AppFormProps) {
    const [formValues, setFormValues] = useState<FormValues>({
        name: '',
        surname: '',
        email: '',
        age: '',
        gender: '',
        favoriteColor: '',
        receiveNotifications: false
    });

    function handleInputChange(e: KeyboardEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    }

    function handleCheckboxChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, checked } = e.target;
        setFormValues({
            ...formValues,
            [name]: checked
        });
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        props.onSubmit(formValues);
    }

    return (
        <form onSubmit={handleSubmit} >
            <Input
                id='name'
                name='name'
                type='text'
                label='Name'
                value={formValues.name}
                onChange={handleInputChange}
                validate={Validators.text('Name')}
            />
            <Input
                id='surname'
                name='surname'
                type='text'
                label='Surname'
                value={formValues.surname}
                onChange={handleInputChange}
                validate={Validators.text('Surname')}
            />
            <Input
                id='age'
                name='age'
                type='text'
                label='Age'
                value={formValues.age}
                onChange={handleInputChange}
            />
            <Input
                id='email'
                name='email'
                type='email'
                label='Email'
                value={formValues.email}
                onChange={handleInputChange}
                validate={Validators.email('Email')}
            />
            <Input
                id='favoriteColor'
                name='favoriteColor'
                type='text'
                label='Favorite Color'
                value={formValues.favoriteColor}
                onChange={handleInputChange}
                validate={Validators.text('Favorite Color')}
            />
            <Input
                type='radio'
                id='gender'
                name='gender'
                label='Gender'
                value={formValues.gender}
                onChange={handleInputChange}
                options={[
                    { label: 'Female', value: 'female' },
                    { label: 'Male', value: 'male' },
                ]}
            />
            <Input
                type='checkbox'
                id='receiveNotifications'
                name='receiveNotifications'
                label='Receive notifications'
                value={formValues.receiveNotifications}
                onChange={handleCheckboxChange}
            />

            <input className='btn' type="submit" />
            <input className='btn ml-2' type="reset" />
        </form>
    )
}