/**
 *
 * Asynchronously loads the component for BtcPrice
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
