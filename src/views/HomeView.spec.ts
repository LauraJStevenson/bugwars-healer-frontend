import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import HomeView from './HomeView.vue';
import GameLobbyViewVue from './GameLobbyView.vue';
import LoginViewVue from './LoginView.vue';


// This creates the router with specific routes needed for testing
const routes = [{ path: '/', component: HomeView, name: 'home' }, { path: '/gamelobby', component: GameLobbyViewVue, name: 'gamelobby' }, { path: '/login', component: LoginViewVue, name: 'login' }];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

/**
   * Tests for the HomeView component.
   */

describe('HomeView', () => {

    let pinia: any;

    // This creates the store and ensures the router is set and ready before testing begins.
    beforeEach(async () => {
        pinia = createPinia();
        setActivePinia(pinia);
        router.push('/');
        await router.isReady();
    });

    // This resets the auth store after test is complete.
    afterEach(() => {
        const authStore = useAuthStore();
        authStore.reset();
    });

    /**
   * Tests
   */

    it('displays welcome message for unauthenticated users', async () => {
        const authStore = useAuthStore();
        authStore.$state.isAuthenticated = false;

        const wrapper = mount(HomeView, {
            global: {
                plugins: [pinia, router],
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
            email: 'testuser@test.com',
            scripts: []
        };

        const wrapper = mount(HomeView, {
            global: {
                plugins: [pinia, router],
            },
        });

        expect(wrapper.text()).toContain('Welcome, TestUser!');
    });


    it('displays paragraph element', async () => {
        const wrapper = mount(HomeView, {
            global: {
                plugins: [pinia, router],
            },
        });

        const paragraphs = wrapper.findAll('p');
        expect(paragraphs.length).toBe(1);
    });


    it('go-button displays on mouseenter', async () => {

        const authStore = useAuthStore();
        authStore.$state.isAuthenticated = false;

        const wrapper = mount(HomeView, {
            global: {
                plugins: [pinia, router],
            },
        });
        const routerLink = wrapper.find('.image-container');
        await routerLink.trigger('mouseenter');
        expect(wrapper.find('.go-button').isVisible()).toBe(true);
    });


    it('go-button disappears on mouseleave', async () => {

        const authStore = useAuthStore();
        authStore.$state.isAuthenticated = false;

        const wrapper = mount(HomeView, {
            global: {
                plugins: [pinia, router],
            },
        });
        const routerLink = wrapper.find('.image-container');
        await routerLink.trigger('mouseleave');
        expect(wrapper.find('.go-button').exists()).toBe(false);
    });


    it('displays routerlink and go-button with correct route for unauthenticated user', async () => {

        const authStore = useAuthStore();
        authStore.$state.isAuthenticated = false;

        const wrapper = mount(HomeView, {
            global: {
                plugins: [router, pinia],
            },
        });

        const routerLink = wrapper.findComponent({ name: 'RouterLink' });
        const toProp = routerLink.props('to');
        expect(toProp).toBe('/login');
    });


    it('displays routerlink and go-button with correct route for authenticated user', async () => {

        const authStore = useAuthStore();
        authStore.$state.isAuthenticated = true;

        const wrapper = mount(HomeView, {
            global: {
                plugins: [router, pinia],
            },
        });

        const routerLink = wrapper.findComponent({ name: 'RouterLink' });
        const toProp = routerLink.props('to');
        expect(toProp).toBe('/gamelobby');

    });
});


