import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import RegistrationView from '../views/RegistrationView.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useAuthStore } from '../stores/auth';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

// Create router instance
const routes = [{ path: '/login', component: LoginView, name: 'login' }, { path: '/', component: HomeView, name: 'home' }, { path: '/register', component: RegistrationView, name: 'register' }];

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

//Mock authStore
vi.mock('../stores/useAuthStore', () => {
    return {
        useAuthStore: vi.fn(() => ({
            isAuthenticated: false,
            user: {},
            login: vi.fn(),
            logout: vi.fn(),
        })),
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




describe('Registration.vue', () => {
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

    it('should disable the submit button if passwords do not match', async () => {

        const wrapper = mount(RegistrationView, {
            global: {
                plugins: [router, pinia],
            },
        });

        await wrapper.find('#password').setValue('password123');
        await wrapper.find('#confirmPassword').setValue('password456');

        const submitButton = wrapper.find('#submitButton').element as HTMLInputElement;

        expect(submitButton.disabled).toBe(true);
    });


    it('should enable the submit button if passwords match', async () => {
        const wrapper = mount(RegistrationView, {
            global: {
                plugins: [router, pinia],
            },
        });

        await wrapper.find('#password').setValue('password123');
        await wrapper.find('#confirmPassword').setValue('password123');

        const submitButton = wrapper.find('#submitButton').element as HTMLInputElement;

        expect(submitButton.disabled).toBe(false);
    });


});
