import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ScriptEditor from '../views/ScriptEditorView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import GamePlayView from './GamePlayView.vue';
import HomeView from './HomeView.vue';


// Create router instance
const routes = [{ path: '/gameplay', component: GamePlayView, name: 'gameplay' }, { path: '/', component: HomeView, name: 'home' }];

const router = createRouter({
    history: createWebHistory(),
    routes,
});




describe('ScriptEditor.vue', () => {


    /** TESTS */

    it('renders the script editor elements', async () => {
        const wrapper = mount(ScriptEditor, {
            global: {
                plugins: [router],
                stubs: {
                    RouterLink: true
                },
            }
        });

        expect(wrapper.find('h1').text()).toContain('Script Editor Page');

        expect(wrapper.find('.multilineInput').exists()).toBe(true);
        expect(wrapper.find('#immutableTextarea').exists()).toBe(true);
        expect(wrapper.findAll('button').length).toBe(1);
        expect(wrapper.find('button').text()).toContain('Save Script');
    });


    //This will need to be updated once Script Editor is complete!
    it('ensures example code textarea is readonly', () => {

        const wrapper = mount(ScriptEditor, {
            global: {
                plugins: [router],
                stubs: {
                    RouterLink: true
                },
            }
        });
        const immutableTextarea = wrapper.find('#immutableTextarea');
        expect(immutableTextarea.attributes('readonly')).toBeDefined();
    });


});
