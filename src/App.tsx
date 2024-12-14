import React from 'react'
import './App.css'

// Types

interface Param {
  id: number
  name: string
  type?: string
}

interface ParamValue {
  paramId: number
  value: string
}

interface Color {
  id: number
  value: string
  type?: string
}

interface Model {
  paramValues: ParamValue[]
  colors?: Color[]
}

interface Props {
  params: Param[]
  model: Model
}

// Mock data

const params: Param[] = [
  {
    id: 1,
    name: 'Назначение',
  },
  {
    id: 2,
    name: 'Длина',
  },
]

const model: Model = {
  paramValues: [
    {
      paramId: 1,
      value: 'повседневное',
    },
    {
      paramId: 2,
      value: 'макси',
    },
  ],
}

// ModelItem component

export const ModelItem: React.FC<Props> = ({ params, model }) => {
  const [modelItem, setModelItem] = React.useState(model)

  React.useEffect(() => {
    if (!model && params.length > 0) {
      const paramValues = params.map((prev) => ({ paramId: prev.id, value: '' }))
      setModelItem({
        paramValues,
        colors: [
          /* Представим что тут массив объектов типа Color */
        ],
      })
    }
  }, [params])

  const onChangeParam = (id: number, value: string) => {
    console.log(value)
    setModelItem((prev) => ({
      ...prev,
      paramValues: prev.paramValues.map((item) =>
        item.paramId === id ? { ...item, value } : item
      ),
    }))
  }

  const getModel = (): Model => {
    return modelItem
  }

  return (
    <div>
      {params.map((param) => {
        const paramValue =
          modelItem.paramValues.find((item) => item.paramId === param.id)?.value || ''

        return (
          <div key={param.id}>
            <label htmlFor={String(param.id)}>{param.name}</label>
            <input
              id={String(param.id)}
              type="text"
              value={paramValue}
              onChange={(e) => onChangeParam(param.id, e.target.value)}
            />
          </div>
        )
      })}

      <button onClick={() => console.log(getModel())}>Получить модель</button>
    </div>
  )
}

// App component

export const App: React.FC = () => {
  return <ModelItem params={params} model={model} />
}
