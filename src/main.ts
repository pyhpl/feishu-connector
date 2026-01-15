import { createApp } from 'vue';
import App from './App.vue';
import { setupStore } from './store';
import { setupRouter } from './router';
import { setupComponents } from './components';
import './registerServiceWorker';
import './styles/global.scss';

const app = createApp(App);

setupComponents(app);
setupRouter(app);
setupStore(app);

app.mount('#app');

