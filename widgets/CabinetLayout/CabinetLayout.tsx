import classNames from 'classnames';
import { CabinetSidebar } from './components/CabinetSidebar';
import type { CabinetLayoutProps } from './types';
import styles from './CabinetLayout.module.scss';

export function CabinetLayout({ children, wide = false }: CabinetLayoutProps) {
  return (
    <div className={styles.shell}>
      <CabinetSidebar />
      <main className={styles.main}>
        <div className={classNames(styles.mainInner, { [styles.wide]: wide })}>
          {children}
        </div>
      </main>
    </div>
  );
}
