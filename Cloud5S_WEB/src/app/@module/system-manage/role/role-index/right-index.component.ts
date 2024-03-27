import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {TreeFlatNode, TreeNode} from 'src/app/models/MD/tree-node.model';
import {ChecklistDatabaseService} from 'src/app/services/Common/check-list-database.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {RightService} from 'src/app/services/AD/right.service';
import {GlobalService} from 'src/app/services/Common/global.service';
import {RightEditComponent} from '../right-edit/right-edit.component';
import {RightCreateComponent} from '../right-create/right-create.component';
import {utils} from 'src/app/utils/utils';
import {ROLE_RIGHTS} from 'src/app/utils/constant/index';

@Component({
  selector: 'app-right-index',
  templateUrl: './right-index.component.html',
  styleUrls: ['./right-index.component.scss'],
  providers: [ChecklistDatabaseService],
})
export class RightIndexComponent {
  username: string = '';
  isCreate: boolean = false;
  isEdit: boolean = false;
  nodeSelected: any;
  ROLE_RIGHTS = ROLE_RIGHTS;
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<TreeFlatNode, TreeNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TreeNode, TreeFlatNode>();
  /** A selected parent node to be inserted */
  selectedParent: TreeFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<TreeFlatNode>;

  treeFlattener: MatTreeFlattener<TreeNode, TreeFlatNode>;

  dataSource: MatTreeFlatDataSource<TreeNode, TreeFlatNode>;

