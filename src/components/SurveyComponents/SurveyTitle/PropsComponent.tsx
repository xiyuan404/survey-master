import React, { FC, useEffect } from 'react'
import { SurveyTitlePropsType } from './interface'
import { Checkbox, Form, Input, Select } from 'antd'

const PropsComponent: FC<SurveyTitlePropsType> = (props: SurveyTitlePropsType) => {
  const { text, level, isCenter, onChange, disabled } = props

  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({
      text,
      level,
      isCenter,
    })
  }, [text, level, isCenter])

  const handleValuesChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  return (
    <Form form={form} onValuesChange={handleValuesChange} disabled={disabled}>
      <Form.Item label="标题内容" name="text">
        <Input placeholder="Outlined" />
      </Form.Item>
      <Form.Item label="层级" name="level">
        <Select
          options={[
            { value: 1, label: 1 },
            { value: 2, label: 2 },
            { value: 3, label: 3 },
            { value: 4, label: 4 },
          ]}
        />
      </Form.Item>
      <Form.Item label="是否居中" name="isCenter" valuePropName="checked">
        <Checkbox> 居中显示 </Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropsComponent
