const Color = require('color');
const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');
const variations = require('@vue-interface/variant/tailwindcss/variations');

module.exports = plugin(function({ addComponents, theme }) {
    const alert = {
        '.alert': {
            position: 'relative',
            padding: `${theme('alert.paddingY')} ${theme('alert.paddingX')}`,
            borderRadius: theme('alert.borderRadius'),
            '&.fade': {
                transition: theme('alert.fade.transition')
            },
            '&:not(.show)': {
                opacity: 0            
            }
        },
        '.alert-header': {
            display: theme('alert.header.display'),
            fontSize: theme('alert.header.fontSize'),
        },
        '.alert-link, .alert-link:hover, .alert-link:active, .alert-link:focus': {
            color: 'currentColor',
            textDecoration: 'underline'
        },
        '.alert-dismissable': {
            paddingRight: theme('alert.dismissable.paddingRight')
        },
        '.alert-close, .alert > .close': {
            position: 'absolute',
            top: '0',
            right: '0',
            boxSizing: theme('alert.close.boxSizing'),
            width: theme('alert.close.width'),
            height: theme('alert.close.height'),
            borderRadius: theme('alert.borderRadius'),
            opacity: theme('alert.close.opacity'),
            background: theme('alert.close.background'),
            padding: `${theme('alert.close.paddingY')} ${theme('alert.close.paddingX')}`,
            
            '&:focus, &:active': {
                outline: 0,
                boxShadow: `0 0 0 0.25rem ${Color(colors.blue['500']).fade(.666)}`,
                opacity: 1
            },
        }        
    };

    for(const [key, value] of Object.entries(theme('variations', variations))) {
        try {
            const color = Color(value);            
            const bgColor = color.desaturate(.25).lighten(.75);
            const borderColor = bgColor.darken(.15).hex();
            const fontColor = bgColor.isDark() && color.isDark() ? '#fff' : color.darken(.45).hex();

            alert[`.alert-${key}`] = {
                color: fontColor,
                backgroundColor: bgColor.luminosity() === 1 ? bgColor.darken(.05).hex() : bgColor.hex(),
                border: `${theme('alert.borderWidth')} ${theme('alert.borderStyle')} ${borderColor}`,
            };

            alert[`.alert-${key} .alert-close, .alert-${key} > .close`] = {
                color: fontColor
            };

            alert[`.alert-${key} hr`] = {
                margin: '1rem 0',
                borderColor
            };
        }
        catch (e) {
            continue;
        }
    }

    addComponents(alert);
}, {
    theme: {
        alert: theme => ({
            borderWidth: '1px',
            borderRadius: '.25rem',
            borderStyle: 'solid',
            paddingX: '1rem',
            paddingY: '1rem',
            fade: {
                transition: 'opacity .15s linear'
            },
            header: {
                display: 'block',
                fontSize: '1.25rem'
            },
            dismissable: {
                paddingRight: '3em'
            },
            close: {
                background: `transparent url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e") center/1em auto no-repeat`,
                border: 'none',
                lineHeight: '1.25rem',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: 'inherit',
                paddingX: '1rem',
                paddingY: '1.25rem',
                opacity: .5,
                boxSizing: 'content-box',
                width: '1em',
                height: '1em',
            }
        })
    }
});