import dayjs from 'dayjs';
import 'dayjs/locale/ru';

// antd DatePicker берёт названия месяцев/дней из локали dayjs — подключаем русскую один раз
// eslint-disable-next-line import/no-named-as-default-member -- locale() как метод default-экспорта: так его вызывает и сам antd
dayjs.locale('ru');

export { dayjs };
export type { Dayjs } from 'dayjs';
