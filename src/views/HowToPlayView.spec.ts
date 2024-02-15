import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import HowToPlayView from '../views/HowToPlayView.vue';




describe('HowToPlayCard.vue', () => {


    /** TESTS */

    it('renders the how-to-play instructions', () => {
        const wrapper = mount(HowToPlayView);

        expect(wrapper.find('h1').text()).toContain('How To Play');

        expect(wrapper.find('h2').text()).toContain('Easy Mode');
        expect(wrapper.findAll('h2')[1].text()).toContain('Advanced Mode');

        expect(wrapper.text()).toContain('Step 1: Choose your bug');
        expect(wrapper.text()).toContain('Step 2: Choose your enemy');
        expect(wrapper.text()).toContain('Step 3: Fight!');
        expect(wrapper.text()).toContain('Step 2: Write your script');
        expect(wrapper.text()).toContain('Step 4: Fight!');
    });


    it('renders the help image correctly', () => {
        const wrapper = mount(HowToPlayView);

        const helpImg = wrapper.find('.help-img');
        expect(helpImg.exists()).toBe(true);
        expect(helpImg.attributes('src')).toContain('Blue-Bug.png');
    });


});
