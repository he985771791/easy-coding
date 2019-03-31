<template>
  <div>
    <Steps :current='current'>
      <Step title='步骤1'></Step>
      <Step title='步骤2'></Step>
      <Step title='步骤3'></Step>
      <Step title='步骤4'></Step>
    </Steps>
    <Collapse v-model='value2' accordion>
      <Panel name='1'>
        <Select v-model='model1' style='width:200px' filterable disabled>
          <Option id='tixing' v-for='item in cityList' :value='item.value' :key='item.value'>{{ item.label }}</Option>
        </Select>
        <div slot='content'>
          <Form ref='formDynamic' :model='formDynamic' :rules='ruleValidate'>
            <FormItem>
              <Row>
                <Col span='5'>
                  <Select v-model='model1' style='width:200px' filterable>
                    <Option v-for='item in cityList' :value='item.value' :key='item.value'>{{ item.label }}</Option>
                  </Select>
                </Col>
                <Col span='5'>
                  <Input v-model='value14' placeholder='备注，建议填写' clearable style='width: 200px'/>
                </Col>
                <Col span='5'>
                  <Select v-model='model1' style='width:200px' filterable multiple>
                    <Option v-for='item in cityList' :value='item.value' :key='item.value'>{{ item.label }}</Option>
                  </Select>
                </Col>
                <Col span='5'>
                  <Input v-model='value14' placeholder='默认分数' clearable style='width: 200px'/>
                </Col>
              </Row>
            </FormItem>
            <FormItem>
              <Row>
                <Col>
                  <editor v-model="formDynamic.questionName" ref='editor' :value='content2' @on-change='handleChange'/>
                </Col>
              </Row>
            </FormItem>
            <FormItem v-for="(item, index) in formDynamic.items"
                      v-if="item.status"
                      :key="index"
                      :label="'Item ' + item.index"
                      :prop="'items.' + index + '.value'"
                      :rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'blur'}">
              <Row>
                <Col span='16'>
                  <Input type='text' v-model='item.value' placeholder=''></Input>
                </Col>
                <Col span='4' offset='1'>
                  <Button @click='handleRemove(index)'>Delete</Button>
                </Col>
              </Row>
            </FormItem>
            <FormItem>
              <Row>
                <Col>
                  <Button type='dashed' long @click='handleAdd' icon='md-add'>Add item</Button>
                </Col>
              </Row>
            </FormItem>
            <FormItem>
              <Row>
                <Col>
                  <label>题目解析</label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <editor ref='editor' :value='content1' @on-change='handleChange'/>
                </Col>
              </Row>
            </FormItem>
          </Form>
        </div>
      </Panel>
      <Panel name='2'>
        斯蒂夫·盖瑞·沃兹尼亚克
        <p slot='content'>斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary
          Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC
          Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。</p>
      </Panel>
      <Panel name='3'>
        乔纳森·伊夫
        <p slot='content'>
          乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。</p>
      </Panel>
    </Collapse>
    <Button type='primary' @click='next'>下一步</Button>
  </div>
</template>
<script>
import Editor from '_c/editor'

export default {
  components: {
    Editor
  },
  data () {
    return {
      current: 0,
      cityList: [
        {
          value: '1',
          label: '单选题'
        },
        {
          value: '2',
          label: '多选题'
        },
        {
          value: '3',
          label: '填空题'
        }
      ],
      value2: 1,
      model1: '1',
      content: '',
      index: 1,
      formDynamic: {
        items: [
          {
            value: '',
            index: 1,
            status: 1
          }
        ]
      },
      ruleValidate: {
        questionName: [{
          required: true, message: '题目不能为空', trigger: 'blur'
        }]
      },
      content1: '解题思路，选填'
    }
  },
  methods: {
    next () {
      if (this.current === 4) {
        this.current = 0
      } else {
        this.current += 1
      }
    },
    handleAdd () {
      this.index++
      this.formDynamic.items.push({
        value: '',
        index: this.index,
        status: 1
      })
    },
    handleRemove (index) {
      this.formDynamic.items[index].status = 0
      this.index--
    }
  }
}
</script>
<style>
</style>
