import { memo } from 'react';
import { useAuth } from '../../hooks/useAuth';
import styles from './Navbar.module.css';

interface NavbarProps {
  onMenuToggle: () => void;
}

function Navbar({ onMenuToggle }: NavbarProps) {
  const { user, logout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLeft}>
        <button className={styles.navbarMenuBtn} onClick={onMenuToggle}>
          ☰
        </button>
        <div className={styles.navbarLogo}>FlowTMS</div>
        <div className={styles.navbarWorkspace}>Command Center</div>
      </div>
      <div className={styles.navbarSearch}>
        <input
          className={styles.navbarSearchInput}
          placeholder="Search loads, carriers, lanes..."
        />
      </div>
      <div className={styles.navbarRight}>
        <button className={styles.navbarAction}>New Load</button>
        <button className={styles.navbarIconBtn} aria-label="Notifications">
          🔔
          <span className={styles.navbarIconBadge}>2</span>
        </button>
        <div className={styles.navbarUser}>
          <div>
            <div className={styles.navbarUserName}>{user?.username}</div>
            <div className={styles.navbarUserRole}>{user?.role}</div>
          </div>
        </div>
        <button className={styles.navbarLogout} onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default memo(Navbar);
