'use client';
import Link from 'next/link';
import styles from '@/app/ui/menu/navLinks.module.css';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Счета', href: '/accounts' },
  {
    name: 'Расходы',
    href: '/costs',
  },
  { name: 'Доходы', href: '/incomes' },
  { name: 'Добавить расход', href: '/addItem' },
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
