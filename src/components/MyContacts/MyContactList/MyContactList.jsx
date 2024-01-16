import styles from "./my-contact-list.module.css"

const MyContactList = ({ items, deleteContact }) => { 
    const elements = items.map(({ id, name, number }) =>
        <li className={styles.list} key={id}>{name}: {number} <button onClick={() => deleteContact(id)} className={styles.btn} type="button">Delete</button> </li>)
    
    return (
            <ul>
                {elements}
            </ul>
    )
}

export default MyContactList;