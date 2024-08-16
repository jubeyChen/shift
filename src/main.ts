import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router'; // Import the 'router' module
import './assets/css/main.scss';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.mount('#app');
