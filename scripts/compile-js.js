
`do babel src --out-dir lib --ignore 'src/**/*.spec.js','src/**/*.test.js'` ;   // 注释不了

const config = require( './config' ) ,
    { srcDir , toLibPath } = config ,
    { readFileSync , writeFile } = require( './util' ) ,
    babel = require("@babel/core")

const glob = require("glob")
const excludeReg = /\/__test__|.*\.test\.js/

// 查找所有js文件,排除__test__文件
async function findVueFiles(){
    let files = await new Promise( (r,j) => {
        glob( `${srcDir}/**/*.js` , function ( er , files ) {
            if ( er ) {
                return j( er )
            }
            return r( files )
        } )
    } )
    return files.filter( file => {
        let exclude = excludeReg.test( file )
        return !exclude
    } )
}

const options = {
    plugins: [
        [ '@babel/plugin-transform-modules-commonjs' , {
            strictMode: true ,
        } ] ,
    ]
}

async function init(){
    const files = await findVueFiles()
    files.forEach( file => {
        let code = readFileSync( file )
        babel.transform( code , options , function( err , result ) {
            if ( err ) {
                throw err
            }
            let { code } = result ,
                libFile = toLibPath( file )
            writeFile( libFile , code )
        } )
    } )
}

exports.compileJS = init