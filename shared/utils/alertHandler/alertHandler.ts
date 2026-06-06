import { getError } from '../getError';
import { uuid } from '../uuid';
import { AddAlert, AlertChangeListener, AlertMessage } from './type';

class AlertHandler {
  private alerts: AlertMessage[] = [];
  private alertTimers: Map<string, NodeJS.Timeout> = new Map();
  private delay = 7000;
  private listeners: AlertChangeListener[] = [];

  public getAlerts() {
    return this.alerts;
  }

  public addAlert({
    alert,
    status = 'error',
    defaultText = 'Ошибка сервера',
    subTitle,
  }: AddAlert) {
    const id = uuid();
    const message = getError(alert);

    this.alerts = [
      ...this.alerts,
      { id, message, status, defaultText, subTitle },
    ];
    this.notifyListeners();

    const timerId = setTimeout(() => {
      this.removeAlertById(id);
    }, this.delay);
    this.alertTimers.set(id, timerId);
  }

  public removeAlertById(id: string) {
    this.alerts = this.alerts.filter((alert) => alert.id !== id);
    const timerId = this.alertTimers.get(id);
    if (timerId) {
      clearTimeout(timerId);
      this.alertTimers.delete(id);
    }
    this.notifyListeners();
  }

  public clearAlerts() {
    this.alerts = [];
    this.alertTimers.forEach((timerId) => clearTimeout(timerId));
    this.alertTimers.clear();
    this.notifyListeners();
  }

  public subscribe(listener: AlertChangeListener) {
    this.listeners.push(listener);
  }

  public unsubscribe(listener: AlertChangeListener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener());
  }
}

export const alertHandler = new AlertHandler();
export type AlertHandlerType = typeof alertHandler;
