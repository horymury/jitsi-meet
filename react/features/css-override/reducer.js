// @flow
import _ from 'lodash';

import { ReducerRegistry } from '../base/redux';

import { SET_CSS_OVERRIDE_DATA } from './actionTypes';

/**
 * The name of the redux store/state property which is the root of the redux
 * state of the feature {@code css-override}.
 */
const STORE_NAME = 'features/css-override';

const DEFAULT_STATE = {
    hasCustomOverrides: false
};

/**
 * Reduces redux actions for the purposes of the feature {@code css-override}.
 */
ReducerRegistry.register(STORE_NAME, (state = DEFAULT_STATE, action) => {
    switch (action.type) {
    case SET_CSS_OVERRIDE_DATA: {
        const overrides = action.value;

        _.merge(state, overrides);
        state.hasCustomOverrides = true;

        return state;
    }
    default:
        return state;
    }

});
