import SideNav from './ui/menu/sidenav';
import { inter } from '@/app/ui/fonts';
import styles from '@/app/ui/menu/menu.module.css';
import mainStyles from '@/app/ui/main.module.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={`${inter.className} antialiased ${mainStyles.main}`}>
        <div className={styles.menu}>
          <SideNav />
        </div>
        {children}
      </body>
    </html>
  );
}
