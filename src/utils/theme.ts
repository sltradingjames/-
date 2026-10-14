import { BrandColorTheme } from '../types';

export interface ThemeStyles {
  primaryBg: string;
  primaryHover: string;
  primaryText: string;
  primaryBorder: string;
  accentBg: string;
  accentText: string;
  lightBg: string;
  badgeBg: string;
  gradientHero: string;
}

export const getThemeStyles = (theme: BrandColorTheme): ThemeStyles => {
  switch (theme) {
    case 'safety_orange':
      return {
        primaryBg: 'bg-amber-600',
        primaryHover: 'hover:bg-amber-700',
        primaryText: 'text-amber-600',
        primaryBorder: 'border-amber-600',
        accentBg: 'bg-blue-600',
        accentText: 'text-blue-600',
        lightBg: 'bg-amber-50',
        badgeBg: 'bg-amber-500/10 text-amber-600 border-amber-200',
        gradientHero: 'from-slate-950 via-slate-900 to-amber-950',
      };
    case 'tech_navy':
      return {
        primaryBg: 'bg-slate-800',
        primaryHover: 'hover:bg-slate-900',
        primaryText: 'text-slate-800',
        primaryBorder: 'border-slate-800',
        accentBg: 'bg-sky-600',
        accentText: 'text-sky-600',
        lightBg: 'bg-slate-100',
        badgeBg: 'bg-slate-500/10 text-slate-700 border-slate-300',
        gradientHero: 'from-slate-950 via-slate-900 to-zinc-900',
      };
    case 'emerald_teal':
      return {
        primaryBg: 'bg-teal-600',
        primaryHover: 'hover:bg-teal-700',
        primaryText: 'text-teal-600',
        primaryBorder: 'border-teal-600',
        accentBg: 'bg-sky-600',
        accentText: 'text-sky-600',
        lightBg: 'bg-teal-50',
        badgeBg: 'bg-teal-500/10 text-teal-600 border-teal-200',
        gradientHero: 'from-slate-950 via-slate-900 to-teal-950',
      };
    case 'ocean_blue':
    default:
      return {
        primaryBg: 'bg-blue-600',
        primaryHover: 'hover:bg-blue-700',
        primaryText: 'text-blue-600',
        primaryBorder: 'border-blue-600',
        accentBg: 'bg-amber-500',
        accentText: 'text-amber-600',
        lightBg: 'bg-blue-50',
        badgeBg: 'bg-blue-500/10 text-blue-600 border-blue-200',
        gradientHero: 'from-slate-950 via-slate-900 to-blue-950',
      };
  }
};
