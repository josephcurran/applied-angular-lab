import { effect } from '@angular/core';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

type AvailableThemes = 'synthwave' | 'cyberpunk' | 'aqua';

// Higher-Order Function
// a function that returns a function and or takes functions as an argument
export const PrefsStore = signalStore(
  withState({
    theme: 'synthwave' as AvailableThemes,
  }),
  withMethods((store) => {
    return {
      setTheme: (theme: AvailableThemes) => patchState(store, { theme }),
    };
  }),
  withHooks({
    onInit(store) {
      console.log('The Prefs Store Created');
      const savedValue = localStorage.getItem('theme') as AvailableThemes &
        null;
      if (savedValue !== null) {
        store.setTheme(savedValue);
      }

      effect(() => {
        const theme = store.theme();
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
      });
    },
    onDestroy() {
      console.log('The prefs store is destroyed');
    },
  }),
);
