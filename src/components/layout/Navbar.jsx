import { NavLink } from 'react-router-dom'
import styles from './navbar.module.css'
import { FiHome, FiHeart } from 'react-icons/fi'

const Navbar = () => {
  return (
    <nav>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <img src="./logo.png" alt="Logo" />
        </div>
        <div className={styles.navLinks}>
          <NavLink className={styles.navLink} to="/">
            <FiHome className={styles.icon} /> Inicio
          </NavLink>
          <NavLink className={styles.navLink} to="/favorites">
            <FiHeart className={styles.icon} /> Favoritos
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
