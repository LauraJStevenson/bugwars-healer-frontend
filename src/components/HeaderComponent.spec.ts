import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Header from './HeaderComponent.vue';




describe('Header', () => {

    /** TESTS */

    it('renders correctly', () => {
        const wrapper = mount(Header);

        expect(wrapper.text()).toContain('Bug Wars');

    });


});
