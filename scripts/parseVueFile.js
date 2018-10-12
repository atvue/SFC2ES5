const compiler = require('vue-template-compiler')
const babel = require("@babel/core")
const babelPluginInsertVueTemplate = require( './babel-plugin-insert-vue-template' )


module.exports = function( content ) {
    return new Promise( ( resolve , reject ) => {
        if ( content === '' || content === null || content.trim() === '' ) {
            reject( new Error( 'parseVueFile 请填入需要转换的vue格式文件' ) )
        }
        let vueDescriptor = compiler.parseComponent( content ) , // , { pad: 'line' }
            { template , script } = vueDescriptor ,
            scriptTxt = script.content ,
            templateTxt = template.content ,
            result = compiler.compile( templateTxt ) ,
            { render } = result ,
            optoins = { 
                ast: true ,
                code: false ,
                sourceType: 'module' ,
                plugins: [
                    [ '@babel/plugin-transform-modules-commonjs' , {
                        strictMode: false ,
                    } ] ,
                    [ babelPluginInsertVueTemplate , { renderTxt: render } ] ,
                ]
            }
        babel.transformAsync( scriptTxt , optoins ).then( ( { ast } ) => {
            babel.transformFromAstAsync( ast ).then( ( { code } ) => {
                resolve( code )
            } ).catch( reject )
        } ).catch( reject )
    } )
}