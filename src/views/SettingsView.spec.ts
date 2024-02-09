import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import SettingsView from '../views/SettingsView.vue';
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import { nextTick } from 'vue';
import UserService from '../services/userService';

// Mock the UserService
vi.mock('../services/userService', () => ({
    deleteUser: vi.fn(),
    updateEmail: vi.fn(() => Promise.resolve({ success: true })),
}));

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

        vi.mock('../services/userService', () => ({
            updateUser: vi.fn(() => Promise.resolve({ data: { email: 'newemail@example.com' } })),
        }));

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


    it('should ask for confirmation on account deletion and delete account on confirmation', async () => {
        const wrapper = mount(SettingsView, {
            global: {
                plugins: [router],
            },
        });

        // Simulate user confirming account deletion
        window.confirm = vi.fn(() => true); // Mock confirm dialog to return true
        await wrapper.find('.delete-account-button').trigger('click');

        await nextTick();

        expect(UserService.deleteUser).toHaveBeenCalled();
    });


    it('should toggle music setting', async () => {
        const wrapper = mount(SettingsView, {
            global: {
                plugins: [router, pinia],
            },
        });

        const musicToggle = wrapper.find('#music-toggle');
        expect(musicToggle.element.checked).toBe(true); // Assuming default is true

        await musicToggle.setChecked(false);
        expect(musicToggle.element.checked).toBe(false);
    });


    it('should update email and display success message when email is valid', async () => {
        const wrapper = mount(SettingsView, {
            global: {
                plugins: [router],
            },
        });

        await router.isReady();

        const emailInput = wrapper.find('input[type="email"]');
        const submitButton = wrapper.find('button[type="submit"]');

        // Simulate user input
        emailInput.setValue('newemail@example.com');
        await submitButton.trigger('click');

        await nextTick(); // Wait for DOM updates

        const successMessage = wrapper.find('.success-message');
        expect(successMessage.exists()).toBe(true);
        expect(successMessage.text()).toContain('Email updated successfully!');
        expect(UserService.updateEmail).toHaveBeenCalledWith('newemail@example.com');
    });



});
