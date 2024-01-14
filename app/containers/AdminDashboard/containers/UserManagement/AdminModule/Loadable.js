/**
 *
 * Asynchronously loads the component for AdminModule
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
