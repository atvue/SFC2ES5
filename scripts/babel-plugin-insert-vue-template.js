
const template = require( "@babel/template" ).default


module.exports = function( babel ) {
    let t = babel.types
    return {
        visitor: {
            AssignmentExpression( path , { opts } ) {
                if (
                    path.get('left').matchesPattern('exports.default') ||
                    path.get('left').matchesPattern('_exports.default')
                ) {
                    // 找到 exports.default = _default 排除 exports.default = void 0 ;
                    if ( t.isIdentifier( path.node.right ) ) {
                        let { name } = path.node.right ,
                            { renderTxt } = opts
                        const renderAst = template.ast ( `
                            Object.assign( ${ name } , { 
                                render: function(){ 
                                    var _c = this._c ,
                                        _s = this._s ,
                                        _q = this._q ,
                                        _v = this._v ;
                                    ${ renderTxt }
                                }
                            } )
                        ` , {
                            sourceType: 'script'    // disable strict mode
                        } )
                        path.node.right = renderAst
                    }
                }
            }
        }
    }
}