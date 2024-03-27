import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TreeNode} from 'src/app/models/MD/tree-node.model';

@Injectable()
export class ChecklistDatabaseService {
  dataChange = new BehaviorSubject<TreeNode[]>([]);

  get data(): TreeNode[] {
    return this.dataChange.value;
  }

  constructor() {}

  /** Add an item to to-do list */
  insertItem(parent: TreeNode, nodeFrom: TreeNode): TreeNode {
    if (!parent.children) {
      parent.children = [];
    }
    const newItem: TreeNode = {...nodeFrom};
    if (newItem.children) {
      newItem.children = [];
    }
    parent.children.unshift(newItem);
    this.dataChange.next(this.data);
    return newItem;
  }

  insertItemAbove(node: TreeNode, nodeFrom: TreeNode): TreeNode {
    const parentNode = this.getParentFromNodes(node);
    const newItem: TreeNode = {...nodeFrom};
    if (newItem.children) {
      newItem.children = [];
    }
    if (parentNode != null) {
      parentNode.children.splice(parentNode.children.indexOf(node), 0, newItem);
    } else {
      this.data.splice(this.data.indexOf(node), 0, newItem);
    }
    this.dataChange.next(this.data);
    return newItem;
  }

  insertItemBelow(node: TreeNode, nodeFrom: TreeNode): TreeNode {
    const parentNode = this.getParentFromNodes(node);
    const newItem: TreeNode = {...nodeFrom};
    if (newItem.children) {
      newItem.children = [];
    }
    if (parentNode != null) {
      parentNode.children.splice(parentNode.children.indexOf(node) + 1, 0, newItem);
    } else {
      this.data.splice(this.data.indexOf(node) + 1, 0, newItem);
    }
    this.dataChange.next(this.data);
    return newItem;
  }

  getParentFromNodes(node: TreeNode): TreeNode {
    for (let i = 0; i < this.data.length; ++i) {
      const currentRoot = this.data[i];
      const parent = this.getParent(currentRoot, node);
      if (parent != null) {
        return parent;
      }
    }
    return null as any;
  }

  getParent(currentRoot: TreeNode, node: TreeNode): TreeNode {
    if (currentRoot.children && currentRoot.children.length > 0) {
      for (let i = 0; i < currentRoot.children.length; ++i) {
        const child = currentRoot.children[i];
        if (child === node) {
          return currentRoot;
        } else if (child.children && child.children.length > 0) {
          const parent = this.getParent(child, node);
          if (parent != null) {
            return parent;
          }
        }
      }
    }
    return null as any;
  }

  updateItem(node: TreeNode, name: string) {
    node.name = name;
    this.dataChange.next(this.data);
  }

  updateItemMenu(node: TreeNode, data: any) {
    node.name = data.name;
    node.url = data.url;
    node.icon = data.icon;
    node.rightId = data.rightId;
    this.dataChange.next(this.data);
  }

  updatePId(node: TreeNode, pId: string) {
    node.pId = pId;
    this.dataChange.next(this.data);
  }

  deleteItem(node: TreeNode) {
    this.deleteNode(this.data, node);
    this.dataChange.next(this.data);
  }

  copyPasteItem(from: TreeNode, to: TreeNode): TreeNode {
    const newItem = this.insertItem(to, from);
    if (from.children) {
      from.children.forEach((child) => {
        this.copyPasteItem(child, newItem);
      });
    }
    return newItem;
  }

  copyPasteItemAbove(from: TreeNode, to: TreeNode): TreeNode {
    const newItem = this.insertItemAbove(to, from);
    if (from.children) {
      from.children.forEach((child) => {
        this.copyPasteItem(child, newItem);
      });
    }
    return newItem;
  }

  copyPasteItemBelow(from: TreeNode, to: TreeNode): TreeNode {
    const newItem = this.insertItemBelow(to, from);
    if (from.children) {
      from.children.forEach((child) => {
        this.copyPasteItem(child, newItem);
      });
    }
    return newItem;
  }

  deleteNode(nodes: TreeNode[], nodeToDelete: TreeNode) {
    const index = nodes.indexOf(nodeToDelete, 0);
    if (index > -1) {
      nodes.splice(index, 1);
    } else {
      nodes.forEach((node) => {
        if (node.children && node.children.length > 0) {
          this.deleteNode(node.children, nodeToDelete);
        }
      });
    }
  }
}
