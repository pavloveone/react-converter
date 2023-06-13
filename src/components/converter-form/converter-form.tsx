import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import styles from './converter-form.module.css';
import { TValute } from '../../utils/types';

interface IValuteProps {
    valute: TValute[]
}

export const ConverterForm = ({ valute }: IValuteProps):JSX.Element => {

    const charCode = localStorage.getItem('charCode');

    const [amount, setAmount] = useState('1');
    const [currency, setCurrency] = useState(charCode || 'USD');

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
    }
    const sortValute = Object.values(valute).map(item => { 
        return { 
            ID: item.ID, 
            CharCode: item.CharCode, 
            Name: item.Name, 
            Value: item.Value,
            Nominal: item.Nominal 
        }; 
    });

    const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrency(e.target.value);
    }

    const convert = sortValute.map(item => item)
    .filter(element => element.CharCode === currency)

    const convertAmount = (valute: TValute[]) => {
        if(valute.length <= 0) {
            return '';
        }
        const { Value, Nominal } = valute[0];
        return (+amount.replace(/,/g, '.') / +Nominal) * +Value.toFixed(2)
    }

    useEffect(() => {
        localStorage.setItem('charCode', currency);
    }, [currency])

    return(
        <Form className={styles.container}>
            <h2>Конвертер валют</h2>
            <Form.Control value={amount} onChange={handleAmountChange} className={styles.input} />
            <Form.Select value={currency} onChange={handleCurrencyChange}>
            { sortValute.map(valute => (
                <option key={valute.ID} value={valute.CharCode}>{valute.CharCode} ({valute.Name})</option>
            ))}
            </Form.Select>
            <Form.Text className='text-muted'>
                Курс: { convert[0].Nominal } { convert[0].Name } &asymp; { convert[0].Value.toFixed(2) } &#x20bd;
            </Form.Text>
            {convert && (
            <span className={styles.span}><b>{convertAmount(convert)}</b> <span>&#x20bd;</span></span>
            )}
      </Form>
    );
}