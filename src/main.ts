import { App } from './app';

const app = new App(document.getElementById('app')!);
app.start().catch((e) => {
  console.error(e);
  const l = document.getElementById('loading');
  if (l) l.textContent = `Failed to start: ${e?.message ?? e}`;
});
(window as unknown as { lightcone: App }).lightcone = app;
