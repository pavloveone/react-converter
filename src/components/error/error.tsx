import React, { useState } from 'react';
import styles from './error.module.css';
import { Button, Fade } from 'react-bootstrap';

interface IErrorProps {
    message: string
}

export const Error = ({ message } : IErrorProps):JSX.Element => {
    const [open, setOpen] = useState(false);

    return (
        <div className={styles.container}>
        <h2>Упс!Произошла ошибка...</h2>
            <Button onClick={() => setOpen(!open)} aria-controls="example-fade-text" aria-expanded={open}>
                Показать текст ошибки
            </Button>
            <Fade in={open}>
                <div id="example-fade-text">
                    { message }
                </div>
            </Fade>
        </div>
    );
}