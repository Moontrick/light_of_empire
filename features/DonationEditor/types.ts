export interface DonationEditorProps {
  // undefined — создание
  id?: number;
}

// Картинка, выбранная в редакторе, но ещё не отправленная (уйдёт после сохранения карточки)
export interface PendingImage {
  key: string;
  dataUrl: string;
  name: string;
}
