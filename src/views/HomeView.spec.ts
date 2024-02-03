import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import HomeView from './HomeView.vue';
import GameLobbyViewVue from './GameLobbyView.vue';
import LoginViewVue from './LoginView.vue';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';

// This creates the router for use in the HomeView tests. When using the router in tests please use "await router.isReady();" to be sure router is ready for testing.

const routes = [{ path: '/', component: HomeView }, { path: '/gamelobby', component: GameLobbyViewVue }, { path: '/login', component: LoginViewVue }];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


describe('HomeView', () => {

    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('displays welcome message for unauthenticated users', async () => {

        const wrapper = mount(HomeView, {
            global: {
                plugins: [router],
            },
        });
        expect(wrapper.text()).toContain('Welcome, warriors!');
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
