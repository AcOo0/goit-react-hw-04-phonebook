import { useState } from "react";
import { nanoid } from "nanoid";

import styles from './my-contact-form.module.css'

const INITIAL_STATE = {
    contacts: [],
    filter: '',
    name: '',
    number: ''
};

const MyContactForm = ({ onSubmit }) => {
    const [state, setState] = useState({ ...INITIAL_STATE });

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setState({
            ...state,
            [name]: value,
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...state });
        reset();
    };

    const reset = () => {
        setState({ ...INITIAL_STATE });
    };

    
    const contactNameId = nanoid();
    const contactNumberId = nanoid();
    
    const { name, number } = state;

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formElements}>
                <label htmlFor={contactNameId}>Name</label>
                <input value={name} onChange={handleChange} id={contactNameId} name="name" required type="text" placeholder="Name" />
            </div>
            <div className={styles.formElements}>
                <label htmlFor={contactNumberId}>Number</label>
                <input value={number} onChange={handleChange} id={contactNumberId} name="number" required type="tel" placeholder="Number" /></div>
            <button className={styles.btn} type="submit">Add contact</button>
        </form>
    );
}

export default MyContactForm;