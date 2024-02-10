import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import GlobalNav from './GlobalNav.vue';
import HomeView from '../views/HomeView.vue';
import GameLobbyViewVue from '../views/GameLobbyView.vue';
import HowToPlayViewVue from '../views/HowToPlayView.vue';
import CreditsViewVue from '../views/CreditsView.vue';
import BehindTheScenesViewVue from '../views/BehindTheScenesView.vue';
import SettingsViewVue from '../views/SettingsView.vue';
import LoginViewVue from '../views/LoginView.vue';
import RegistrationViewVue from '../views/RegistrationView.vue';


//Create router instance
const routes = [{ path: '/', component: HomeView, name: 'home' }, { path: '/gamelobby', component: GameLobbyViewVue, name: 'gamelobby' }, { path: '/howtoplay', component: HowToPlayViewVue, name: 'howtoplay' }, { path: '/credits', component: CreditsViewVue, name: 'credits' }, { path: '/behindthescenes', component: BehindTheScenesViewVue, name: 'behindthescenes' }, { path: '/settings', component: SettingsViewVue, name: 'settings' }, { path: '/login', component: LoginViewVue, name: 'login' }, { path: '/register', component: RegistrationViewVue, name: 'register' }];

const router = createRouter({
    history: createWebHistory(),
    routes,
});




describe('GlobalNav', () => {

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


    /** TESTS */

    it('displays the logo img element with the correct src', async () => {

        const wrapper = mount(GlobalNav, {
            global: {
                plugins: [pinia, router],
            },
        });

        const logoImg = wrapper.find('img');
        const src = logoImg.attributes('src');

        expect(logoImg.exists()).toBe(true);

        if (src !== undefined) {
            expect(src.toLowerCase()).toContain('logo');
        } else {
            throw new Error('Logo image src attribute is undefined.');
        }
    });


    it('shows correct navigation links when user is not authenticated', async () => {

        const authStore = useAuthStore();
        authStore.$state.isAuthenticated = false;

        const wrapper = mount(GlobalNav, {
            global: {
                plugins: [router, pinia],
            },
        });

        await nextTick();

        expect(wrapper.find('a[href="/play"]').exists()).toBe(false);
        expect(wrapper.find('a[href="/settings"]').exists()).toBe(false);
        expect(wrapper.find('a[href="/logout"]').exists()).toBe(false);

        expect(wrapper.html()).toContain('Login');
        expect(wrapper.html()).toContain('Register');

    });


    it('shows correct navigation links when user is authenticated', async () => {

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

        const wrapper = mount(GlobalNav, {
            global: {
                plugins: [router, pinia],
            },
        });

        await nextTick();

        expect(wrapper.html()).toContain('Play');
        expect(wrapper.html()).toContain('Settings');
        expect(wrapper.html()).toContain('Logout');

        expect(wrapper.html()).not.toContain('Login');
        expect(wrapper.html()).not.toContain('Register');
    });


});


