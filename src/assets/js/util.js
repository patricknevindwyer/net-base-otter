/*
    Function: _has/2
    Params:
        - `obj`: Object
        - `attr`: String
    Returns: Boolean
    
    Determine if an object contains the given property.

    > _has({a: 10}, "a")
    true

*/
function _has(obj, attr) {
    return typeof obj[attr] !== 'undefined';
}

/*
    Function: _merge/2
    Params:
        - `obj_a`: Object
        - `obj_b`: Object
    Returns: Object

    Merge the values of two objects, returning a new object. Entries in obj_b will win in
    a property name clash.

    > _merge({a: 10, b: 5}, {b: 20})
    {a: 10, b: 20}

*/
function _merge(obj_a, obj_b) {
    
    var obj_r = {};
    
    Object.entries(obj_a).forEach(function (oa_ent) {
        obj_r[oa_ent[0]] = oa_ent[1];
    })

    Object.entries(obj_b).forEach(function (ob_ent) {
        obj_r[ob_ent[0]] = ob_ent[1];
    })
    
    return obj_r
    
}