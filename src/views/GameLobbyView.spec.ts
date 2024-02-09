import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import GameLobby from '../views/GameLobbyView.vue';
import HomeView from './HomeView.vue';

const routes = [
    { path: '/scripteditor', name: 'scripteditor', component: { template: '<div>Script Editor</div>' } },
    { path: '/gameplay', name: 'gameplay', component: { template: '<div>Gameplay</div>' } }, { path: '/', component: HomeView, name: 'home' }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

describe('GameLobby.vue', () => {
    beforeEach(() => {
        const pinia = createPinia();
        setActivePinia(pinia);

        vi.clearAllMocks();

        router.push('/');
    });

    it('renders all predefined bug options and a custom bug option', async () => {
        const wrapper = mount(GameLobby, {
            global: {
                plugins: [router],
            },
        });

        await router.isReady();

        expect(wrapper.findAll('.individual-bug-card').length).toEqual(5);

        expect(wrapper.find('.bug-card-photo[src="/public/images/Blue-Bug.png"]').exists()).toBe(true);
        expect(wrapper.find('.bug-card-photo[src="/public/images/Green-Bug.png"]').exists()).toBe(true);
        expect(wrapper.find('.bug-card-photo[src="/public/images/Yellow-Bug.png"]').exists()).toBe(true);
        expect(wrapper.find('.bug-card-photo[src="/public/images/Red-Bug.png"]').exists()).toBe(true);
        expect(wrapper.find('.bug-card-photo[src="/public/images/QuestionMark.png"]').exists()).toBe(true);
    });

    it('allows selection of a bug option', async () => {
        const wrapper = mount(GameLobby, {
            global: {
                plugins: [router],
            },
        });

        await router.isReady();

        const option1 = wrapper.find('#option1');
        await option1.setValue(true);

        const option2 = wrapper.find('#option1');
        await option2.setValue(true);

        const option3 = wrapper.find('#option1');
        await option3.setValue(true);

        const option4 = wrapper.find('#option1');
        await option4.setValue(true);

        const option5 = wrapper.find('#option1');
        await option5.setValue(true);

    });

});
