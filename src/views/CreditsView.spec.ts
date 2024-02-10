import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Credits from './CreditsView.vue';




describe('Credits', () => {

    /** TESTS */

    it('renders the team title correctly', () => {
        const wrapper = mount(Credits);
        expect(wrapper.find('.title').text()).toContain('We are Team Healer of Crusader Games');
    });


    it('has the correct link to Crusader Games about page', () => {
        const wrapper = mount(Credits);
        const aboutLink = wrapper.find('.cg-link');
        expect(aboutLink.attributes('href')).toBe('https://www.crusadergames.net/about');
    });


    it('renders the pixel bug svg correctly', () => {
        const wrapper = mount(Credits);
        expect(wrapper.find('svg').exists()).toBe(true);

    });


    it('loads team member cards and content elements correctly', () => {
        const wrapper = mount(Credits);
        const individualCards = wrapper.findAll('.individual-card');

        expect(individualCards.length).toEqual(5);

        individualCards.forEach(card => {
            expect(card.findAll('h1').length).toEqual(1);
            expect(card.findAll('h3').length).toEqual(1);
            expect(card.findAll('p').length).toEqual(1);

            const uls = card.findAll('ul');
            expect(uls.length).toEqual(1);

            const lis = uls[0].findAll('li');
            expect(lis.length).toEqual(3);

            const linkedInLink = lis[0].find('.contact-link');
            expect(linkedInLink.exists()).toBe(true);
            expect(linkedInLink.attributes('href')).toContain('linkedin.com');

            const githubLink = lis[1].find('.contact-link');
            expect(githubLink.exists()).toBe(true);
            expect(githubLink.attributes('href')).toContain('github.com');

            const resumeLink = lis[2].find('.contact-link');
            expect(resumeLink.exists()).toBe(true);
            expect(resumeLink.attributes('href')).toMatch(/^https?:\/\/.+$/);
        });
    });


    it('loads team member images correctly', () => {
        const wrapper = mount(Credits);
        const images = wrapper.findAll('.card-photo');
        expect(images.length).toBeGreaterThan(0);
        expect(images.at(0)?.attributes('src')).toContain('laura-img.jpg');
        expect(images.at(1)?.attributes('src')).toContain('ashley-img.jpg');
        expect(images.at(2)?.attributes('src')).toContain('yagmur-img.jpg');
        expect(images.at(3)?.attributes('src')).toContain('kimlyn-img.jpg');
        expect(images.at(4)?.attributes('src')).toContain('viv-img.jpg');
    });


});
