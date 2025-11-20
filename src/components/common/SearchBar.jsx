import { FiSearch, FiX } from 'react-icons/fi'
import { useState, useEffect, useRef } from 'react'
import styles from './searchBar.module.css'

const SearchBar = ({
  handleSubmitSearch,
  titleMovie,
  setTitleMovie,
  className = '',
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (titleMovie.trim()) {
      handleSubmitSearch(e)
      inputRef.current?.blur()
    }
  }

  const clearSearch = (e) => {
    e.stopPropagation()
    setTitleMovie('')
    inputRef.current?.focus()
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      } else if (e.key === 'Escape') {
        inputRef.current?.blur()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className={`${styles.searchBar} ${className}`}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <div
          className={`${styles.searchInputContainer} ${
            isFocused ? styles.focused : ''
          }`}
        >
          <FiSearch className={styles.searchIcon} />
          <input
            ref={inputRef}
            type="text"
            className={styles.searchInput}
            placeholder="Buscar películas o series..."
            value={titleMovie}
            onChange={(e) => setTitleMovie(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            aria-label="Buscar películas o series"
          />
          {titleMovie && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={clearSearch}
              aria-label="Limpiar búsqueda"
            >
              <FiX />
            </button>
          )}
        </div>
        <button
          type="submit"
          className={styles.searchButton}
          disabled={!titleMovie.trim()}
          aria-label="Buscar"
        >
          <span className={styles.buttonText}>Buscar</span>
          <span className={styles.keyboardShortcut}>
            {navigator.platform.includes('Mac') ? '⌘' : 'Ctrl+'}K
          </span>
        </button>
      </form>
    </div>
  )
}

export default SearchBar
