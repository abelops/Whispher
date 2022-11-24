import { useState, useEffect } from 'react'
import {Card, Button, Input, ConfigProvider, theme, Divider, Row, Typography, Mentions  } from 'antd'
const { Title } = Typography;
const { TextArea } = Input;
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
    <div className="sticky top-0 h-28 bg-[rgba(36,36,36,0.8)] z-10 w-full">
      <Title className="pt-2">Whispher</Title>
    </div>

    <div className="flex justify-center">
      <div className="mt-2 w-[400px]">
        <Input type="text" placeholder="Title of your Whispher" />
        <TextArea rows={4} placeholder="Whisphers here :)" 
          autoSize={{
            minRows: 3,
            maxRows: 5,
          }}
          className="mt-2"
          maxLength={400} />
          <Input type="text" placeholder="Tags" className="mt-2" />
          <Button className="mt-2 w-full bg-sky-700">Whisp</Button>
      </div>
    </div>
    <Divider orientation="center">Whisphers</Divider>
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Card title="First whisp" bordered={false} style={{ width: 300, marginLeft: 15, marginTop: 15, }}>
          <p>This is a trial whisp............</p>
        </Card>
        <Card title="Personal" bordered={false} style={{ width: 300, marginLeft: 15, marginTop: 15, }}>
          <p>This is a trial whisp............</p>
        </Card>
        <Card title="Trial whisp" bordered={false} loading={true} style={{ width: 300, marginLeft: 15, marginTop: 15, }}>
          <p>This is a trial whisp............</p>
        </Card>
        <Card title="New Whisp" bordered={false} loading={true} style={{ width: 300, marginLeft: 15 , marginTop: 15,}}>
          <p>This is a trial whisp............</p>
        </Card>
    </Row>
    </ConfigProvider>
  )
}

export default App
