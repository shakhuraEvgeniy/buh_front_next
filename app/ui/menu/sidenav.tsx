import Link from 'next/link';
import NavLinks from './navLinks';
import styles from '@/app/ui/menu/navLinks.module.css';


export default function SideNav() {
  return (
    <div className={styles.sidenav_2}>
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
      </Link>
      <div className={styles.sidenav}>
        <NavLinks />
      </div>
    </div>
  );
}
