const DIRECTIVE = "changed";

const labelFor = (since) => {
  const match = /^rev-(\d+)$/.exec(since ?? "");
  return match ? `Rev. ${match[1]}` : since;
};

const mark = (node, label) => {
  node.data = node.data ?? {};
  node.data.hProperties = node.data.hProperties ?? {};
  const current = node.data.hProperties.className;
  const classes = Array.isArray(current) ? current : current ? [current] : [];
  node.data.hProperties.className = [...classes, "is-revised"];
  node.data.hProperties["data-rev"] = label;
};

export default function remarkChanged() {
  return (tree) => {
    tree.children = tree.children.flatMap((node) => {
      if (node.type !== "containerDirective" || node.name !== DIRECTIVE) {
        return [node];
      }

      const label = labelFor(node.attributes?.since);
      for (const child of node.children) {
        if (child.type === "text") continue;
        mark(child, label);
      }

      return node.children;
    });
  };
}
