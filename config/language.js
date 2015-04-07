var express = require('express');
var i18n = require('i18n');

// for further information, please go to
// https://www.npmjs.com/package/i18n

i18n.configure({
    // setup some locales - other locales default to en silently
    locales:['en', 'de'],

    // you may alter a site wide default locale
    defaultLocale: 'de',

    // sets a custom cookie name to parse locale settings from  - defaults to NULL
    cookie: 'ventoryLanguage',

    // where to store json files - defaults to './locales' relative to modules directory
    directory: './locales',

    // whether to write new locale information to disk - defaults to true
    updateFiles: true,

    // what to use as the indentation unit - defaults to "\t"
    indent: "\t",

    // setting extension of json files - defaults to '.json' (you might want to set this to '.js' according to webtranslateit)
    extension: '.js',

    // enable object notation
    objectNotation: true
});

module.exports = i18n;