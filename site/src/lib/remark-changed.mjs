const DIRECTIVE = "changed";

const labelFor = (since) => {
  const match = /^rev-(\d+)$/.exec(since ?? "");
  return match ? `Since Rev. ${match[1]}` : since;
};

const mark = (node, label) => {
  node.data = node.data ?? {};
  node.data.hProperties = node.data.hProperties ?? {};
  const current = node.data.hProperties.className;
  const classes = Array.isArray(current) ? current : current ? [current] : [];
  node.data.hProperties.className = [...classes, "is-revised"];
  node.data.hProperties["data-rev"] = label;
};

const marker = (label) => {
  const text = `${label.charAt(0).toLowerCase()}${label.slice(1)}`;
  return {
    type: "paragraph",
    data: {
      hName: "span",
      hProperties: { className: ["visually-hidden"] },
    },
    children: [{ type: "text", value: `Changed ${text}.` }],
  };
};

export default function remarkChanged() {
  return (tree) => {
    let marked = false;

    tree.children = tree.children.flatMap((node) => {
      if (node.type !== "containerDirective" || node.name !== DIRECTIVE) {
        return [node];
      }

      const label = labelFor(node.attributes?.since);
      for (const child of node.children) {
        if (child.type === "text") continue;
        mark(child, label);
      }

      if (marked || !label) return node.children;
      marked = true;
      return [marker(label), ...node.children];
    });
  };
}
