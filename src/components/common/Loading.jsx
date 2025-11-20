import styles from './Loading.module.css'

const Loading = ({ text = 'Cargando' }) => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <p className={styles.text}>{text}</p>
    </div>
  )
}

export default Loading
