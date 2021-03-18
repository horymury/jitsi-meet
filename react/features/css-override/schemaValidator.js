import { Validator } from 'jsonschema';

const dialogs = {
    'id': '/Dialogs',
    'type': 'object',
    'required': true,
    'properties': {
        'container': {
            'type': 'object',
            'properties': {
                'backgroundColor': {
                    'type': 'color'
                },
                'color': {
                    'type': 'color'
                }
            },
            'additionalProperties': false
        }
    },
    'additionalProperties': false
};

const thumbnails = {
    'id': '/Thumbnails',
    'type': 'Object',
    'properties': {
        'displayNameText': {
            'type': 'object',
            'properties': {
                'color': {
                    'type': 'color'
                }
            },
            'additionalProperties': false
        },
        'focused': {
            'type': 'object',
            'properties': {
                'border': {
                    'type': 'string'
                },
                'boxShadow': {
                    'type': 'string'
                }
            },
            'additionalProperties': false
        },
        'activeSpeaker': {
            'type': 'object',
            'properties': {
                'border': {
                    'type': 'string'
                },
                'boxShadow': {
                    'type': 'string'
                }
            },
            'additionalProperties': false
        }
    },
    'additionalProperties': false
};

const buttons = {
    'id': '/Buttons',
    'type': 'Object',
    'properties': {
        'primary': {
            'type': 'object',
            'properties': {
                'backgroundColor': {
                    'type': 'color'
                },
                'color': {
                    'type': 'color'
                }
            },
            'additionalProperties': false
        },
        'subtle': {
            'type': 'object',
            'properties': {
                'backgroundColor': {
                    'type': 'color'
                },
                'color': {
                    'type': 'color'
                }
            },
            'additionalProperties': false
        }
    },
    'additionalProperties': false
};

const icons = {
    'id': '/Icons',
    'type': 'Object',
    'properties': {
        'style': {
            'type': 'object',
            'properties': {
                'fill': {
                    'type': 'color'
                }
            },
            'additionalProperties': false
        }
    },
    'additionalProperties': false
};

/**
 * The json schema main definition. It contains references to the generic components it defines.
 */
const main = {
    'id': '/CssOverride',
    'type': 'object',
    'properties': {
        'Dialogs': { '$ref': '/Dialogs' },
        'Thumbnails': { '$ref': '/Thumbnails' },
        'Buttons': { '$ref': '/Buttons' },
        'Icons': { '$ref': '/Icons' }
    },
    'additionalProperties': false
};

const validator = new Validator();

validator.addSchema(dialogs, '/Dialogs');
validator.addSchema(thumbnails, '/Thumbnails');
validator.addSchema(buttons, '/Buttons');
validator.addSchema(icons, '/Icons');

/**
 * Validates an object against the json schema validator.
 *
 * @param {Object} obj - The object to be validated against the json schema.
 * @returns {boolean} True if the object is valid according to the json schema or false otherwise.
 */
export default obj => validator.validate(obj, main);

