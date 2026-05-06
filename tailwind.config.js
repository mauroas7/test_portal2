import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx', // ESTO ES CLAVE: Le dice a Tailwind que busque clases en tus archivos React
    ],

    theme: {
        extend: {
            fontFamily: {
                // Forzamos a que 'sans' (la fuente por defecto) sea Montserrat
                sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                // Tus colores institucionales corregidos
                primary: '#003764',   // Pantone 2955 C - Azul Hospital Universitario (CORREGIDO)
                secondary: '#C7A36E', // Pantone 465 M - Dorado / Arena
                brandText: '#59595b', // Gris texto logotipo
                // Un gris muy sutil para el fondo "Canvas"
                canvas: '#F4F7F9' 
            }
        },
    },

    plugins: [forms],
};