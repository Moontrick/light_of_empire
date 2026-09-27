import { THEME_STORAGE_KEY } from './themeStore';

export const themeInitScript = `(function(){try{var m=localStorage.getItem('${THEME_STORAGE_KEY}');if(m==='light'||m==='dark')document.documentElement.setAttribute('data-mode',m);}catch(e){}})();`;