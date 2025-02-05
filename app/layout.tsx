'use client';
import SideNav from './ui/menu/sidenav';
import { inter } from '@/app/ui/fonts';
import styles from '@/app/ui/menu/menu.module.css';
import mainStyles from '@/app/ui/main.module.css';
import { Provider } from 'react-redux';
import { store } from './lib/store/store';

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
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
