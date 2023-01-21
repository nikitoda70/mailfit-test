import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Modal from '@/components/Modal.vue'
import '@/assets/styles/_.scss';

const app = createApp(App)

app.component('modal', Modal)

app.use(store).use(router).mount('#app')
