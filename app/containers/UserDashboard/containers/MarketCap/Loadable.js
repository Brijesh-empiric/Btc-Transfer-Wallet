/**
 *
 * Asynchronously loads the component for MarketCap
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
