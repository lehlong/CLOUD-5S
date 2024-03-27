import {Component, ViewChild, Injectable, HostListener} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {AccountGroupService} from 'src/app/services/AD/account-group.service';
import {RightService} from 'src/app/services/AD/right.service';
import {AccountService} from 'src/app/services/AD/account.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {BehaviorSubject} from 'rxjs';
import {utils} from 'src/app/utils/utils';
import {ACCOUNT_RIGHTS} from 'src/app/utils/constant/index';
import {rightOfGroup} from 'src/app/models/AD/account-group.model';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import Swal from 'sweetalert2';

export class TodoItemFlatNode {
  label: string = '';
  level: number = 0;
  expandable: boolean = true;
  id: number = 0;
  isChecked: boolean = true;
}

@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<rightOfGroup[]>([]);
  get data(): rightOfGroup[] {
    return this.dataChange.value;
  }

  constructor() {}

  buildFileTree(obj: {[key: string]: any}, level: number): rightOfGroup[] {
    return Object.keys(obj).reduce<rightOfGroup[]>((accumulator, key) => {
      const item = obj[key];
      const node = new rightOfGroup();
      node.name = obj[key].name;
      node.id = obj[key].id;
      node.isChecked = obj[key].isChecked;
      if (item != null) {
        if (typeof item === 'object' && item.children != undefined) {
          node.children = this.buildFileTree(item.children, level + 1);
        } else {
          node.name = item.name;
        }
      }

      return accumulator.concat(node);
    }, []);
  }
}
@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss'],
  providers: [ChecklistDatabase],
})
export class AccountEditComponent {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
  }
  @ViewChild('groupIdInput') groupIdInput: any;
  heightDeault: number = 0;
  widthDeault: string = '0px';
  accountForm: FormGroup;
  submitted: boolean = false;
  userName: string = '';
  groupId: string = '';
  filterGroup = new BaseFilter();
  optionsGroup: any[] = [];
  ACCOUNT_RIGHTS = ACCOUNT_RIGHTS;
  currentTab: number = 1;
  displayedColumns: string[] = ['choose', 'name', 'isActive'];
  listRightGroup: any = [];

  flatNodeMap = new Map<TodoItemFlatNode, rightOfGroup>();
  nestedNodeMap = new Map<rightOfGroup, TodoItemFlatNode>();
  selectedParent: TodoItemFlatNode | null = null;
  treeControl: FlatTreeControl<TodoItemFlatNode>;
  treeFlattener: MatTreeFlattener<rightOfGroup, TodoItemFlatNode>;
  dataSource: MatTreeFlatDataSource<rightOfGroup, TodoItemFlatNode>;
  checklistSelection = new SelectionModel<TodoItemFlatNode>(true);

  listCompany: any = [];
  listPosition: any = [];
  listDepartment: any = [];
  listVehicle: any = [];

  constructor(
    private _as: AccountService,
    private _fb: FormBuilder,
    private _ags: AccountGroupService,
    private rightService: RightService,
    private utils: utils,
    private drawerService: DrawerService,
    private database: ChecklistDatabase,
    private dropdownService: DropdownService,
  ) {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
    this.heightDeault = window.innerHeight - 200;
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    database.dataChange.subscribe((data) => {
      this.dataSource.data = data;
      setTimeout(() => {
        for (let i = 0; i < this.treeControl.dataNodes.length; i++) {
          if (this.treeControl.dataNodes[i].isChecked) {
            this.checklistSelection.toggle(this.treeControl.dataNodes[i]);
          }
          if (this.treeControl.dataNodes[i].level < 1) {
            this.treeControl.expand(this.treeControl.dataNodes[i]);
          }
        }
      }, 0);
    });
    this.accountForm = this._fb.group({
      userName: [null, [Validators.required, this.utils.trimSpace]],
      fullName: [null, [Validators.required, this.utils.trimSpace]],
      companyCode: [null, [Validators.required, this.utils.trimSpace]],
      address: [null],
      positionCode: null,
      departmentCode: null,
      email: [null, [Validators.email, this.utils.trimSpace]],
      phoneNumber: null,
      vehicleCode: [null],
      isActive: [true, [Validators.required]],
    });
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

  get f() {
    return this.accountForm.controls;
  }

  resetAll() {
    this.accountForm?.get('userName')?.setValue(null);
    this.accountForm?.get('fullName')?.setValue(null);
    this.accountForm?.get('companyCode')?.setValue(null);
    this.accountForm?.get('positionCode')?.setValue(null);
    this.accountForm?.get('departmentCode')?.setValue(null);
    this.accountForm?.get('vehicleCode')?.setValue(null);
    this.accountForm?.get('email')?.setValue(null);
    this.accountForm?.get('address')?.setValue(null);
    this.accountForm?.get('phoneNumber')?.setValue(null);
    this.accountForm?.get('isActive')?.setValue(true);
  }

  loadInit() {
    this.getDetail();
    this.getRight();
    this.getAllCompany();
    this.getAllPosition();
    this.getAllDepartment();
    this.getAllVehicle();
  }
  getAllVehicle() {
    this.dropdownService.GetAllVehicle().subscribe(
      ({data}) => {
        this.listVehicle = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
  getAllCompany() {
    this.dropdownService.GetAllCompany().subscribe(
      ({data}) => {
        this.listCompany = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  getAllPosition() {
    this.dropdownService.GetAllPosition().subscribe(
      ({data}) => {
        this.listPosition = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  getAllDepartment() {
    this.dropdownService.GetAllDepartment().subscribe(
      ({data}) => {
        this.listDepartment = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  ngOnInit() {
    this.loadInit();
  }

  getRight() {
    this.rightService.getDataForTree(this.userName).subscribe({
      next: ({data}) => {
        this.listRightGroup = data;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  getColor(right: string, checked: boolean) {
    if (checked) {
      return this.listRightGroup?.includes(right) ? 'black' : '#0b9d58';
    }
    return this.listRightGroup?.includes(right) ? 'red' : 'black';
  }

  getDetail() {
    this._as.getDetail(this.userName).subscribe({
      next: ({data}) => {
        this.getAllGroup(data?.account_AccountGroups);
        this.database.dataChange.next([data?.treeRight]);
        this.accountForm.patchValue({
          userName: data?.userName,
          fullName: data?.fullName,
          address: data?.address,
          companyCode: data?.companyCode,
          positionCode: data?.positionCode,
          departmentCode: data?.departmentCode,
          email: data?.email,
          vehicleCode: data?.vehicleCode,
          phoneNumber: data?.phoneNumber,
          isActive: data?.isActive,
        });
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  changeTab(tab: number) {
    this.currentTab = tab;
    this.drawerService.returnData({
      type: 'tab',
      tab: tab,
    });
  }

  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.every((child) => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.some((child) => this.checklistSelection.isSelected(child));
    return descAllSelected;
  }

  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);
    descendants.some((child) => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
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

  getAllGroup(listGroup: any = []) {
    this.dropdownService.GetAllAccountGroup().subscribe({
      next: ({data}) => {
        this.optionsGroup = data.map((item: any) => {
          return {
            ...item,
            title: item?.name,
            direction: listGroup.some((group: any) => group?.groupId === item?.id) ? 'right' : 'left',
          };
        });
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  close() {
    this.drawerService.close();
    this.resetAll();
  }

  onEdit() {
    this.submitted = true;
    if (this.accountForm.invalid) {
      this.changeTab(1);
      let valid = 'tên tài khoản';
      if (this.accountForm?.controls?.['fullName']?.['errors']?.['required']) {
        valid = 'tên đầy đủ';
      } else if (this.accountForm?.controls?.['companyCode']?.['errors']?.['required']) {
        valid = 'đơn vị tổ chức';
      }
      Swal.fire({
        showCloseButton: true,
        title: `Vui lòng nhập ${valid}`,
        icon: 'warning',
        showConfirmButton: false,
        toast: true,
        position: 'top-right',
        allowOutsideClick: true,
        timer: 2000,
      });
      return;
    }
    const accountRights = this.checklistSelection.selected.map((element: any) => {
      return {
        rightId: element?.id,
      };
    });
    const account_AccountGroups = this.optionsGroup?.reduce((result: any, item: any) => {
      if (item?.direction == 'right') {
        return [
          ...result,
          {
            groupId: item?.id,
          },
        ];
      }
      return result;
    }, []);
    this._as.Update({...this.accountForm.value, account_AccountGroups, accountRights}).subscribe(
      (data) => {
        this.drawerService.returnData(data);
        this.submitted = false;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
}
