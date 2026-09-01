import { getError } from '../getError';
import { uuid } from '../uuid';
import { AddAlert, AlertListener, AlertMessage } from './type';

// Показ и таймеры — на antd notification в AlertService;
// здесь только доставка событий из любого кода в подписчика
class AlertHandler {
  private listeners: AlertListener[] = [];
  private pending: AlertMessage[] = [];

  public addAlert({
    alert,
    status = 'error',
    defaultText = 'Ошибка сервера',
    subTitle,
  }: AddAlert) {
    const item: AlertMessage = {
      id: uuid(),
      message: getError(alert) ?? defaultText,
      status,
      subTitle,
    };

    // До монтирования AlertService копим алерты, чтобы не потерять их
    if (this.listeners.length === 0) {
      this.pending.push(item);
      return;
    }

    this.listeners.forEach((listener) => listener(item));
  }

  public subscribe(listener: AlertListener) {
    this.listeners.push(listener);
    this.pending.forEach((item) => listener(item));
    this.pending = [];
  }

  public unsubscribe(listener: AlertListener) {
    this.listeners = this.listeners.filter((item) => item !== listener);
  }
}

export const alertHandler = new AlertHandler();
