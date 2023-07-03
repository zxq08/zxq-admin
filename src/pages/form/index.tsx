import * as React from 'react'
import { useState, useEffect, FC } from 'react'
import useForm from './useForm'

const Form: FC = () => {
  const [formData, setFormItem, reset]: any = useForm()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log('formData', formData)
  }

  const { name, opts, radios } = formData

  return (
    <div style={{ width: 400, margin: '0 auto' }}>
      <form>
        <p>文本</p>
        <input
          type="text"
          title="名称"
          value={name}
          onChange={e => {
            setFormItem('name', e.target.value)
          }}
        />

        <p>下拉</p>
        <select
          value={opts}
          onChange={e => {
            setFormItem('opts', e.target.value)
          }}
        >
          <option>opt1</option>
          <option>opt2</option>
          <option>opt3</option>
        </select>

        <p>单选</p>
        <input
          checked={radios === 'radio1'}
          type="radio"
          name="radios"
          id="radio1"
          value="radio1"
          onChange={e => {
            setFormItem('radios', e.target.value)
          }}
        />
        <label htmlFor="radio1">radio1</label>
        <br />
        <input
          checked={radios === 'radio2'}
          type="radio"
          name="radios"
          id="radio2"
          value="radio2"
          onChange={e => {
            setFormItem('radios', e.target.value)
          }}
        />
        <label htmlFor="radio2">radio2</label>
        <br />

        <button onClick={handleSubmit}>提交</button>
        <button onClick={reset}>重置</button>
      </form>
    </div>
  )
}

export default Form
