import { createDirectus, rest, readItem, readItems } from '@directus/sdk';
import { PUBLIC_HOST_API } from '$env/static/public';

const directus = createDirectus(PUBLIC_HOST_API).with(rest());

export { directus, readItem, readItems };