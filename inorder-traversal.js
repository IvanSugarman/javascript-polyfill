function inorderTraversal(root) {
    var stack,
        result = [];

    if (!root) {
        return result;
    }

    stack = [{
        visited: false,
        node: root,
    }];

    while (stack.length) {
        let { visited, node } = stack.pop();

        if (!visited) {
            node.right && stack.push({ visited: false, node: node.right });
            stack.push({ visited: true, node: node });
            node.left && stack.push({ visited: false, node: node.left });
        } else {
            result.push(node.val);
        }
    }

    return result;
}
