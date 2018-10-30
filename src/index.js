// this file is not used if use https://www.npmjs.com/package/babel-plugin-import
var ENV = process.env.NODE_ENV;
if (ENV !== 'production' && ENV !== 'test' && typeof console !== 'undefined' && console.warn && typeof window !== 'undefined') {
    console.warn('You are using a whole package of bui, ' + 'please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.');
}

export { default as Alert } from './components/alert/index'
