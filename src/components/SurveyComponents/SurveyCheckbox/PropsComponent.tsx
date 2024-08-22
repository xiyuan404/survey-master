import React, { FC, useEffect } from 'react'
import { OptsType, SurveyCheckboxPropsType } from './interface'
import { Button, Checkbox, Form, Input, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { nanoid } from 'nanoid'
const PropsComponent: FC<SurveyCheckboxPropsType> = (props: SurveyCheckboxPropsType) => {
  const { title, opts, isVertical, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      title,
      opts,
      isVertical,
    })
  }, [title, opts, isVertical])

  const handleValuesChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, opts, isVertical }}
      form={form}
      onValuesChange={handleValuesChange}
      disabled={disabled}
    >
      <Form.Item label="多选标题" name="title">
        <Input />
      </Form.Item>
      <Form.Item label="多选项">
        <Form.List name="opts">
          {(fields, { add, remove }) => (
            <>
              {/* 遍历所有选项 */}
              {fields.map((field, index) => {
                return (
                  <Space key={field.key}>
                    {/* 当前选项是否选中 */}
                    <Form.Item name={[field.name, 'checked']} valuePropName="checked">
                      <Checkbox />
                    </Form.Item>
                    {/* 当前选项输入框 */}
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
                      {index > 0 && <MinusCircleOutlined onClick={() => remove(field.name)} />}
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
                  onClick={() => add({ value: nanoid(), label: '', checked: false })}
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropsComponent
