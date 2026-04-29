import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                // Reemplazamos la fuente por defecto por Montserrat
                sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                // Paleta Institucional Hospital Universitario
                primary: '#003764',    // Pantone 2955 C
                secondary: '#C7A36E',  // Pantone 465 M
                brandText: '#59595b',  // Texto Logotipo
            }
        },
    },

    plugins: [forms],
};