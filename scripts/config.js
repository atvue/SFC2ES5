const path = require( 'path' )

const root = process.cwd()

function resolvePath( dir ) {
    return path.resolve( root , dir )
}

module.exports = {
    root ,
    srcDir: resolvePath( 'src' ) ,
    libDir: resolvePath( 'lib' ) ,
}