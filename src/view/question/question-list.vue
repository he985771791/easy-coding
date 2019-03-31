<template>
  <div>
    <Card>
      <Form ref="formData" :model="formdata" inline label-position="right" :label-width="100">
        <FormItem prop="questionType" label="题型">
          <Select v-model='formdata.questionType' style='width:200px' filterable :label-in-value="true" @on-change="questionTypeChange">
            <Option v-for='item in questionTypeList' :value='item.value' :key='item.value'>{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="difficulty" label="难度">
          <Select v-model='formdata.difficulty' style='width:200px' filterable :label-in-value="true" @on-change="difficultyChange">
            <Option v-for='item in difficultyList' :value='item.value' :key='item.value'>{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="knowledgePoint" label="知识点">
          <Select v-model='formdata.knowledgePoint' style='width:250px' filterable multiple :label-in-value="true" @on-change="knowledgePointChange" >
            <Option v-for='item in knowledgePointList' :value='item.value' :key='item.value'>{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="remark" label="备注">
          <Select v-model='formdata.remark' style='width:200px' filterable :label-in-value="true" @on-change="remarkChange">
            <Option v-for='item in remarkList' :value='item.value' :key='item.value'>{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type='primary' @click='search'>查询</Button>
        </FormItem>
      </Form>
      <strong>已选: </strong>
      <label>题型: </label>
      <label class="tag-label">{{questionTypeLabel}}</label>
      <label> | </label>
      <label>难度: </label>
      <label class="tag-label">{{difficultyLabel}}</label>
      <label v-show="knowledgePointSelected.length>0"> | 知识点: </label>
      <label v-for="item in knowledgePointSelected" :key="item" class="tag-label">{{item}}</label>
      <label> | </label>
      <label>备注: </label>
      <label class="tag-label">{{remarkLabel}}</label>
      <Tooltip content="重置" placement="bottom" style='margin: 10px 10px;'>
        <icons type="refresh" @click.native="reset" style="cursor: pointer"/>
      </Tooltip>
    </Card>
    <Card>
      <p align="center" v-show="selectedRowLength" style="color: burlywood">{{selectInfo}}</p>
      <Table ref='tables' editable stripe :data='questionPageList' :columns='columns' size="small" @on-selection-change="getSelectedRow">
        <template slot-scope="{ row }" slot="accuracy">
          {{row.accuracy}}%
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Tooltip content="查看" placement="bottom">
            <icons type="preview" style="margin-right: 5px;cursor: pointer" @click.native="show(index)"/>
          </Tooltip>
          <Tooltip content="编辑" placement="bottom">
            <icons type="edit" @click.native="edit(row, index)" style="cursor: pointer"/>
          </Tooltip>
          <Tooltip content="删除" placement="bottom">
            <icons type="delete" @click.native="remove(row, index)" style="cursor: pointer"/>
          </Tooltip>
        </template>
      </Table>
      <div style='margin: 10px;overflow: hidden'>
        <div style='float: right;'>
          <Page :total='pageCount' :page-size="pageSize" :current='pageCurrent' @on-change='changePage' show-total show-sizer @on-page-size-change="changePageSize"></Page>
        </div>
      </div>
      <Button style='margin: 10px 0;' type='primary' @click='exportExcel'>导出为Csv文件</Button>
      <Button style='margin: 10px 0;' type='primary' @click='multiDelete'>批量删除</Button>
    </Card>
  </div>
</template>
<script>
import Tables from '_c/tables'
import { getQuestionType, getDifficulty, getRemark, getKnowledgePoint, getQuestion } from '@/api/question'
import { mapActions } from 'vuex'
import Icons from '../../components/icons/icons'

export default {
  name: 'tables_page',
  components: {
    Icons,
    Tables
  },
  data () {
    return {
      // 条件搜索表单数据
      formdata: {
        questionType: 0,
        difficulty: 0,
        knowledgePoint: [],
        remark: 0
      },
      pageCurrent: 1, // 当前页
      pageCount: 0, // 总数据数
      pageSize: 20, // 每页数据条数初始数据
      questionTypeLabel: '全部题型', // 题型Label初始数据
      remarkLabel: '不限', // 备注Label初始数据
      difficultyLabel: '全部难度', // 难度Label初始数据
      knowledgePointSelected: [], // 知识点选中Label初始数据
      selectInfo: '', // 表格选中行显示信息
      selectedRowLength: 0, // 表格选中行数
      columns: [
        {
          type: 'selection', // 多选
          width: 32,
          align: 'center'
        },
        { title: '题目', key: 'title', sortable: true, align: 'center' },
        { title: '题型', key: 'questionType', align: 'center' },
        { title: '难度', key: 'difficulty', align: 'center', width: 70 },
        { title: '知识点', key: 'knowledgePoint', align: 'center' },
        { title: '备注', key: 'remark', align: 'center' },
        { title: '默认分值', key: 'defaultScore', align: 'center' },
        { title: '出卷次数', key: 'paperNumber', sortable: true, align: 'center' },
        { title: '做题人数', key: 'questionNumber', align: 'center', width: 90 },
        { title: '正确率', slot: 'accuracy', align: 'center', width: 74 },
        { title: '上传时间', key: 'createdDate', sortable: true, align: 'center' },
        { title: '上传者', key: 'createdBy', align: 'center', width: 80 },
        {
          title: '操作',
          slot: 'action',
          width: 100,
          align: 'center'
        }
      ],
      questionTypeList: [], // 题型Select列表数据
      difficultyList: [], // 难度Select列表数据
      remarkList: [], // 备注Select列表数据
      knowledgePointList: [], // 知识点Select列表数据
      questionList: [], // 试题列表总数据
      questionPageList: [] // 试题列表分页数据
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    },
    // 条件搜索
    search () {
      console.log(this.formdata)
    },
    // 重置搜索条件
    reset () {
      this.$refs.formData.resetFields()
      this.questionTypeLabel = '全部题型' // 题型初始数据
      this.remarkLabel = '不限' // 备注初始数据
      this.difficultyLabel = '全部难度' // 难度初始数据
      this.knowledgePointSelected = []
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`
      })
    },
    // 分页页面切换事件
    changePage (index) {
      var _start = (index - 1) * this.pageSize
      var _end = index * this.pageSize
      this.questionPageList = this.questionList.slice(_start, _end)
      this.pageCurrent = index
    },
    changePageSize (size) {
      this.pageSize = size
      this.pageCurrent = 1
      var _start = (this.pageCurrent - 1) * this.pageSize
      var _end = this.pageCurrent * this.pageSize
      this.questionPageList = this.questionList.slice(_start, _end)
    },
    // 题型Select选项改变事件
    questionTypeChange (e) {
      this.questionTypeLabel = e.label
    },
    // 备注Select选项改变事件
    remarkChange (e) {
      this.remarkLabel = e.label
    },
    // 难度Select选项改变事件
    difficultyChange (e) {
      this.difficultyLabel = e.label
    },
    // 知识点Select选项改变事件
    knowledgePointChange (e) {
      if (e.length > 0) {
        this.knowledgePointSelected = []
        for (let i = 0; i < e.length; i++) {
          this.knowledgePointSelected.push(e[i].label)
        }
      } else {
        this.knowledgePointSelected = []
      }
    },
    // 预览试题
    show (index) {
      if (this.questionPageList[index].questionTypeValue === 5) {
        this.$Modal.info({
          title: `${this.questionPageList[index].questionType}题`,
          content: `题目ID：${this.questionPageList[index].id}<br>${this.questionPageList[index].title}`
        })
      }
    },
    // 单行删除
    remove (row, index) {
      this.$Modal.confirm({
        title: '确认删除？',
        content: '删除后无法恢复，是否继续删除？',
        onOk: () => {
          var id = row.id
          this.removeQuestion({ id })
          console.log(row.id)
          console.log(index)
          this.questionPageList.slice(index, 1)
          this.$Message.success('删除成功')
        }
      })
    },
    edit (row, index) {
      console.log(row)
    },
    // 显示选中行数
    getSelectedRow () {
      this.selectedRowLength = this.$refs.tables.getSelection().length
      this.selectInfo = '共' + this.selectedRowLength + '条记录已被选中'
    },
    // 批量删除
    multiDelete () {
      if (this.$refs.tables.getSelection().length < 1) {
        this.$Modal.warning({
          title: '请先选择题目！'
        })
      } else {
        this.$Modal.confirm({
          title: '确认删除?',
          content: '删除后无法恢复，是否继续删除？',
          onOk: () => {
            var ids = []
            this.$refs.tables.getSelection().forEach((item) => {
              ids.push(item.id)
            })
            console.log(ids)
          }
        })
      }
    },
    ...mapActions([
      'removeQuestion'
    ])
  },
  mounted () {
    // 题型列表初始化
    getQuestionType().then(res => {
      this.questionTypeList = res.data
    })
    // 难度列表初始化
    getDifficulty().then(res => {
      this.difficultyList = res.data
    })
    // 知识点列表初始化
    getKnowledgePoint().then(res => {
      this.knowledgePointList = res.data
    })
    // 备注列表初始化
    getRemark().then(res => {
      this.remarkList = res.data
    })
    getQuestion().then(res => {
      // 取到所有数据
      this.questionList = res.data
      // 总条数
      this.pageCount = this.questionList.length
      // 初始化
      if (this.pageCount < this.pageSize) {
        this.questionPageList = this.questionList
      } else {
        this.questionPageList = this.questionList.slice(0, this.pageSize)
      }
    })
  }
}
</script>
<style>
  .tag-label {
    border: #c3c3c3 1px solid;
    border-radius: 12px;
    display: inline-block;
    padding: 2px 10px;
    margin-right: 2px;
  }
</style>
