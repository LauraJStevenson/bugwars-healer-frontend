import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import HowToPlayView from '../views/HowToPlayView.vue';

describe('HowToPlayCard.vue', () => {

    it('renders the how-to-play instructions', () => {
        const wrapper = mount(HowToPlayView);

        // Check if the main heading is rendered
        expect(wrapper.find('h1').text()).toContain('How To Play');

        // Check for the presence of both game modes
        expect(wrapper.find('h2').text()).toContain('Easy Mode');
        expect(wrapper.findAll('h2')[1].text()).toContain('Advanced Mode');

        // Check for the specific steps in both modes
        expect(wrapper.text()).toContain('Step 1: Choose your bug');
        expect(wrapper.text()).toContain('Step 2: Choose your enemy');
        expect(wrapper.text()).toContain('Step 3: Fight!');
        expect(wrapper.text()).toContain('Step 2: Write your script');
        expect(wrapper.text()).toContain('Step 4: Fight!');
    });

    // Test to verify the image is correctly rendered
    it('renders the help image correctly', () => {
        const wrapper = mount(HowToPlayView);

        const helpImg = wrapper.find('.help-img');
        expect(helpImg.exists()).toBe(true);
        // Ensure the image src is correct
        // Note: Adjust the path based on how your project resolves static assets in tests
        expect(helpImg.attributes('src')).toContain('Blue-Bug.png');
    });
});
