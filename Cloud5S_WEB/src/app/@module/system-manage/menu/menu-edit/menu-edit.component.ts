import {ChecklistDatabase} from './../../account-group/account-group-edit/account-group-edit.component';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MenuService} from 'src/app/services/AD/menu.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {rightOfGroup} from 'src/app/models/AD/account-group.model';
import {SelectionModel} from '@angular/cdk/collections';
import {RightService} from 'src/app/services/AD/right.service';
import {MENU_RIGHTS} from 'src/app/utils/constant/index';

export class TodoItemFlatNode {
  label: string = '';
  level: number = 0;
  expandable: boolean = true;
  id: number = 0;

  isChecked: boolean = true;
}
@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.scss'],
  providers: [ChecklistDatabase],
})
export class MenuEditComponent {
  nodeForm: FormGroup;
  submitted: boolean = false;
  id: string = '';
  name: string = '';
  pId: string = '';
  rightId: string = '';
  url: string = '';
  icon: string = '';
  MENU_RIGHTS = MENU_RIGHTS;
  orderNumber: number = 0;
  flatNodeMap = new Map<TodoItemFlatNode, rightOfGroup>();
  nestedNodeMap = new Map<rightOfGroup, TodoItemFlatNode>();
  treeControl: FlatTreeControl<TodoItemFlatNode>;
  treeFlattener: MatTreeFlattener<rightOfGroup, TodoItemFlatNode>;
  dataSource: MatTreeFlatDataSource<rightOfGroup, TodoItemFlatNode>;
  checklistSelection = new SelectionModel<TodoItemFlatNode>(true);
  nodeSelected!: TodoItemFlatNode;
  selected = new FormControl(0);
  @Output() updateNodeForm = new EventEmitter<any>();

  constructor(
    private _ms: MenuService,
    private _fb: FormBuilder,
    private _ds: DrawerService,
    private database: ChecklistDatabase,
    private _rs: RightService,
  ) {
    this.nodeForm = this._fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      url: ['', Validators.required],
      pId: [''],
      icon: [''],
      rightId: [''],
      orderNumber: [''],
    });
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    database.dataChange.subscribe((data) => {
      this.dataSource.data = [];
      this.dataSource.data = data;
      this.treeControl.dataNodes.forEach((element) => {
        if (element.id.toString() == this.rightId) {
          this.nodeSelected = element;
          let noteParent = this.getParentNode(this.nodeSelected);
          this.treeControl.expand(noteParent!);
        }
      });
      this.treeControl.expand(this.treeControl.dataNodes[0]);
    });
  }

  get f() {
    return this.nodeForm.controls;
  }

  ngOnInit() {
    this.nodeForm?.get('id')?.setValue(this.id);
    this.nodeForm?.get('name')?.setValue(this.name);
    this.nodeForm?.get('pId')?.setValue(this.pId);
    this.nodeForm?.get('rightId')?.setValue(this.rightId);
    this.nodeForm?.get('url')?.setValue(this.url);
    this.nodeForm?.get('icon')?.setValue(this.icon);
    this.nodeForm?.get('orderNumber')?.setValue(this.orderNumber);
    this.loadInit();
  }

  loadInit() {
    this._rs.GetRightTree().subscribe(({data}) => {
      this.database.dataChange.next([data]);
    });
  }

  close() {
    this._ds.close();
    this.nodeForm?.get('id')?.setValue('');
    this.nodeForm?.get('name')?.setValue('');
    this.nodeForm?.get('pId')?.setValue('');
    this.nodeForm?.get('url')?.setValue('');
    this.nodeForm?.get('icon')?.setValue('');
    this.nodeForm?.get('rightId')?.setValue('');
    this.nodeForm?.get('orderNumber')?.setValue('');
    this.nodeSelected = new TodoItemFlatNode();
  }

  onEdit() {
    this.submitted = true;
    if (this.selected.value === 0) {
      if (this.nodeForm.invalid) {
        return;
      }
      this._ms
        .Update({
          id: this.nodeForm.value.id,
          name: this.nodeForm.value.name,
          pId: this.nodeForm.value.pId,
          url: this.nodeForm.value.url,
          icon: this.nodeForm.value.icon,
          orderNumber: this.orderNumber,
          rightId: this.rightId,
        })
        .subscribe(
          (data: any): void => {
            data.action = 'update';
            data.data = this.nodeForm.value;
            this._ds.returnData(data);
            this.submitted = false;
          },
          (error: any) => {
            console.log('error: ', error);
          },
        );
    }
    if (this.selected.value === 1) {
      this._ms
        .Update({
          id: this.nodeForm.value.id,
          name: this.nodeForm.value.name,
          pId: this.nodeForm.value.pId,
          url: this.nodeForm.value.url,
          icon: this.nodeForm.value.icon,
          rightId: this.nodeSelected?.id,
          orderNumber: this.orderNumber,
        })
        .subscribe(
          (data: any): void => {
            data.action = 'update';
            data.data = this.nodeForm.value;
            data.data.rightId = this.nodeSelected?.id;
            this._ds.returnData(data);
            this.submitted = false;
          },
          (error: any) => {
            console.log('error: ', error);
          },
        );
    }
  }

  onDelete() {
    this._ms
      .delete({
        id: this.nodeForm.value.id,
        name: this.nodeForm.value.name,
        pId: this.nodeForm.value.pId,
      })
      .subscribe(
        (data: any): void => {
          data.action = 'delete';
          this._ds.returnData(data);
          this.submitted = false;
        },
        (error: any) => {
          console.log('error: ', error);
        },
      );
  }
  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: rightOfGroup): rightOfGroup[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  transformer = (node: rightOfGroup, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.label === node.name ? existingNode : new TodoItemFlatNode();
    flatNode.label = node.name;
    flatNode.level = level;
    flatNode.id = node.id;
    flatNode.isChecked = node.isChecked;
    flatNode.expandable = !!node.children;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.some((child) => this.checklistSelection.isSelected(child));
    return descAllSelected;
  }

  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.every((child) => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    this.nodeSelected = node;

    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);
    descendants.some((child) => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
    this.nodeSelected = node;

    this.checklistSelection.toggle(node);
    node.isChecked ? (node.isChecked = true) : (node.isChecked = false);
    this.checkAllParentsSelection(node);
  }

  checkAllParentsSelection(node: TodoItemFlatNode): void {
    let parent: TodoItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  checkRootNodeSelection(node: TodoItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.some((child) => this.checklistSelection.isSelected(child));
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }
  getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
    const currentLevel = this.getLevel(node);
    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  isChecked(node: TodoItemFlatNode) {
    return this.nodeSelected?.id == node.id;
  }
}
