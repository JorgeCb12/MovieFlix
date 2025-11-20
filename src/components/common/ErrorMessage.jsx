import styles from '../common/ErrorMessage.module.css'

const ErrorMessage = ({ message }) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>⚠️</div>
      <p className={styles.text}>{message}</p>
    </div>
  )
}

export default ErrorMessage
