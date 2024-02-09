import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BehindTheScenesView from '../views/BehindTheScenesView.vue'

describe('MyComponent', () => {

    it('renders the component and checks the main heading', () => {
        const wrapper = mount(BehindTheScenesView)
        expect(wrapper.text()).toContain('Behind the Scenes')
    })


    it('checks if the images are correctly rendered', () => {
        const wrapper = mount(BehindTheScenesView)
        const images = wrapper.findAll('img')

        const expectedSrcs = [
            "/public/images/style-fonts-colors.png",
            "/public/images/responsive-web-design-figma.png",
            "/public/images/style-icons.png",
            "/public/images/bug-wars-wireframes.png",
            "/public/images/Red-Bug.png",
            "/public/images/Yellow-Bug.png",
            "/public/images/Green-Bug.png",
            "/public/images/Blue-Bug.png",
            "/public/images/Logo.png",
        ]

        images.forEach((img, index) => {
            expect(img.attributes('src')).toBe(expectedSrcs[index])
        })
    })


    it('checks if external links are correctly set', () => {
        const wrapper = mount(BehindTheScenesView)
        const links = wrapper.findAll('a')

        const expectedHrefs = [
            "https://www.figma.com/file/H5yVnPoDudao2avuKk65ea/Style-Guide-%2F%2F-Crusader-Games?type=design&node-id=0-1&mode=design&t=bPRWfp59e0LXwGjn-0",
            "https://www.figma.com/file/H5yVnPoDudao2avuKk65ea/Style-Guide-%2F%2F-Crusader-Games?type=design&node-id=0-1&mode=design&t=bPRWfp59e0LXwGjn-0",
            "https://www.figma.com/file/H5yVnPoDudao2avuKk65ea/Style-Guide-%2F%2F-Crusader-Games?type=design&node-id=0-1&mode=design&t=bPRWfp59e0LXwGjn-0",
            "https://www.figma.com/file/P8nqI6QG5EORnX5umH18jT/Bug-Wars-Wireframes?type=design&node-id=0%3A1&mode=design&t=KnCVgJtfghiPAYR0-1",


        ]

        links.forEach((link, index) => {
            expect(link.attributes('href')).toBe(expectedHrefs[index])
        })
    })
})
