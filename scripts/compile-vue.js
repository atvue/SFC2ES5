const config = require( './config' ) ,
    { srcDir } = config ,
    { readFileSync } = require( './util' ) ,
    { extractScript , extractTemplate } = require( './vueMiniLoader' )



const glob = require("glob")
const compiler = require('vue-template-compiler')
const babel = require("@babel/core")


// 查找所有vue文件
async function findVueFiles(){
    let files = await new Promise( (r,j) => {
        glob( `${srcDir}/**/*.vue` , function ( er , files ) {
            if ( er ) {
                return j( er )
            }
            return r( files )
        } )
    } )
    return files
}

async function init(){
    let files = await findVueFiles()
    files.forEach( filePath => {
        let content = readFileSync( filePath ) ,
            scriptTxt = extractScript( content ) ,
            templateTxt = extractTemplate( content ) ,
            result = compiler.compile( templateTxt ) ,
            { render } = result
        // console.log( scriptTxt )
        let { ast } = babel.transformSync( scriptTxt , { ast: true , code: false } ) ,
            { code } = babel.transformFromAstSync( ast )
        console.log( code )
    } )

}




init()