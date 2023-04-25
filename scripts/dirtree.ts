import ignoreWalk from "ignore-walk"

interface Node {
  name?: string
  children: Node[]
}

function buildTree(results: string[]): Node {
  const root: Node = { children: [] }
  for (const result of results) {
    const parts = result.split("/")
    let current: Node = root
    for (const part of parts) {
      let child = current.children.find((child) => child.name === part)
      if (!child) {
        child = { name: part, children: [] }
        current.children.push(child)
      }
      current = child
    }
  }
  return root
}

function walkDirTree(root: Node, depth = 1): string[] {
  // .1 readme.txt\DTcomment{stručný popis obsahu média}.
  const tree: string[] = []
  for (const child of root.children) {
    if (child.name == null) continue
    if (child.name[0].match(/[0-9]/) != null) continue

    tree.push(`.${depth} ${child.name}.`)
    tree.push(...walkDirTree(child, depth + 1))
  }
  return tree
}

async function main() {
  const results = await ignoreWalk({ ignoreFiles: [".gitignore"] })
  const tree = buildTree(results)

  console.log(walkDirTree(tree).join("\n"))
}

main()
