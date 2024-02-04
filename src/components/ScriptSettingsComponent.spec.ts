import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import SettingsView from '../views/SettingsView.vue';
import HomeView from '../views/HomeView.vue';
import ScriptEditorWithParam from '../views/ScriptEditorView.vue';
import ScriptSettingsComponent from '../components/ScriptSettingsComponent.vue';
import { useScriptStore } from '../stores/scriptStore';


// This creates the router with specific routes needed for testing
const routes = [{ path: '/', component: HomeView, name: 'home' }, { path: '/scripteditor/:id', component: ScriptEditorWithParam, name: 'scriptEditorWithParam' }];
const router = createRouter({
    history: createWebHistory(),
    routes,
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

/**
   * Tests for the HomeView component.
   */

describe('ScriptSettingsComponent', () => {

    let pinia: any;

    // This creates the store and ensures the router is set and ready before testing begins. This also sets the user with their mock script.
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

    // This resets the auth and script stores after test is complete.
    afterEach(() => {
        const authStore = useAuthStore();
        authStore.reset();

        const scriptStore = useScriptStore();
        scriptStore.reset();
    });


    /**
   * Tests
   */


    it('renders h3 title header correctly', () => {
        const wrapper = mount(ScriptSettingsComponent);

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


