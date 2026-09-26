export interface DonationEditorProps {
  // undefined — создание
  id?: number;
}

// Картинка, выбранная в редакторе, но ещё не отправленная (уйдёт после сохранения карточки).
// previewUrl — object URL, освобождается при удалении и размонтировании.
export interface PendingImage {
  key: string;
  file: File;
  previewUrl: string;
  name: string;
}
