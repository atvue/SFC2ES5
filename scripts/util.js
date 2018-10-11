const fs = require( 'fs' ) ,
    path = require( 'path' ) ,
    fse = require( 'fs-extra' )




exports.readFileSync = function( file ) {
    if ( file === undefined || file === null ) {
        throw '请输入文件路径'
    }
    return fs.readFileSync( file , 'utf-8' )
}

exports.writeFile = function( filePath , content ) {
    if ( content === undefined || content === null ) {
        return
    }
    fse.outputFile( filePath , content , err => {
        if ( err ) {
            throw err
        }
    } )
}