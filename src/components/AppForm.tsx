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

export default function AppForm(props: AppFormProps) {
    const [formValues, setFormValues] = useState<FormValues>({
        name: '',
        surname: '',
        email: '',
        age: '',
        gender: '',
        favoriteColor: '#55aaFF',
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
            />
            <Input
                id='surname'
                name='surname'
                type='text'
                label='Surname'
                value={formValues.surname}
                onChange={handleInputChange}
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
            />
            <Input
                id='favoriteColor'
                name='favoriteColor'
                type='color'
                label='Favorite Color'
                value={formValues.favoriteColor}
                onChange={handleInputChange}
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