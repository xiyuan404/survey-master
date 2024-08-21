import React, { FC, useEffect } from 'react'
import { Checkbox, Form, Input } from 'antd'
import { SurveyParagraphPropsType } from './interface'
import { useForm } from 'antd/es/form/Form'

const { TextArea } = Input

const PropsConf: FC<SurveyParagraphPropsType> = (props: SurveyParagraphPropsType) => {
  const { text, isCenter, onChange, disabled } = props
  const [form] = useForm()

  useEffect(() => {
    form.setFieldsValue({
      text,
      isCenter,
    })
  }, [text, isCenter])

  const handleValuesChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ isCenter, text }}
      disabled={disabled}
      onValuesChange={handleValuesChange}
      form={form}
    >
      <Form.Item label="text" name="text">
        <TextArea />
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox> 居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropsConf
