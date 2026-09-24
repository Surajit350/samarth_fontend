import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type FontSizeLevel = 'small' | 'normal' | 'large';
export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class AccessibilityService {
  private readonly THEME_KEY = 'app_theme';
  private readonly FONT_SIZE_KEY = 'app_font_size';

  private currentTheme: Theme = 'light';
  private currentFontSize: FontSizeLevel = 'normal';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.initTheme();
      this.initFontSize();
    }
  }

  // --- THEME ---

  private initTheme() {
    const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme;
    if (savedTheme === 'dark' || savedTheme === 'light') {
      this.currentTheme = savedTheme;
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.currentTheme = prefersDark ? 'dark' : 'light';
    }
    this.applyTheme(this.currentTheme);
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(this.currentTheme);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.THEME_KEY, this.currentTheme);
    }
  }

  setTheme(theme: Theme) {
    this.currentTheme = theme;
    this.applyTheme(this.currentTheme);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.THEME_KEY, this.currentTheme);
    }
  }

  getTheme(): Theme {
    return this.currentTheme;
  }

  private applyTheme(theme: Theme) {
    if (isPlatformBrowser(this.platformId)) {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }

  // --- FONT SIZE ---

  private initFontSize() {
    const savedSize = localStorage.getItem(this.FONT_SIZE_KEY) as FontSizeLevel;
    if (savedSize === 'small' || savedSize === 'normal' || savedSize === 'large') {
      this.currentFontSize = savedSize;
    }
    this.applyFontSize(this.currentFontSize);
  }

  setFontSize(level: FontSizeLevel) {
    this.currentFontSize = level;
    this.applyFontSize(this.currentFontSize);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.FONT_SIZE_KEY, this.currentFontSize);
    }
  }

  private applyFontSize(level: FontSizeLevel) {
    if (isPlatformBrowser(this.platformId)) {
      let sizePx = '16px'; // default normal
      if (level === 'small') sizePx = '14px';
      if (level === 'large') sizePx = '18px';
      
      document.documentElement.style.fontSize = sizePx;
    }
  }
}
