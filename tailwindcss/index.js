const Color = require('color');
const plugin = require('tailwindcss/plugin');
const reduce = require('@vue-interface/variant/tailwindcss/reduce');
const defaultVariations = require('@vue-interface/variant/tailwindcss/defaultVariations');

module.exports = plugin(function({ addComponents, theme }) {
    const alert = {
        ':root': {
            '--alert-line-height': theme('alert.lineHeight'),
            '--alert-position': theme('alert.position'),
            '--alert-padding-y': theme('alert.paddingY'),
            '--alert-padding-x': theme('alert.paddingX'),
            '--alert-border-radius': theme('alert.borderRadius'),

            '--alert-fade-transition': theme('alert.fade.transition'),

            '--alert-hidden-opacity': theme('alert.hidden.opacity'),
        },
        '.alert': {
            lineHeight: theme('alert.lineHeight'),
            position: theme('alert.position'),
            padding: `${theme('alert.paddingY')} ${theme('alert.paddingY')}`,
            borderRadius: theme('alert.borderRadius'),
            '*': {
                lineHeight: theme('alert.lineHeight')
            },
            '&.fade': {
                transition: theme('alert.fade.transition')
            },
            '&:not(.show)': {
                opacity: theme('alert.hidden.opacity')          
            },
            '.alert-header': {
                display: theme('alert.header.display'),
                fontSize: theme('alert.header.fontSize'),
            },
            '.alert-link, .alert-link:hover, .alert-link:active, .alert-link:focus': {
                color: theme('alert.link.color')
            },
            '.alert-dismissable': {
                padding: theme('alert.dismissable.padding'),
            },
            '.alert-close, .close': {
                display: theme('alert.close.display'),
                position: theme('alert.close.position'),
                top: theme('alert.close.top'),
                right: theme('alert.close.right'),
                background: theme('alert.close.background'),
                border: theme('alert.close.border'),
                cursor: theme('alert.close.cursor'),
                color: theme('alert.close.color'),
                padding: `${theme('alert.close.paddingY')} ${theme('alert.close.paddingX')}`,
                'span': {
                    lineHeight: theme('alert.lineHeight'),
                    fontSize: theme('alert.close.fontSize', '1.5rem'),
                }
            } 
        }, 
    };

    const variants = Object.assign({}, defaultVariations, reduce(theme('colors')));

    for(const [key, value] of Object.entries(variants)) {
        try {
            const color = Color(value);            
            const bgColor = color.lighten(.666).luminosity() == 1 ? color : color.lighten(.666);
            const borderColor = bgColor.darken(.15).hex();
            const fontColor = bgColor.isDark() && color.isDark() ? '#fff' : color.darken(.45).hex();

            Object.assign(alert[':root'], {
                [`--alert-${key}-color`]: fontColor,
                [`--alert-${key}-background-color`]:bgColor.luminosity() === 1 ? bgColor.darken(.05).hex() : bgColor.hex(),
                [`--alert-${key}-border`]:`${theme('alert.borderWidth', '1px')} ${theme('alert.borderStyle', 'solid')} ${borderColor}`,
                [`--alert-${key}-close-color`]: fontColor,
            });

            alert[`.alert-${key}`] = {
                color: fontColor,
                backgroundColor: bgColor.luminosity() === 1 ? bgColor.darken(.05).hex() : bgColor.hex(),
                border: `${theme('alert.borderWidth', '1px')} ${theme('alert.borderStyle', 'solid')} ${borderColor}`,
            };

            alert[`.alert-${key} .alert-close, .alert-${key} > .close`] = {
                color: fontColor
            };

            alert[`.alert-${key} hr`] = {
                borderTop: 0,
                borderColor: borderColor
            };
        }
        catch (e) {
            // color didn't parse so do nothing...
        }
    }

    addComponents(alert);
}, {
    theme: {
        alert: theme => ({
            lineHeight: '1.5em',
            position: 'relative',
            paddingY: '.5rem',
            paddingX: '1rem',
            borderRadius: '.25rem',
            fade: {
                transition: 'opacity .15s linear'
            },
            hidden: {
                opacity: 0            
            },
            header: {
                display: 'block',
                fontSize: '1.25rem',
            },
            link: {
                color: 'currentColor'
            },
            dismissable: {
                padding: '0 0 0 3em'
            },
            close: {
                display: 'flex',
                position: 'absolute',
                top: 0,
                right: 0,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'inherit',
                paddingY: '.125em',
                paddingX: '.5em'
            } 
        })
    }
});