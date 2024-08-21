import React, { FC, useEffect } from 'react'
import { SurveyInputPropsType } from './interface'
import { Form, Input } from 'antd'

const PropsComponent: FC<SurveyInputPropsType> = (props: SurveyInputPropsType) => {
  const { title, placeholder, onChange } = props

  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({
      title,
      placeholder,
    })
  }, [title, placeholder])

  const handleValuesChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  return (
    <Form form={form} onValuesChange={handleValuesChange}>
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
