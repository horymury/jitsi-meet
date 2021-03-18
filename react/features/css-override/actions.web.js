// @flow

import { getLogger } from 'jitsi-meet-logger';

import { doGetJSON } from '../base/util';

import { SET_CSS_OVERRIDE_DATA } from './actionTypes';
import validateSchema from './schemaValidator';

const logger = getLogger(__filename);

/**
 * Fetches custom css override.
 * If fetching fails, the default css overrides will be used.
 *
 * @param {string} tenant - The tenant name for the participant.
 * @returns {Function}
 */
export function fetchCssOverride(tenant: string) {
    return async function(dispatch: Function, getState: Function) {
        if (!tenant) {
            return;
        }

        const state = getState();
        const cssOverrideUrl = state['features/base/config'].cssOverrideUrl || 'https://localhost:8080/static';
        const { hasCustomOverrides } = state['features/css-override'];

        if (!hasCustomOverrides) {
            if (cssOverrideUrl) {
                try {
                    const res = await doGetJSON(`${cssOverrideUrl}/${tenant}/custom_branding`);
                    const validate = validateSchema(res);

                    if (!validate.valid) {
                        logger.error('Validation error for css overrides', validate.errors);

                        return;
                    }

                    return dispatch(setCustomCssOverride(res));
                } catch (err) {
                    logger.warn('Error fetching css overrides', err);
                }
            }
        }
    };
}

/**
 * Action used to set the css override.
 *
 * @param {Object} value - The css override data.
 * @returns {Object}
 */
function setCustomCssOverride(value) {
    return {
        type: SET_CSS_OVERRIDE_DATA,
        value
    };
}
