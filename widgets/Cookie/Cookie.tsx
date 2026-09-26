'use client';
import { CookieSection } from "./ui/CookieSection";
import styles from './Cookie.module.scss';
import { useState, useMemo } from "react";
import { SECTIONS, COOKIES } from "./constants";

export function Cookie() {
  const [openId, setOpenId] = useState<string | null>('general');

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  const toc = useMemo(
    () => (
      <nav className={styles.toc} aria-label="Содержание">
        <div className={styles.tocTitle}>Содержание</div>
        <ul className={styles.tocList}>
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setOpenId(s.id);
                  document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    ),
    [],
  );

  return (
    <div className={styles.root}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>Cookie политика</span>
          <h1 className={styles.title}>Политика использования Cookie</h1>
          <p className={styles.lead}>
            Мы используем файлы cookie, чтобы сайт работал корректно, был удобным и полезным.
            Ниже — подробно о том, какие cookie мы собираем, зачем и как вы можете ими управлять.
          </p>
        </div>
      </header>

      <main className={styles.content}>
        <div className={styles.layout}>
          <aside className={styles.sidebar}>{toc}</aside>

          <div className={styles.introSections}>
            {/* 1. Общие положения */}
            <CookieSection id="general" title="1. Общие положения" openId={openId} onToggle={toggle}>
              <p>
                Настоящая Политика использования файлов Cookie (далее — «Политика») описывает,
                как <b>Canto Projects</b> (далее — «мы», «нас», «наш») использует файлы cookie
                и аналогичные технологии на сайте <b>thelightofempire.com</b> (далее — «Сайт»).
              </p>
              <p>
                Используя Сайт, вы соглашаетесь с использованием файлов cookie в соответствии
                с настоящей Политикой. Если вы не согласны — отключите cookie в настройках браузера
                или воздержитесь от использования Сайта.
              </p>
            </CookieSection>

            {/* 2. Что такое Cookie */}
            <CookieSection id="what" title="2. Что такое файлы Cookie" openId={openId} onToggle={toggle}>
              <p>
                Файлы cookie — это небольшие текстовые файлы, которые сохраняются на вашем устройстве
                при посещении веб-сайтов. Они позволяют Сайту запоминать ваши действия и предпочтения
                (язык, размер шрифта и другие настройки) в течение определённого времени.
              </p>
              <p>
                Помимо cookie, мы можем использовать аналогичные технологии: веб-маяки,
                пиксельные теги, <code>localStorage</code> и другие.
              </p>
            </CookieSection>

            {/* 3. Типы Cookie */}
            <CookieSection id="types" title="3. Какие файлы Cookie мы используем" openId={openId} onToggle={toggle}>
              <h4>3.1. По сроку хранения</h4>
              <ul>
                <li><b>Сессионные cookie</b> — временные, удаляются после закрытия браузера.</li>
                <li><b>Постоянные cookie</b> — сохраняются на устройстве определённый срок или до удаления.</li>
              </ul>

              <h4>3.2. По назначению</h4>
              <div className={styles.cards}>
                <article className={styles.card}>
                  <div className={styles.cardBadge}>Строго необходимые</div>
                  <p>Обеспечивают базовое функционирование: навигацию, доступ к защищённым разделам, работу форм. Без них Сайт не работает.</p>
                </article>
                <article className={styles.card}>
                  <div className={styles.cardBadge}>Функциональные</div>
                  <p>Запоминают ваши предпочтения: язык, регион, настройки отображения, данные авторизации.</p>
                </article>
                <article className={styles.card}>
                  <div className={styles.cardBadge}>Аналитические</div>
                  <p>Помогают понять, как посетители взаимодействуют с Сайтом. Данные собираются в обезличенном виде.</p>
                </article>
                <article className={styles.card}>
                  <div className={styles.cardBadge}>Маркетинговые</div>
                  <p>Используются для показа релевантной рекламы и оценки эффективности рекламных кампаний.</p>
                </article>
              </div>
            </CookieSection>

            {/* 4. Таблица cookie */}
            <CookieSection id="list" title="4. Конкретные файлы Cookie" openId={openId} onToggle={toggle}>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Название</th>
                      <th>Тип</th>
                      <th>Назначение</th>
                      <th>Срок хранения</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COOKIES.map((c) => (
                      <tr key={c.name}>
                        <td><code>{c.name}</code></td>
                        <td><span className={styles.tag}>{c.type}</span></td>
                        <td>{c.purpose}</td>
                        <td>{c.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={styles.hint}>* Таблица может быть дополнена — в зависимости от используемых сервисов.</p>
            </CookieSection>

            {/* 5. Управление */}
            <CookieSection id="manage" title="5. Управление файлами Cookie" openId={openId} onToggle={toggle}>
              <p>Вы можете управлять файлами cookie следующими способами:</p>
              <ol>
                <li>
                  <b>Настройки браузера.</b> Большинство браузеров позволяют просматривать, удалять и блокировать cookie:
                  <ul>
                    <li>Google Chrome: Настройки → Конфиденциальность и безопасность → Файлы cookie</li>
                    <li>Mozilla Firefox: Настройки → Приватность и защита</li>
                    <li>Safari: Настройки → Конфиденциальность</li>
                    <li>Microsoft Edge: Настройки → Файлы cookie и разрешения сайта</li>
                  </ul>
                </li>
                <li><b>Настройки на Сайте.</b> При первом посещении вы можете принять или настроить категории cookie.</li>
                <li>
                  <b>Отказ от аналитических и рекламных cookie.</b> Например, через{' '}
                  <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
                    Google Analytics Opt-out
                  </a>.
                </li>
              </ol>
              <p className={styles.warning}>
                Отключение строго необходимых cookie может привести к нарушению работы Сайта.
              </p>
            </CookieSection>

            {/* 6. Третьи лица */}
            <CookieSection id="third" title="6. Cookie третьих лиц" openId={openId} onToggle={toggle}>
              <p>На Сайте могут использоваться cookie сторонних сервисов:</p>
              <ul>
                <li>Google Analytics, Google Ads</li>
                <li>Яндекс.Метрика, Яндекс.Директ</li>
                <li>VK Pixel, Facebook Pixel</li>
                <li>Встраиваемые виджеты (YouTube, карты, кнопки соцсетей)</li>
              </ul>
              <p>Мы не контролируем cookie третьих лиц. Рекомендуем ознакомиться с их политиками конфиденциальности.</p>
            </CookieSection>

            {/* 7. Правовые основания */}
            <CookieSection id="legal" title="7. Правовые основания" openId={openId} onToggle={toggle}>
              <p>Обработка персональных данных с использованием cookie осуществляется на основании:</p>
              <ul>
                <li>вашего согласия (ст. 6 ФЗ № 152-ФЗ «О персональных данных»);</li>
                <li>законного интереса в обеспечении работы Сайта;</li>
                <li>исполнения договора (при использовании функциональных возможностей).</li>
              </ul>
              <p>Для пользователей из ЕС — в соответствии с Регламентом (ЕС) 2016/679 (GDPR).</p>
            </CookieSection>

            {/* 8. Передача данных */}
            <CookieSection id="share" title="8. Передача данных" openId={openId} onToggle={toggle}>
              <p>Данные, собранные с помощью cookie, могут передаваться:</p>
              <ul>
                <li>поставщикам аналитических и рекламных услуг;</li>
                <li>хостинг-провайдерам;</li>
                <li>иным третьим лицам в случаях, предусмотренных законом.</li>
              </ul>
            </CookieSection>

            {/* 9. Изменения */}
            <CookieSection id="changes" title="9. Изменения в Политике" openId={openId} onToggle={toggle}>
              <p>
                Мы вправе изменять настоящую Политику. Актуальная версия всегда размещена на Сайте
                с указанием даты обновления.
              </p>
            </CookieSection>

            {/* 10. Контакты */}
            <CookieSection id="contacts" title="10. Контакты" openId={openId} onToggle={toggle}>
              <ul className={styles.contacts}>
                <li><span>VK:</span> <a href="https://vk.ru/thelightofempire">https://vk.ru/thelightofempire</a></li>
                {/* <li><span>Телефон:</span> <a href="tel:+70000000000">+7 (000) 000-00-00</a></li> */}
                {/* <li><span>Адрес:</span> г. Москва, ул. Примерная, д. 1</li> */}
              </ul>
            </CookieSection>

            <div className={styles.consent}>
              <b>Согласие на использование cookie.</b> Продолжая использовать наш Сайт, вы подтверждаете,
              что ознакомлены с настоящей Политикой и согласны с использованием файлов cookie в описанных целях.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
