'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Nav.module.css';

const NAV_ITEMS = [
  { href: '/home', label: 'Home', icon: '🏠' },
  { href: '/topics', label: 'Topics', icon: '📚' },
  { href: '/mnemonics', label: 'Mnemonics', icon: '🧠' },
  { href: '/practice', label: 'Practice', icon: '✏️' },
  { href: '/dashboard', label: 'Progress', icon: '📊' },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      {NAV_ITEMS.map((item) => {
        const active = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.item} ${active ? styles.active : ''}`}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
