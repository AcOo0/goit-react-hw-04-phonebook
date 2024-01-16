import styles from './filter.module.css'

const Filter = ({onChange}) => 
    <>
    <p className={styles.findInputText}>Find contacts by name</p>
    <input onChange={onChange} className={styles.serchInput} name='filter' placeholder='Search' />
    </>   

export default Filter;