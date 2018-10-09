const fs = require( 'fs' )



exports.readFileSync = function( file ) {
    if ( file === undefined || file === null ) {
        throw '请输入文件路径'
    }
    return fs.readFileSync( file , 'utf-8' )
}