import { Menu, Search, User, Settings } from 'lucide-react';
import styles from '../../styles/dashboard.module.css';

export default function HeaderDashBoard({ onMenuClick, onSearchClick, onProfileClick }) {
  return (
    <header className={styles.header}>
      <div className={styles['header-container']}>
        <div className={styles['header-content']}>
          <div className={styles['header-left']}>
            <button
              onClick={onMenuClick}
              className={styles['header-button']}
            >
              <Menu />
            </button>
            <h1 className={styles['header-title']}>PeTAG</h1>
          </div>
          <div className={styles['header-right']}>
            <button
              onClick={onSearchClick}
              className={styles['header-button-round']}
            >
              <Search />
            </button>
            <button
              onClick={onProfileClick}
              className={styles['header-button-round']}
            >
              <User />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}