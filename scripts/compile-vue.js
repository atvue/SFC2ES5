const config = require( './config' ) ,
    { srcDir , toLibPath } = config ,
    { readFileSync , readFile , writeFile } = require( './util' ) ,
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
    let files
    try{
        files = await findVueFiles()
    }catch( e ) {
        throw e
    }
    files.forEach( filePath => {
        let mirrorLibPath = toLibPath( filePath )
        readFile( filePath , async content => {
            try{
                let code = await parseVueFile( content )
                writeFile( mirrorLibPath , code )
            }catch( e ){
                throw e
            }
        } )
    } )
}


exports.compileVue = init