import { Component } from "react";
import { nanoid } from "nanoid";

import styles from './my-contact-form.module.css'

const INITIAL_STATE = {
    contacts: [],
    filter: '',
    name: '',
    number: ''
};

class MyContactForm extends Component {
    contactNameId = nanoid();
    contactNumberId = nanoid();

    state = {...INITIAL_STATE}

    handleChange = ({target}) => {
        const { name, value } = target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit({ ...this.state });
        this.reset();
    }

    reset() {
        this.setState({ ...INITIAL_STATE });
    }

    render() {
        const { contactNameId, contactNumberId, handleSubmit, handleChange } = this;
        const { name, number } = this.state;

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
        )
    }
}

export default MyContactForm;