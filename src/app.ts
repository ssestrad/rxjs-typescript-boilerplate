import Main from 'view-controllers/main';
import Logger from 'lib/logger';
import 'styles/styles.css';

const logger: Logger = new Logger('Main');
const main: Main = new Main();
const appTag = '#app';
const app: HTMLElement | null = document.querySelector(appTag);
if (!app) {
  logger.error(`Error: Could not boot up app. Entry Tag ${appTag} not found.`);
} else {
  app.appendChild(main.$element);
}
