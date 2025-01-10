'use client';
// 
// import clsx from 'clsx';
import Link from 'next/link';
// import { usePathname } from 'next/navigation';
import styles from '@/app/ui/menu/navLinks.module.css';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Счета', href: '/accounts' },
  {
    name: 'Расходы',
    href: '/costs',
  },
  { name: 'Доходы', href: '/incomes' },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(`${styles.nav_link}`, {
              [styles.nav_link_actiev]: pathname === link.href,
            })}
          >
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
