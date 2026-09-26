import { Suspense } from 'react';
import Script from 'next/script';
import { SEO_SCRIPTS, YANDEX_METRIKA_ID } from '@/shared/seo';
import { YandexMetrikaHits } from './components/YandexMetrikaHits';

// Счётчик грузится после гидрации; noscript-пиксель — для браузеров без JS.
// Suspense нужен из-за useSearchParams в YandexMetrikaHits (иначе Next ругается на сборке)
export function YandexMetrika() {
  return (
    <>
      {SEO_SCRIPTS.map((props) => (
        <Script key={props.id} {...props} />
      ))}
      <noscript>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
            style={{ position: 'absolute', left: '-9999px' }}
            alt=""
          />
        </div>
      </noscript>
      <Suspense fallback={null}>
        <YandexMetrikaHits />
      </Suspense>
    </>
  );
}
