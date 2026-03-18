import { writable } from 'svelte/store';

export const store = writable({
    nav: 'home',
    sousnav: '',
    slug: ''
})