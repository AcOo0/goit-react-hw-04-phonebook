import { Component } from 'react'
import { nanoid } from 'nanoid';

import styles from './my-contacts.module.css'

import MyContactForm from './MyContactForm/MyContactForm';
import MyContactList from './MyContactList/MyContactList';
import Filter from './Filter/Filter';

class MyContacts extends Component {
    state = {
        contacts: [],
            filter: '',
    }

    componentDidMount() {
        const contacts = JSON.parse(localStorage.getItem("my-contacts"));
        if (contacts?.length) {
            this.setState({
                contacts,
            })
        }        
    }

    componentDidUpdate(prevProps, prevState) { 
        const { contacts } = this.state;
        if (prevState.contacts.length !== contacts.length) {
            localStorage.setItem("my-contacts", JSON.stringify(this.state.contacts));    
        }        
    }

    isDublicate({ name, number }) {
        const { contacts } = this.state;
        const normalizedName = name.toLowerCase();
        const normalizedNumber = number.trim();
        
        const dublicate = contacts.find(item => {
            const normalizeCurrentName = item.name.toLowerCase();
            const normalizeCurrentNumber = item.number.trim();
            return (normalizeCurrentName === normalizedName ||  normalizeCurrentNumber === normalizedNumber)
        })

        return Boolean(dublicate);
    }

    addContact = (data) => {
        
        if (this.isDublicate(data)) { 
            return alert(`${data.name} or Number: ${data.number} is already in contacts.`)
        }
        

        this.setState(({ contacts }) => {
            const newContact = {
                id: nanoid(),
                ...data,
            }

            return {
                contacts: [...contacts, newContact]
            }
        })
    }

    deleteContact = (id) => { 
        this.setState(({contacts}) => {
            const newContacts = contacts.filter(item => item.id !== id);

            return {
                contacts: newContacts,
            }
    })        
    }

    changeFilter = ({ target }) => {
        this.setState({
            filter: target.value,
        });
    }

    getFilterdContacts() { 
        const { filter, contacts } = this.state;
        if (!filter) { 
            return contacts;
        }

        const normalizedFilter = filter.toLowerCase();

        const filteredContacts = contacts.filter(({name, number}) => { 
            const normalizedName = name.toLowerCase();

            return (normalizedName.includes(normalizedFilter) || number.includes(normalizedFilter))
        })

        return filteredContacts;
    }
        
    render() { 
        const { addContact, deleteContact, changeFilter } = this;
        const contacts = this.getFilterdContacts()

        return (
            <div className={styles.wrapper}>
                <h1>Phonebook</h1>
                <MyContactForm onSubmit={addContact} />
                <div className={styles.listwrapper}>
                <h2>Contacts</h2>
                <Filter onChange={changeFilter} />
                <MyContactList items={contacts} deleteContact={deleteContact} />
                </div>
            </div>
        )
    }
}

export default MyContacts;