const config = require( './config' ) ,
    { srcDir , toLibPath } = config ,
    { readFileSync , writeFile } = require( './util' ) ,
    parseVueFile = require( './parseVueFile' )

const glob = require("glob")

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
        let mirrorLibPath = toLibPath( filePath ) ,
            content = readFileSync( filePath ) ,
            code = parseVueFile( content )
        writeFile( mirrorLibPath , code )
    } )
}


exports.compileVue = init