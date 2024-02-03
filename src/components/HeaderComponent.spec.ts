import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Header from './HeaderComponent.vue';

describe('Header', () => {
    it('renders correctly', () => {
        const headerWrapper = mount(Header);

        expect(headerWrapper.text()).toContain('Bug Wars');

    });
});
