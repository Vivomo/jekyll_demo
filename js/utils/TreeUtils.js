
function Tree() {
    var childKey = 'children';
    var filter = [];

    function tree() {

    }

    tree.childKey = function (key) {
        return arguments.length ? (childKey = key, tree) : childKey;
    };

    tree.filterKey = function (keys) {
        return arguments.length ? (filter = keys, tree) : filter;
    };

    /**
     * 浅克隆tree,
     *
     * @param data 需要克隆的树
     */
    tree.clone = function (data) {
        var _tree = {};
        Object.keys(data).forEach(function (key) {
            if (!filter.includes(key)) {
                _tree[key] = data[key];
            }
        });
        if (data[childKey]) {
            _tree[childKey] = [];
            data[childKey].forEach(function (item) {
                _tree[childKey].push(tree.clone(item));
            });
        }
        return _tree;
    };

    tree.loop = function (data, callback) {
        if (callback(data) === false) {
            return;
        }
        if (data[childKey]) {
            data[childKey].forEach(function (item) {
                tree.loop(item, callback);
            })
        }
    };

    return tree;
}