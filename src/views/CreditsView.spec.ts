import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Credits from './CreditsView.vue';

/**
 * Tests for the CreditsView component.
 */

describe('Credits', () => {

    it('renders the team title correctly', () => {
        const wrapper = mount(Credits);
        expect(wrapper.find('.title').text()).toContain('We are Team Healer of Crusader Games');
    });

    it('has the correct link to Crusader Games about page', () => {
        const wrapper = mount(Credits);
        const aboutLink = wrapper.find('.cg-link');
        expect(aboutLink.attributes('href')).toBe('https://www.crusadergames.net/about');
    });

    it('loads team member images correctly', () => {
        const wrapper = mount(Credits);
        const images = wrapper.findAll('.card-photo');
        expect(images.length).toBeGreaterThan(0);
        expect(images.at(0)?.attributes('src')).toContain('laura-img.jpg');
    });
});
