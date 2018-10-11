const { extractScript , extractTemplate } = require( './vueMiniLoader' )
const compiler = require('vue-template-compiler')
const babel = require("@babel/core")
const babelPluginInsertVueTemplate = require( './babel-plugin-insert-vue-template' )



module.exports = function( content ) {
    if ( content === '' || content === null || content.trim() === '' ) {
        throw new Error( 'parseVueFile 请填入需要转换的vue格式文件' )
    }
    let scriptTxt = extractScript( content ) ,
        templateTxt = extractTemplate( content ) ,
        result = compiler.compile( templateTxt ) ,
        { render } = result
    // console.log( scriptTxt )
    let { ast } = babel.transformSync( scriptTxt , { 
            ast: true ,
            code: false ,
            sourceType: 'module' ,
            plugins: [
                [ '@babel/plugin-transform-modules-commonjs' , {
                    strictMode: false ,
                } ] ,
                [ babelPluginInsertVueTemplate , { renderTxt: render } ] ,
            ]
        } )
    let { code } = babel.transformFromAstSync( ast )
    return code
}