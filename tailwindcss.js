const Color = require('color');
const plugin = require('tailwindcss/plugin');

module.exports = plugin(function({ addComponents, theme }) {
    const alert = {
        '.alert': {
            position: 'relative',
            padding: `${theme('alert.px', '.5rem')} ${theme('alert.px', '1rem')}`,
            borderRadius: theme('alert.borderRadius', '.25rem'),
            '&.fade': {
                transition: 'opacity .15s linear'
            },
            '&:not(.show)': {
                opacity: 0            
            }
        },
        '.alert-header': {
            display: 'block',
            fontSize: theme('text.xl', '1.25rem'),
        },
        '.alert-link, .alert-link:hover, .alert-link:active, .alert-link:focus': {
            color: 'currentColor'
        },
        '.alert-dismissable': {
            paddingRight: '3em'
        },
        '.alert-close, .alert > .close': {
            position: 'absolute',
            top: '0',
            right: '0',
            background: 'none',
            border: 'none',
            lineHeight: '1em',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: 'inherit',
            padding: '.5rem .75rem'
        },
        
    };

    const variations = theme('alert.variations', {
        'primary': theme('colors.blue.500', '#9e9e9e'),
        'secondary': Color(theme('colors.gray.600', '#718096')).lighten(.05).hex(),
        'danger': theme('colors.red.600', '#E53E3E'),
        'success': Color(theme('colors.green.500', '#48BB78')).lighten(.10).hex(),
        'warning': theme('colors.orange.500', '#ED8936'),
        'info': theme('colors.teal.400', '#68D391'),
        'dark': theme('colors.gray.800', '#2D3748'),
        'light': theme('colors.gray.100', '#F7FAFC'),
        'muted': theme('colors.white', '#FFF')
    });

    const colors = Object.assign(theme('colors'), variations);

    for(const [key, value] of Object.entries(colors)) {
        try {
            const color = Color(value);            
            const bgColor = color.lighten(.666).luminosity() == 1 ? color : color.lighten(.666);
            const borderColor = bgColor.darken(.15).hex();
            const fontColor = bgColor.isDark() && color.isDark() ? '#fff' : color.darken(.45).hex();

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
});