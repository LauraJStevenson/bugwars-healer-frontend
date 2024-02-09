import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import GamePlayView from '../views/GamePlayView.vue';

describe('GamePlayView.vue', () => {
    it('renders the component', () => {

        const wrapper = mount(GamePlayView);


        expect(wrapper.text()).toContain('Game Play View');
    });
});
