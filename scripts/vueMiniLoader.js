const fs = require( 'fs' )
const scriptReg = /<script\s*.*?>([\s\S]*)<\/script>/ ,
    templateReg = /<template\s*.*?>([\s\S]*)<\/template>/




exports.readVueFileSync = function( file ) {
    if ( file === undefined || file === null ) {
        throw '请输入文件路径'
    }
    return fs.readFileSync( file , 'utf-8' )
}


exports.extractScript = function( content ) {
    if ( content === undefined || content === null || content === '' ) {
        throw '提取内容不能为空'
    }
    let matched = content.match( scriptReg )
    if ( matched !== null ) {
        let scriptTxt = matched[ 1 ]
        return scriptTxt
    } else {
        return undefined
    }
}


exports.extractTemplate = function( content ) {
    if ( content === undefined || content === null || content === '' ) {
        throw '提取内容不能为空'
    }
    let matched = content.match( templateReg )
    if ( matched !== null ) {
        let scriptTxt = matched[ 1 ]
        return scriptTxt
    } else {
        return undefined
    }

}