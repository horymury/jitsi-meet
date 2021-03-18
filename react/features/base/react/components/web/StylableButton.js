/* @flow */

import Button from '@atlaskit/button';
import React, { Component } from 'react';

import { getCssOverride } from '../../../../css-override/functions';
import { connect } from '../../../redux';

type Props = {

     /**
     * A style override for the button
     */
    _cssOverride: Object,

    /**
     * The text on the button
     */
    text: string,
};

/**
 * Implements a React/Web {@link Component} that renders a stylable button.
 *
 * @extends Component
 */
class StylableButton extends Component<Props> {
    /**
     * Initializes a new Icon instance.
     *
     * @param {Object} props - The read-only properties with which the new
     * instance is to be initialized.
     */
    constructor(props) {
        super(props);

        // Bind event handler so it is only bound once for every instance.
        this._setOverrides = this._setOverrides.bind(this);
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const { text, ...rest } = this.props;

        return (
            <Button { ...rest }>
                <span ref = { this._setOverrides }>{ text }</span>
            </Button>
        );
    }

    _setOverrides: (?HTMLElement) => void;

    /**
     * Sets any custom styles on the button.
     *
     * @param {HTMLElement} element - The html element for which to apply the style.
     * @returns {void}
     */
    _setOverrides(element) {
        const { _cssOverride, appearance } = this.props;
        const styleForAppearance = _cssOverride[appearance];

        if (element && styleForAppearance) {
            Object.keys(styleForAppearance).forEach(prop => {
                element.style[prop] = styleForAppearance[prop];
                element.parentElement.parentElement.parentElement.style[prop] = styleForAppearance[prop];
            });
        }
    }
}

/**
 * Maps part of the Redux state to the props of this component.
 *
 * @private
 * @returns {{
 *     _cssOverride: Object
 * }}
 */
function _mapStateToProps() {
    return {
        _cssOverride: getCssOverride('Buttons')
    };
}

export default connect(_mapStateToProps)(StylableButton);
