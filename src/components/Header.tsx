"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import styles from "./Header.module.css";

export default function Header() {
  const { itemCount } = useCart();
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          Money Press
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          <Link href="/products" className={pathname === "/products" ? styles.active : ""}>
            Shop
          </Link>
          <Link href="/about" className={pathname === "/about" ? styles.active : ""}>
            About
          </Link>
          <Link href="/faq" className={pathname === "/faq" ? styles.active : ""}>
            FAQ
          </Link>
          <Link href="/contact" className={pathname === "/contact" ? styles.active : ""}>
            Contact
          </Link>
        </nav>

        <Link href="/cart" className={styles.cartBtn} aria-label={`Cart — ${itemCount} items`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {itemCount > 0 && (
            <span className={styles.badge} aria-hidden="true">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
