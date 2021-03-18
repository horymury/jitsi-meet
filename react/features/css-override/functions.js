// @flow

declare var APP: Object;

/**
 * Gets the custom styles for a given generic component name.
 *
 * @param {string} componentName - The name of the generic component for which to return the custom styles.
 * @returns {Object} The custom style for the given generic component.
 */
export const getCssOverride = componentName => APP.store.getState()['features/css-override'][componentName] || {};
