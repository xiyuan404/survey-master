import { Button, Checkbox, Form, Input, Select, Space } from 'antd'
import React, { FC, useEffect } from 'react'
import { OptsType, SurveyRadioPropsType } from './interface'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { nanoid } from 'nanoid'
const PropsComponent: FC<SurveyRadioPropsType> = (props: SurveyRadioPropsType) => {
  const { title, selected, opts, onChange, disabled } = props

  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      title,
      selected,
      opts,
    })
  }, [title, selected, opts])

  const handleValuesChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, selected, opts }}
      onValuesChange={handleValuesChange}
      form={form}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title">
        <Input />
      </Form.Item>

      <Form.Item label="选项">
        <Form.List name="opts">
          {(fields, { add, remove }) => (
            <>
              {/* 遍历所有选项 */}
              {fields.map((field, index) => {
                return (
                  <Space key={field.key}>
                    <Form.Item
                      name={[field.name, 'label']}
                      rules={[
                        { required: true, message: '请输入选项' },
                        {
                          validator: (_, label) => {
                            const { opts = [] } = form.getFieldsValue()
                            let num = 0
                            opts.forEach((opt: OptsType) => {
                              if (opt.label === label) num++ // 记录 text 相同的个数，预期只有 1 个（自己）
                            })
                            if (num === 1) return Promise.resolve()
                            return Promise.reject(new Error('和其他选项重复了'))
                          },
                        },
                      ]}
                    >
                      <Input placeholder="输入选项..." />
                    </Form.Item>
                    <Form.Item>
                      {index > 1 && <MinusCircleOutlined onClick={() => remove(field.name)} />}
                    </Form.Item>
                  </Space>
                )
              })}
              {/* 添加选项 */}
              <Form.Item>
                <Button
                  type="link"
                  icon={<PlusOutlined />}
                  block
                  onClick={() => add({ value: nanoid(), label: '' })}
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>

      <Form.Item label="选中" name="selected">
        <Select options={opts} value={selected}></Select>
      </Form.Item>

      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropsComponent
