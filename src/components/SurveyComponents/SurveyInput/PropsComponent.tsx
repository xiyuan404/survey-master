import React, { FC, useEffect } from 'react'
import { SurveyInputPropsType } from './interface'
import { Checkbox, Form, Input, Select } from 'antd'

const PropsComponent: FC<SurveyInputPropsType> = (props: SurveyInputPropsType) => {
  const { title, placeholder } = props

  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({
      title,
      placeholder,
    })
  }, [title, placeholder])

  return (
    <Form form={form}>
      <Form.Item label="标题" name="title">
        <Input placeholder="Outlined" />
      </Form.Item>
      <Form.Item label="Placeholder" name="placeholder">
        <Input placeholder="Outlined" />
      </Form.Item>
    </Form>
  )
}

export default PropsComponent
