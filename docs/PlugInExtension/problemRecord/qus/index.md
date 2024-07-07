## 前端分页及模糊匹配
```vue


<template>
    <div class="main">
      <div class="close"><i class="el-icon-close" @click="ChangedbClose"></i></div>
      <div class="search">
        <div class="search-main">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="规则名称">
              <el-input v-model="form.groupName" placeholder="请输入规则名称"></el-input>
            </el-form-item>
            <el-form-item label="规则类型">
              <el-input v-model="form.groupType" placeholder="请输入规则类型"></el-input>
            </el-form-item>
            <el-form-item label="机构" label-width="40px">
              <el-input v-model="form.comNames" placeholder="请输入机构"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="btn">
          <el-row>
            <el-button type="danger" size="mini" @click="searchData">查询</el-button>
            <el-button type="info" size="mini" @click="resetData">重置</el-button>
          </el-row>
        </div>
      </div>
      <div class="db">
        <el-table ref="multipleTable" :row-key="getRowKey" :data="pageTicket" tooltip-effect="dark" style="width: 100%"
          @selection-change="handleSelectionChange" @select="handleSelect" @select-all="handleSelectAll">
          <el-table-column :reserve-selection="true" type="selection" width="55">
          </el-table-column>
          <el-table-column prop="index" label="序号" width="120">
          </el-table-column>
          <el-table-column prop="comNames" label="机构" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="groupName" label="规则名称" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="groupType" label="规则类型" show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <div class="page">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="currentpage" :page-size="pagesize" layout="prev, pager, next" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { queryRules } from '@/api/attendanceManage.js'
  
  export default {
    components: {},
    props: {},
    data() {
      return {
        defaults:[],
        ignoreDataChange: false,
        multipleSelection: [],
        total: 0, //总数据条数
        currentpage: 1, //当前所在页默认是第一页
        pagesize: 5, //每页显示多少行数据 默认设置为10
        ticket: [], //这里是从后端获取的所有数据
        pageTicket: [], //分页后的当前页数据
        form: {
          comNames: "",
          groupName: "",
          groupType: ""
        },
        currentRow: null,
      }
    },
    props: {
      choiceTrueList: {
        type: Array,
        default: []
      }
    },
    mounted() {
      this.getTicket()
    },
    watch: {
      choiceTrueList: function (val) {
        console.log("子组件触发", val)
        this.defaults = val
        // this.$refs.multipleTable.clearSelection()
        // this.toggleSelection(val)
      },
    },
    methods: {
      toggleSelection(temp) {
        for (let index in temp) {
          for (let iterator in this.pageTicket) {
            if (temp[index].groupId == this.pageTicket[iterator].groupId) {
              // console.log("最后的索引", iterator)
              this.$refs.multipleTable.toggleRowSelection(this.pageTicket[iterator], true);
            }
          }
        }
      },
      getRowKey(row) {
        return row.groupId;
      },
      ChangedbClose() {
        console.log("关闭提交事件",this.multipleSelection)
        this.$emit('dbClose', this.multipleSelection)
      },
      handleSelectionChange(vals) {
         console.log("列表变化数",vals.length)  
         let targets = []
         // 提交数组vals 与  target 去重
         for (const item of vals) {
              if(!targets.some(it=>it.groupId ==item.groupId)){
                 targets.push(item)
              }
         }
        //  this.toggleSelection(this.defaults)
         this.multipleSelection = targets;
         console.log("提交变化数",this.multipleSelection.length)
      //    console.log("关闭提交事件2",this.multipleSelection)
      },
      handleSelect(data){
        console.log("单选变化数",data)
      //  this.multipleSelection = data;
  
      },
      handleSelectAll(data){
        console.log("全选变化数",data)
      },
      // 获取页面的表格所有数据
      async getTicket() {
        const { data } = await queryRules()
        this.ticket = data.map(item => {
          return {
            ...item,
            groupType: item.groupType === "0" ? "固定上下班打卡" : "自由上下班"
          }
        });
        this.total = data.length;
        //获取当前页的数据
        this.getPageInfo(); //在这里调用获取当前页的数据信息方法
      },
      // 获取当前页的数据信息
      getPageInfo() {
        let filterArray = [];
        // 获取过滤后的数据
        for (let i = 0; i < this.ticket.length; i++) {
          const item = this.ticket[i];
          if (this.form.groupName && !item.groupName.includes(this.form.groupName)) {
            continue;
          }
  
          if (this.form.groupType && !item.groupType.includes(this.form.groupType)) {
            continue;
          }
  
          if (this.form.comNames && !item.comNames[0].includes(this.form.comNames)) {
            continue;
          }
          filterArray.push(item);
        }
        this.total = filterArray.length;
        //清空pageTicket中的数据
        this.pageTicket = [];
        // 获取当前页的数据
        for (let i = (this.currentpage - 1) * this.pagesize; i < this.total; i++) {
          //把遍历的数据添加到pageTicket里面
          this.pageTicket.push(filterArray[i]);
          //判断是否达到一页的要求
          if (this.pageTicket.length === this.pagesize || i === this.total - 1) {
            break;
          }
        }
        // 为 pageTicket 中的数据添加序号
        this.pageTicket = this.pageTicket.map((item, index) => {
          return {
            index: index + 1,
            ...item
          };
        });
        // this.$refs.multipleTable.toggleRowSelection(val,true);
        // this.toggleSelection(this.defaults)
      },
      //分页时修改每页的行数,这里会自动传入一个size
      handleSizeChange(size) {
        //修改当前每页的数据行数
        this.pagesize = size;
        //数据重新分页
        this.getPageInfo();
      },
      //调整当前的页码
      handleCurrentChange(pageNumber) {
        //修改当前的页码
        this.currentpage = pageNumber;
        //数据重新分页
        this.getPageInfo();
      },
      //搜索数据
      searchData() {
        this.currentpage = 1;
        this.getPageInfo();
      },
      resetData() {
        this.currentpage = 1;
        this.form.comNames = '';
        this.form.groupName = '';
        this.form.groupType = '';
        this.getPageInfo();
      }
    }
  };
  </script>
```

