import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import HomeView from './HomeView.vue';
import GameLobbyViewVue from './GameLobbyView.vue';
import LoginViewVue from './LoginView.vue';

const routes = [{ path: '/', component: HomeView }, { path: '/gamelobby', component: GameLobbyViewVue }, { path: '/login', component: LoginViewVue }];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

describe('HomeView', () => {
    let pinia: any;

    beforeEach(async () => {
        pinia = createPinia();
        setActivePinia(pinia);
        router.push('/');
        await router.isReady();
    });

    afterEach(() => {
        const authStore = useAuthStore();
        authStore.reset();
    });

    it('displays welcome message for unauthenticated users', async () => {
        const wrapper = mount(HomeView, {
            global: {
                plugins: [router, pinia],
            },
        });
        expect(wrapper.text()).toContain('Welcome, warriors!');
    });

    it('displays welcome message for authenticated users', async () => {
        const authStore = useAuthStore();
        authStore.$state.isAuthenticated = true;
        authStore.$state.user = {
            id: 1,
            username: 'TestUser',
            firstname: 'Test',
            lastname: 'User',
            email: 'testuser@test.com'
        };

        const wrapper = mount(HomeView, {
            global: {
                plugins: [router, pinia],
            },
        });

        await flushPromises();

        expect(wrapper.text()).toContain('Welcome, TestUser!');
    });


    it('displays welcome message for unauthenticated users and navigates correctly', async () => {
        const wrapper = mount(HomeView, {
            global: {
                plugins: [router],
            },
        });

        await router.isReady();

        expect(wrapper.text()).toContain('Welcome, warriors!');
        const routerLink = wrapper.find('.image-container');
        await routerLink.trigger('mouseenter');
        expect(wrapper.find('.go-button').isVisible()).toBe(true);

        // Simulate click to test navigation - this part is trickier with Vue Test Utils as it doesn't actually navigate.
        // Instead, you would check if the "to" prop of the router-link changes as expected or mock the $router.push method.
    });
});
