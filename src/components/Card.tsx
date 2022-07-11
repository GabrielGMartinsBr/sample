import { PropsWithChildren } from 'react';

interface CardProps {
    backgroundColor?: string;
}

export default function Card(props: PropsWithChildren<CardProps>) {
    const bgColor = props.backgroundColor;

    return (
        <div className="Card"
            style={{
                backgroundColor: bgColor
            }}>
            {props.children}
        </div>
    )
}