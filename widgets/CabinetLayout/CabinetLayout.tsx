import { CabinetSidebar } from './components/CabinetSidebar';
import { CabinetContent } from './components/CabinetContent';
import type { CabinetLayoutProps } from './types';
import styles from './CabinetLayout.module.scss';

export function CabinetLayout({ children }: CabinetLayoutProps) {
  return (
    <div className={styles.shell}>
      <CabinetSidebar />
      <main className={styles.main}>
        <CabinetContent>{children}</CabinetContent>
      </main>
    </div>
  );
}