  /* Drag and drop */
  dragNode: any;
  dragNodeExpandOverWaitTimeMs = 300;
  dragNodeExpandOverNode: any;
  dragNodeExpandOverTime: number = 0;
  dragNodeExpandOverArea: string = '';
  @ViewChild('emptyItem') emptyItem!: ElementRef;
  constructor(
    private _rs: RightService,
    private _ds: DrawerService,
    private database: ChecklistDatabaseService,
    private _gs: GlobalService,
    private utils: utils,
    private globalService: GlobalService,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Danh sách quyền',
        path: 'system-manage/role',
      },
    ]);
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<TreeFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    database.dataChange.subscribe((data) => {
      this.dataSource.data = [];
      this.dataSource.data = data;
    });
    const UserInfo = this._gs.getUserInfo();
    this.username = UserInfo?.userName;
  }

  getLevel = (node: TreeFlatNode) => node.level;

  isExpandable = (node: TreeFlatNode) => node.expandable;

  getChildren = (node: TreeNode): TreeNode[] => node.children;

  hasChild = (_: number, _nodeData: TreeFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TreeFlatNode) => _nodeData.name === '';

  nodeForm: any;
  selectId: string = '';

  ngOnInit(): void {
    this.loadInit();
  }

  loadInit() {
    this._rs.GetRightTree().subscribe(({data}) => {
      this.database.dataChange.next([data]);
    });
  }

  transformer = (node: TreeNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.name === node.name ? existingNode : new TreeFlatNode();
    flatNode.name = node.name;
    flatNode.id = node.id;
    flatNode.level = level;
    flatNode.expandable = node.children && node.children.length > 0;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  handleDragStart(event: any, node: any) {
    // Required by Firefox (https://stackoverflow.com/questions/19055264/why-doesnt-html5-drag-and-drop-work-in-firefox)
    event.dataTransfer.setData('foo', 'bar');
    event.dataTransfer.setDragImage(this.emptyItem.nativeElement, 0, 0);
    this.dragNode = node;
    this.treeControl.collapse(node);
  }

  handleDragOver(event: any, node: any) {
    event.preventDefault();

    // Handle node expand
    if (node === this.dragNodeExpandOverNode) {
      if (this.dragNode !== node && !this.treeControl.isExpanded(node)) {
        if (new Date().getTime() - this.dragNodeExpandOverTime > this.dragNodeExpandOverWaitTimeMs) {
          this.treeControl.expand(node);
        }
      }
    } else {
      this.dragNodeExpandOverNode = node;
      this.dragNodeExpandOverTime = new Date().getTime();
    }

    // Handle drag area
    const percentageX = event.offsetX / event.target.clientWidth;
    const percentageY = event.offsetY / event.target.clientHeight;
    if (percentageY < 0.25) {
      this.dragNodeExpandOverArea = 'above';
    } else if (percentageY > 0.75) {
      this.dragNodeExpandOverArea = 'below';
    } else {
      this.dragNodeExpandOverArea = 'center';
    }
  }

  handleDrop(event: any, node: any) {
    event.preventDefault();
    if (node !== this.dragNode) {
      let newItem: TreeNode;
      if (this.dragNodeExpandOverArea === 'above') {
        newItem = this.database.copyPasteItemAbove(this.flatNodeMap.get(this.dragNode)!, this.flatNodeMap.get(node)!);
      } else if (this.dragNodeExpandOverArea === 'below') {
        newItem = this.database.copyPasteItemBelow(this.flatNodeMap.get(this.dragNode)!, this.flatNodeMap.get(node)!);
      } else {
        newItem = this.database.copyPasteItem(this.flatNodeMap.get(this.dragNode)!, this.flatNodeMap.get(node)!);
      }
      const parentNode = this.database.getParentFromNodes(newItem);
      newItem.pId = parentNode.id;
      this.database.deleteItem(this.flatNodeMap.get(this.dragNode)!);
      this.treeControl.expandDescendants(this.nestedNodeMap.get(newItem)!);
    }
    this.dragNode = null;
    this.dragNodeExpandOverNode = null;
    this.dragNodeExpandOverTime = 0;
  }

  handleDragEnd(event: any) {
    this.dragNode = null;
    this.dragNodeExpandOverNode = null;
    this.dragNodeExpandOverTime = 0;
  }

  clickNode(node: TreeFlatNode, event: Event) {
    this.nodeSelected = node;
    const elements = document.querySelectorAll('*');
    elements.forEach((element) => {
      element.classList.remove('mat-tree-node-selected');
    });

    var ele = event.target as Element;
    ele.classList.add('mat-tree-node-selected');
    var data = this.flatNodeMap.get(node);
    if (data!.id === 'R') {
      return;
    }
    this._ds
      ?.open(RightEditComponent, {
        id: data!.id,
        name: data!.name,
      })
      .subscribe((result) => {
        // if (result.action == 'delete') {
        //   if (result?.status) {
        //     this.database.deleteItem(this.flatNodeMap.get(node)!);
        //   }
        // }
        // if (result.action == 'update') {
        //   if (result?.status) {
        //     if (this.flatNodeMap.get(node)?.id == result.data.id) {
        //       this.database.updateItem(this.flatNodeMap.get(node)!, result.data?.name);
        //     }
        //   }
        // }
        this.loadInit();
      });
  }

  cancel() {
    this.isEdit = false;
    this.isCreate = false;
  }

  createRight() {
    if (this.nodeSelected?.level === 5) {
      return;
    }
    const nestedNode = this.flatNodeMap.get(this.nodeSelected);
    this.nodeForm = new TreeNode();
    // this.nodeForm.id = 'R' + this.utils.generateId();
    this.nodeForm.id = '';
    this.nodeForm.pId = nestedNode?.id;

    // const parentNode = this.database.getParentFromNodes(this.nodeSelected);
    this._ds.open(RightCreateComponent, {id: this.nodeForm.id, pId: this.nodeForm.pId}).subscribe((result) => {
      if (result?.status) {
        // this.nodeForm = result.data;
        // this.database.insertItem(nestedNode!, this.nodeForm);
        this.loadInit();
      }
    });
  }

  submitOrderTree() {
    this._rs.UpdateOrderTree(this.database.data).subscribe(
      (data: any): void => {
        this._ds.returnData(data);
        this.database.dataChange.closed = false;
        this.cancel();
      },
      (error: any) => {
        console.log('error: ', error);
      },
    );
  }
}
