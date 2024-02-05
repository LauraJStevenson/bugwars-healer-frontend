import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import SettingsView from '../views/SettingsView.vue';
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import { nextTick } from 'vue';



// This creates the router with specific routes needed for testing
const routes = [{ path: '/login', component: LoginView, name: 'login' }, { path: '/', component: HomeView, name: 'home' }];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


describe('SettingsView', () => {

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
       * Tests for the SettingsView component.
       */

    it('should display the current user information', async () => {

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

        const wrapper = mount(SettingsView, {
            global: {
                plugins: [router, pinia],
            },
        });

        const username = wrapper.find('.current-username span');
        const email = wrapper.find('.current-email span');
        const name = wrapper.find('.current-name span');

        expect(username.text()).toContain('TestUser');
        expect(email.text()).toContain('testuser@test.com');
        expect(name.text()).toContain('Test User');
    });

    it('should show validation error if email format is incorrect when updating email', async () => {

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

        const wrapper = mount(SettingsView, {
            global: {
                plugins: [router, pinia],
            },
        });

        const newEmailInput = wrapper.find('#change-email');
        await newEmailInput.setValue('invalidemail');
        const submitButton = wrapper.find('.change-properties-div .form-group .submit-btn');
        await submitButton.trigger('click');

        await nextTick();

        const errorMessage = wrapper.find('.messages .error-message');
        expect(errorMessage.text()).toContain('Please enter a valid email address.');
    });
});
