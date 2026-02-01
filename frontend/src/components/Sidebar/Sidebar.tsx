import { memo, useState } from 'react';
import styles from './Sidebar.module.css';

interface SidebarProps {
  isOpen: boolean;
}

function Sidebar({ isOpen }: SidebarProps) {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const toggleSubmenu = (menu: string) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
      <div className={styles.sidebarBrand}>
        <div className={styles.sidebarLogo}>FT</div>
        <div>
          <div className={styles.sidebarBrandName}>FlowTMS</div>
          <div className={styles.sidebarBrandSub}>Operations Suite</div>
        </div>
      </div>
      <div className={styles.sidebarSection}>
        <div className={styles.sidebarSectionTitle}>Operations</div>
        <ul className={styles.sidebarMenu}>
          <li>
            <div
              className={`${styles.sidebarMenuItem} ${styles.sidebarMenuItemActive}`}
              onClick={() => toggleSubmenu('shipments')}
            >
              <span>📦 Shipments</span>
              <span className={styles.sidebarMenuArrow}>
                {expandedMenu === 'shipments' ? '▼' : '▶'}
              </span>
            </div>
            {expandedMenu === 'shipments' && (
              <ul className={styles.sidebarSubmenu}>
                <li className={styles.sidebarSubmenuItem}>All Shipments</li>
                <li className={styles.sidebarSubmenuItem}>In Transit</li>
                <li className={styles.sidebarSubmenuItem}>Delivered</li>
                <li className={styles.sidebarSubmenuItem}>Exceptions</li>
              </ul>
            )}
          </li>
          <li>
            <div
              className={styles.sidebarMenuItem}
              onClick={() => toggleSubmenu('tracking')}
            >
              <span>🧭 Tracking</span>
              <span className={styles.sidebarMenuArrow}>
                {expandedMenu === 'tracking' ? '▼' : '▶'}
              </span>
            </div>
            {expandedMenu === 'tracking' && (
              <ul className={styles.sidebarSubmenu}>
                <li className={styles.sidebarSubmenuItem}>Live Map</li>
                <li className={styles.sidebarSubmenuItem}>ETA Updates</li>
                <li className={styles.sidebarSubmenuItem}>Route History</li>
              </ul>
            )}
          </li>
          <li className={styles.sidebarMenuItem}>🧾 Orders</li>
        </ul>
      </div>
      <div className={styles.sidebarSection}>
        <div className={styles.sidebarSectionTitle}>Management</div>
        <ul className={styles.sidebarMenu}>
          <li>
            <div
              className={styles.sidebarMenuItem}
              onClick={() => toggleSubmenu('carriers')}
            >
              <span>🚚 Carriers</span>
              <span className={styles.sidebarMenuArrow}>
                {expandedMenu === 'carriers' ? '▼' : '▶'}
              </span>
            </div>
            {expandedMenu === 'carriers' && (
              <ul className={styles.sidebarSubmenu}>
                <li className={styles.sidebarSubmenuItem}>Active Carriers</li>
                <li className={styles.sidebarSubmenuItem}>Onboarding</li>
                <li className={styles.sidebarSubmenuItem}>Performance</li>
              </ul>
            )}
          </li>
          <li className={styles.sidebarMenuItem}>🏢 Shippers</li>
          <li className={styles.sidebarMenuItem}>👥 Drivers</li>
        </ul>
      </div>
      <div className={styles.sidebarSection}>
        <div className={styles.sidebarSectionTitle}>Insights</div>
        <ul className={styles.sidebarMenu}>
          <li>
            <div
              className={styles.sidebarMenuItem}
              onClick={() => toggleSubmenu('analytics')}
            >
              <span>📈 Analytics</span>
              <span className={styles.sidebarMenuArrow}>
                {expandedMenu === 'analytics' ? '▼' : '▶'}
              </span>
            </div>
            {expandedMenu === 'analytics' && (
              <ul className={styles.sidebarSubmenu}>
                <li className={styles.sidebarSubmenuItem}>Dashboard</li>
                <li className={styles.sidebarSubmenuItem}>KPI Reports</li>
                <li className={styles.sidebarSubmenuItem}>Trends</li>
              </ul>
            )}
          </li>
          <li className={styles.sidebarMenuItem}>🧩 Performance</li>
          <li className={styles.sidebarMenuItem}>💼 Financials</li>
        </ul>
      </div>
      <div className={styles.sidebarFooter}>
        <div className={styles.sidebarFooterCard}>
          <div className={styles.sidebarFooterTitle}>Need help?</div>
          <div className={styles.sidebarFooterText}>Support is live 24/7</div>
          <button className={styles.sidebarFooterBtn}>Contact support</button>
        </div>
      </div>
    </aside>
  );
}

export default memo(Sidebar);
