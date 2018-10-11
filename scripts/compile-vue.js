const config = require( './config' ) ,
    { srcDir , libDir } = config ,
    path = require( 'path' ) ,
    { readFileSync , writeFile } = require( './util' ) ,
    parseVueFile = require( './parseVueFile' ) ,
    fse = require('fs-extra')

const glob = require("glob")

function toLibPath( srcPath ){
    let remainPath = srcPath.replace( `${srcDir}/` , ''  ) ,
        libFilePath = path.join( libDir , remainPath )
    return libFilePath
}

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
    await fse.remove( libDir )
    let files = await findVueFiles()
    files.forEach( filePath => {
        let mirrorLibPath = toLibPath( filePath ) ,
            content = readFileSync( filePath ) ,
            code = parseVueFile( content )
        writeFile( mirrorLibPath , code )
    } )
}




init()