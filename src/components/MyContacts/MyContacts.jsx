import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid';

import styles from './my-contacts.module.css'

import MyContactForm from './MyContactForm/MyContactForm';
import MyContactList from './MyContactList/MyContactList';
import Filter from './Filter/Filter';

const MyContacts = () => {
    const [contacts, setContacts] = useState(() => {
        const data = JSON.parse(localStorage.getItem("my-contacts"));
        return data || [];
    });
    const [filter, setFilter] = useState("");

    useEffect(() => {
        localStorage.setItem("my-contacts", JSON.stringify(contacts));
    }, [contacts]);

    const isDublicate = ({ name, number }) => {
        const normalizedName = name.toLowerCase();
        const normalizedNumber = number.trim();
        
        const dublicate = contacts.find(item => {
            const normalizeCurrentName = item.name.toLowerCase();
            const normalizeCurrentNumber = item.number.trim();
            return (normalizeCurrentName === normalizedName || normalizeCurrentNumber === normalizedNumber)
        })

        return Boolean(dublicate);
    };

    const addContact = (data) => {
        
        if (isDublicate(data)) {
            return alert(`${data.name} or Number: ${data.number} is already in contacts.`)
        }
        
        setContacts(prevContacts => {
            const newContact = {
                id: nanoid(),
                ...data,
            };

            return [...prevContacts, newContact];
        })
    };

    const deleteContact = (id) => {
        setContacts(prevContacts => prevContacts.filter(item => item.id !== id))
    };

    const changeFilter = ({ target }) => setFilter(target.value);

    const getFilterdContacts = () => {
        if (!filter) {
            return contacts;
        }

        const normalizedFilter = filter.toLowerCase();

        const filteredContacts = contacts.filter(({ name, number }) => {
            const normalizedName = name.toLowerCase();

            return (normalizedName.includes(normalizedFilter) || number.includes(normalizedFilter))
        })

        return filteredContacts;
    };

    const items = getFilterdContacts();

    return (
        <div className={styles.wrapper}>
            <h1>Phonebook</h1>
            <MyContactForm onSubmit={addContact} />
            <div className={styles.listwrapper}>
                <h2>Contacts</h2>
                <Filter onChange={changeFilter} />
                <MyContactList items={items} deleteContact={deleteContact} />
            </div>
        </div>
    );
}

export default MyContacts;