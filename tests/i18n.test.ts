import { expect, test } from 'vitest';
import { defaultLang, ui } from '../src/i18n/ui';
import { getLang, useTranslations } from '../src/i18n/utils';

test('getLang keeps supported locales', () => {
	expect(getLang('fr')).toBe('fr');
	expect(getLang('en')).toBe('en');
});

test('getLang falls back to the default language', () => {
	expect(getLang(undefined)).toBe(defaultLang);
	expect(getLang('es')).toBe(defaultLang);
});

test('every translation key exists in every language', () => {
	const expectedKeys = Object.keys(ui[defaultLang]).sort();
	for (const lang of Object.keys(ui) as (keyof typeof ui)[]) {
		expect(Object.keys(ui[lang]).sort(), `keys of "${lang}"`).toEqual(
			expectedKeys,
		);
	}
});

test('useTranslations returns text in the requested language', () => {
	expect(useTranslations('en')('header.goal')).toBe(ui.en['header.goal']);
	expect(useTranslations('fr')('header.goal')).toBe(ui.fr['header.goal']);
});
