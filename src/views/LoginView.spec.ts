import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import RegistrationView from './RegistrationView.vue';
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import { nextTick } from 'vue';


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
        return simulatedAxiosResponse.then(response => {
            if (options.successStatuses.includes(response.status)) {
                return {
                    type: 'success',
                    status: response.status,
                    data: response.data,
                };
            }
            // Handle error statuses or unexpected status codes
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




describe('LoginView', () => {

    let pinia: any;

    // This creates the store and ensures the router is set and ready before testing begins.
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

    // This resets the auth store after test is complete.
    afterEach(() => {
        const authStore = useAuthStore();
        authStore.reset();
    });

    /** TESTS */

    it('renders the login form', () => {
        const wrapper = mount(LoginView, {
            global: {
                plugins: [router, pinia],
            },
        });

        expect(wrapper.find('#email').exists()).toBe(true);
        expect(wrapper.find('#password').exists()).toBe(true);
        expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
    });



    it('handles successful login', async () => {
        const mockLogin = vi.fn().mockResolvedValue(true);
        useAuthStore().login = mockLogin;

        const wrapper = mount(LoginView, {
            global: {
                plugins: [router, pinia],
            },
        });

        await wrapper.find('#email').setValue('test@example.com');
        await wrapper.find('#password').setValue('password');
        await wrapper.find('form').trigger('submit.prevent');

        await nextTick();

        expect(mockLogin).toHaveBeenCalled();
    });



    // it('shows an error message on failed login', async () => {
    //     const mockLogin = vi.fn().mockRejectedValue(new Error('Invalid credentials'));
    //     useAuthStore().login = mockLogin;

    //     const wrapper = mount(LoginView, {
    //         global: {
    //             plugins: [router, pinia],
    //         },
    //     });

    //     await wrapper.find('#email').setValue('wrong@example.com');
    //     await wrapper.find('#password').setValue('wrongpassword');
    //     await wrapper.find('form').trigger('submit.prevent');

    //     await nextTick(); // Wait for the DOM to update


    //     expect(wrapper.find('.error-message').text()).toContain('Invalid credentials');
    // });


});
