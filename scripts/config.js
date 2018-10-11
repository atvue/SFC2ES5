const path = require( 'path' )

const root = process.cwd()

function resolvePath( dir ) {
    return path.resolve( root , dir )
}

const srcDir = resolvePath( 'src' ) ,
    libDir = resolvePath( 'lib' )

function toLibPath( srcPath ){
    let remainPath = srcPath.replace( `${srcDir}/` , ''  ) ,
        libFilePath = path.join( libDir , remainPath )
    return libFilePath
}

module.exports = {
    root ,
    srcDir ,
    libDir ,
    toLibPath ,
}