import { PropsWithChildren } from 'react';

interface ButtonProps {
    className?: string;
    type?: 'button' | 'reset' | 'submit'
    onClick?: () => void;
    backgroundColor: string;
    textColor: string;
    padding: string;
}

export default function Button(props: PropsWithChildren<ButtonProps>) {

    const handleClick = () => {
        if (props.onClick) {
            props.onClick();
        }
    }

    return (
        <button
            className={props.className || ''}
            type={props.type || 'button'}
            onClick={handleClick}
            style={{
                backgroundColor: props.backgroundColor,
                color: props.textColor,
                padding: props.padding
            }}
        >
            {props.children}
        </button>
    )
}
