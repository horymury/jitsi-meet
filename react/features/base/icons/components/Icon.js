// @flow

import React, { Component } from 'react';

import { getCssOverride } from '../../../css-override/functions';
import { Container } from '../../react/base';
import { styleTypeToObject } from '../../styles';

type Props = {

    /**
     * Class name for the web platform, if any.
     */
    className?: string,

    /**
     * Color of the icon (if not provided by the style object).
     */
    color?: string,

    /**
     * Id prop (mainly for autotests).
     */
    id?: string,

    /**
     * Function to invoke on click.
     */
    onClick?: Function,

    /**
     * The size of the icon (if not provided by the style object).
     */
    size?: number | string,

    /**
     * The preloaded icon component to render.
     */
    src: Function,

    /**
     * Style object to be applied.
     */
    style?: Object
};

export const DEFAULT_COLOR = navigator.product === 'ReactNative' ? 'white' : undefined;
export const DEFAULT_SIZE = navigator.product === 'ReactNative' ? 36 : 22;

/**
 * Recursively sets a color fill on a HTMLElement and it's children.
 *
 * @param {HTMLElement} elem - The root html element for which to set the color.
 * @param {string} calculatedColor - The calculated color.
 * @returns {void}
 */
const setColorOnNodes = (elem, calculatedColor) => {
    const currentFill = elem.getAttribute('fill');
    const stopColor = elem.getAttribute('stop-color');

    if (!stopColor && (!currentFill || currentFill === 'none')) {
        elem.setAttribute('fill', calculatedColor || '');
    }
    if (elem.hasChildNodes()) {
        elem.childNodes.forEach(node => setColorOnNodes(node));
    }
};

/**
 * Implements an Icon component that takes a loaded SVG file as prop and renders it as an icon.
 *
 * @param {Props} props - The props of the component.
 * @returns {Reactelement}
 */
export default class Icon extends Component<Props, *> {
    /**
     * Initializes a new Icon instance.
     *
     * @param {Object} props - The read-only properties with which the new
     * instance is to be initialized.
     */
    constructor(props) {
        super(props);

        // Bind event handlers so they are only bound once for every instance.
        this._setStyles = this._setStyles.bind(this);
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const {
            className,
            color,
            id,
            onClick,
            size,
            src: IconComponent,
            style
        } = this.props;

        const {
            color: styleColor,
            fontSize: styleSize,
            ...restStyle
        } = styleTypeToObject(style ?? {});

        const overrideIconStyle = getCssOverride('Icons')?.style || {};
        const calculatedColor = color ?? styleColor ?? overrideIconStyle.fill ?? DEFAULT_COLOR;
        const calculatedSize = size ?? styleSize ?? DEFAULT_SIZE;

        return (
            <span ref = { this._setStyles }>
                <Container
                    className = { `jitsi-icon ${className}` }
                    onClick = { onClick }
                    style = { restStyle }>
                    <IconComponent
                        fill = { calculatedColor }
                        height = { calculatedSize }
                        id = { id }
                        width = { calculatedSize } />
                </Container>
            </span>
        );
    }

    _setStyles: (?HTMLElement) => void;

    /**
     * Computes and sets the icon's (svg's) styles or custom styles.
     *
     * @param {HTMLElement} elem - The parent element.
     * @returns {void}
     */
    _setStyles(elem) {
        if (!elem) {
            return;
        }

        const {
            color,
            style
        } = this.props;
        const {
            color: styleColor
        } = styleTypeToObject(style ?? {});
        const overrideIconStyle = getCssOverride('Icons').style || {};
        const calculatedColor = color ?? styleColor ?? overrideIconStyle.fill ?? DEFAULT_COLOR;

        elem.firstChild.firstChild.childNodes.forEach(node => setColorOnNodes(node, calculatedColor));
    }
}

Icon.defaultProps = {
    className: ''
};
