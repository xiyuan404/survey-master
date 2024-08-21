import React, { FC, useEffect } from 'react'
import { SurveyInfoPropsType } from './interface'
import { Form, Input } from 'antd'

const { TextArea } = Input

const PropsComponent: FC<SurveyInfoPropsType> = (props: SurveyInfoPropsType) => {
  const { title, desc, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      title,
      desc,
    })
  }, [title, desc])

  const handleValuesChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, desc }}
      form={form}
      onValuesChange={handleValuesChange}
      disabled={disabled}
    >
      <Form.Item label="问卷标题" name="title">
        <Input />
      </Form.Item>
      <Form.Item label="问卷描述" name="desc">
        <TextArea />
      </Form.Item>
    </Form>
  )
}

export default PropsComponent
