// components/Nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./nav.module.css";

export default function Nav() {
  const pathname = usePathname();
  const [archiveOpen, setArchiveOpen] = useState(false);

  const isActive = (href: string) => pathname === href;
  const isArchiveSection = pathname.startsWith("/archive");

  return (
    <nav className={styles.wrapper}>
      <Link href="">
        <div
          className={`${styles.entry} ${isActive("/") ? styles.active : ""}`}
        >
          (search)
        </div>
      </Link>

      <div className={styles.archiveWrapper}>
        <div
          onClick={() => setArchiveOpen((prev) => !prev)}
          className={`${styles.entry} ${isArchiveSection ? styles.active : ""}`}
        >
          archive
        </div>

        {archiveOpen && (
          <div className={styles.submenu}>
            <Link href="/archive/index">
              <div
                className={`${styles.entry} ${
                  isActive("/archive/index") ? styles.active : ""
                }`}
                onClick={() => setArchiveOpen(false)}
              >
                index
              </div>
            </Link>
            <Link href="/archive/catalogue">
              <div
                className={`${styles.entry} ${
                  isActive("/archive/catalogue") ? styles.active : ""
                }`}
                onClick={() => setArchiveOpen(false)}
              >
                catalogue
              </div>
            </Link>
            <Link href="/archive/field">
              <div
                className={`${styles.entry} ${
                  isActive("/archive/field") ? styles.active : ""
                }`}
                onClick={() => setArchiveOpen(false)}
              >
                field
              </div>
            </Link>
          </div>
        )}
      </div>

      <Link href="/relational-maps">
        <div
          className={`${styles.entry} ${
            isActive("/relational-maps") ? styles.active : ""
          }`}
        >
          relational maps
        </div>
      </Link>

      <Link href="/about">
        <div
          className={`${styles.entry} ${
            isActive("/about") ? styles.active : ""
          }`}
        >
          about
        </div>
      </Link>
    </nav>
  );
}
