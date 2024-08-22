import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { resetPageInfo } from 'src/store/pageInfoReducer'
import useGetPageInfo from 'src/hooks/useGetPageInfo'
import { useDispatch } from 'react-redux'

const { TextArea } = Input

const PageSetting: FC = () => {
  const { title, desc, js, css } = useGetPageInfo()
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  // 实时更新表单内容
  useEffect(() => {
    form.setFieldsValue({
      title,
      desc,
      js,
      css,
    })
  }, [title, desc, js, css])

  const handleValuesChange = () => {
    dispatch(resetPageInfo(form.getFieldsValue()))
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, desc, js, css }}
      form={form}
      onValuesChange={handleValuesChange}
    >
      <Form.Item label="问卷标题" name="title">
        <Input placeholder="输入问卷标题" />
      </Form.Item>
      <Form.Item label="问卷描述" name="desc">
        <TextArea placeholder="输入问卷描述述" />
      </Form.Item>
      <Form.Item label="样式代码" name="css">
        <TextArea placeholder="输入样式代码" />
      </Form.Item>
      <Form.Item label="脚本代码" name="js">
        <TextArea placeholder="输入脚本代码" />
      </Form.Item>
    </Form>
  )
}

export default PageSetting
