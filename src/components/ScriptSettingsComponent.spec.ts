import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import HomeView from '../views/HomeView.vue';
import ScriptEditorWithParam from '../views/ScriptEditorView.vue';
import ScriptSettingsComponent from '../components/ScriptSettingsComponent.vue';
import { useScriptStore } from '../stores/scriptStore';


// Create router instance
const routes = [{ path: '/', component: HomeView, name: 'home' }, { path: '/scripteditor/:id', component: ScriptEditorWithParam, name: 'scriptEditorWithParam' }];
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

// These are mock scripts to be used during testing
const mockScripts = [
    {
        id: 1,
        name: 'Test Script 1',
        raw: 'raw data',
        bytecode: 'bytecode data',
        isBytecodeValid: true,
    }
];




describe('ScriptSettingsComponent', () => {

    let pinia: any;

    beforeEach(async () => {
        pinia = createPinia();
        setActivePinia(pinia);

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

        const scriptStore = useScriptStore();
        scriptStore.$state.scripts = mockScripts;

        router.push('/');
        await router.isReady();
    });

    afterEach(() => {
        const authStore = useAuthStore();
        authStore.reset();

        const scriptStore = useScriptStore();
        scriptStore.reset();
    });


    /** TESTS */

    it('renders h3 title header correctly', () => {
        const wrapper = mount(ScriptSettingsComponent, {
            global: {
                plugins: [pinia, router],
            },
        });
        const h3 = wrapper.find('h3');

        expect(h3.text()).toContain('Saved Bug Scripts:');
    });


    it('loads and displays scripts for authenticated users', async () => {

        const authStore = useAuthStore();
        authStore.$state.isAuthenticated = true;

        const wrapper = mount(ScriptSettingsComponent, {
            global: {
                plugins: [pinia, router],
            },
        });

        expect(wrapper.text()).toContain('Edit');

        const routerLink = wrapper.findComponent({ name: 'RouterLink' });
        const toProp = routerLink.props('to');

        expect(toProp).toEqual({
            name: 'scriptEditorWithParam',
            params: { id: 1 },
        });
    });


    it('delete link exists', async () => {
        const authStore = useAuthStore();
        authStore.$state.isAuthenticated = true;

        const wrapper = mount(ScriptSettingsComponent, {
            global: {
                plugins: [pinia, router],
            },
        });

        expect(wrapper.find('.delete-script').exists()).toBe(true);

    });


});


