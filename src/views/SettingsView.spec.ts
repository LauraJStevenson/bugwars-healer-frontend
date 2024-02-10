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


// Create router instance
const routes = [{ path: '/login', component: LoginView, name: 'login' }, { path: '/', component: HomeView, name: 'home' }];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Mock Axios
vi.mock('axios', () => {
    const mockAxiosInstance = {
        get: vi.fn(() => Promise.resolve({ data: {} })),
        post: vi.fn(() => Promise.resolve({ status: 200, data: {} })),
        put: vi.fn(() => Promise.resolve({ data: {} })),
        delete: vi.fn(() => Promise.resolve({ data: {} })),
    };

    return {
        default: mockAxiosInstance,
        ...mockAxiosInstance,
    };
});

// Mock makeRequest
vi.mock('../utils/makeRequest', () => ({
    makeRequest: vi.fn((requestCallback, options) => {
        const simulatedAxiosResponse = requestCallback();
        return simulatedAxiosResponse.then((response: { status: any; data: any; }) => {
            if (options.successStatuses.includes(response.status)) {
                return {
                    type: 'success',
                    status: response.status,
                    data: response.data,
                };
            }
        });
    }),
}));

// Mock ScriptService
vi.mock('../services/scriptService', () => {
    const mockScripts = [
        {
            id: 1,
            name: 'Test Script 1',
            raw: 'raw data',
            bytecode: 'bytecode data',
            isBytecodeValid: true,
        },
    ];
    return {
        default: {
            getScriptsByUserId: vi.fn().mockResolvedValue(mockScripts),
            getScript: vi.fn(),
            createScript: vi.fn(),
            updateScript: vi.fn(),
            deleteScript: vi.fn(),
        },
    };
});

// Mock UserService
vi.mock('../services/userService', () => {
    return {
        default: {
            getUser: vi.fn(),
            updateUser: vi.fn(),
            deleteUser: vi.fn(),
            updatePassword: vi.fn(),
            updateEmail: vi.fn(),
            updateFirstName: vi.fn(),
            updateLastName: vi.fn(),
        },
    };
});




describe('SettingsView', () => {

    let pinia: any;

    beforeEach(async () => {

        vi.clearAllMocks();

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

    });

    afterEach(() => {
        const authStore = useAuthStore();
        authStore.reset();
    });


    /** TESTS */

    it('should display the current user username, email, name information', async () => {

        const wrapper = mount(SettingsView, {
            global: {
                plugins: [router, pinia],
                stubs: {
                    RouterLink: true
                },
            },
        });

        const username = wrapper.find('.current-username span');
        const email = wrapper.find('.current-email span');
        const name = wrapper.find('.current-name span');

        expect(username.text()).toContain('TestUser');
        expect(email.text()).toContain('testuser@test.com');
        expect(name.text()).toContain('Test User');
    });


    it('should change button text on initial click and delete account on second click', async () => {
        const wrapper = mount(SettingsView, {
            global: {
                plugins: [router],
                stubs: {
                    RouterLink: true
                },
            },
        });

        const deleteButton = wrapper.find('#delete-btn');
        await deleteButton.trigger('click');

        expect(deleteButton.text()).toContain('CONFIRM');

        await deleteButton.trigger('click');

        await nextTick();

        expect(UserService.deleteUser).toHaveBeenCalled();
    });


    it('should toggle music setting', async () => {
        const wrapper = mount(SettingsView, {
            global: {
                plugins: [router, pinia],
                stubs: {
                    RouterLink: true
                },
            },
        });

        const musicToggle = wrapper.find('#music-toggle');
        expect((musicToggle.element as HTMLInputElement).checked).toBe(true);

        await musicToggle.trigger('click');

        expect((musicToggle.element as HTMLInputElement).checked).toBe(false);
    });


});
