import { ui, defaultLang } from './ui';

export function useTranslations(lang: keyof typeof ui) {
	const localizedUI: Record<string, string> = ui[lang];
	return function t(key: keyof (typeof ui)[typeof defaultLang]) {
		return key in localizedUI ? localizedUI[key] : ui[defaultLang][key];
	};
}

export function getLang(locale: string | undefined): keyof typeof ui {
	if (locale !== undefined && locale in ui) {
		return locale as keyof typeof ui;
	}
	return defaultLang;
}
