import { useState, useEffect } from 'react'
import {Card, Button, Input, ConfigProvider, theme, Divider, Row, Typography, Mentions, Select, Spin  } from 'antd'
const { Title } = Typography;
const { TextArea } = Input;
import reactLogo from './assets/react.svg'
import './App.css'




function App() {
  const [count, setCount] = useState(0)
  const [postCont, setPostCont] = useState({
    title: "",
    content: "",
    tag: "",
    likes: 0,
    dislikes: 0,
  })
  const [loading, setLoading] = useState(true)
  const [whisps, setWhisps] = useState([])
  const [filtered, setFiltered] = useState([])
  const [tags, setTags] = useState([])

  // const post = ()=>{

  // }
  const fetchDat = ()=>{
    const req = fetch("http://3.234.211.38:5000/")
      req.then(async (res) => {
        let fin = await res.json()
        var tr = []
        fin.map((ind)=>{
          ind.tag&&
          ind.tag.split("#").map((tg)=>{
            if(!tr.includes("#"+tg) && tg!=""){
              tr.push({
                value: "#"+tg,
                label: "#"+tg,
              })
            }
          })
        })
          
        setTags(tr)
        setWhisps(fin)
        setFiltered(fin)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const like = (id,act)=>{
    setLoading(true)
    const req = fetch(`http://3.234.211.38:5000/${act}/`+id).then((res)=>{
      fetchDat()
    })
    .catch((err)=>{
      console.log(err)
    })
    setLoading(false)
  }

  const CustomCard = (val)=>{
    let ar = []
    return(
      <Card title={val.vals.title} bordered={false} loading={false} style={{ width: 300, marginLeft: 15, marginTop: 15, }}>
        <p className="mb-4">{val.vals.content}</p>
        <div className="absolute bottom-2 mt-2 w-full left-2">
          {
            val.vals.tag&&
            val.vals.tag.split("#").map((tg)=>{
              if(tg.length>0){
                return(
                  <p className="relative bottom-0 inline-block text-sky-400 cursor-pointer mr-2">#{tg}</p>
                )
              }

            })
          }
        </div>
        <div className="mb-2 mt-2 right-2">
          <p className="inline-block mr-2 text-xl cursor-pointer" onClick={()=>like(val.vals.id, "likes")}>👍{val.vals.likes}</p>
          <p className="inline-block text-xl cursor-pointer" onClick={()=>like(val.vals.id, "dislikes")}>👎{val.vals.dislikes}</p>
        </div>
      </Card>
    )
  }
  useEffect(()=>{
    fetchDat()
  },[])
  const options = [
    {
      value:'#love',
      label: "#love"
    },
    {
      value:'#hapiness',
      label: '#hapiness',
    }
    ];
  const tagChange = (value) => {
    let v = value.toString().replaceAll(",", "")
    setPostCont({
      ...postCont,
      tag: v
    })
  };
  const titleChange = (e) => {
    setPostCont({
      ...postCont,
      title: e.target.value
    })
  }
  const contentChange = (e) => {
    setPostCont({
      ...postCont,
      content: e.target.value
    })
  }
  const sendPost = ()=>{
    setLoading(true)
    const req = fetch("http://3.234.211.38:5000/",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(postCont)
    }
    )
    .then(async (res)=>{
      res = await res.json()
      fetchDat()
    })
    .catch((err)=>{
      console.log(err)
    })
    setLoading(false)
  }
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
        <Input type="text" placeholder="Title of your Whispher" onChange={titleChange} />
        <TextArea rows={4} placeholder="Whisphers here :)"
          onChange={contentChange} 
          autoSize={{
            minRows: 3,
            maxRows: 5,
          }}
          className="mt-2"
          maxLength={400} />
          <Select
            mode="tags"
            placeholder="Select tag"
            defaultValue={[]}
            onChange={tagChange}
            options={tags}
            className="inline-block w-full mt-2"
          />
          <Button className="mt-2 w-full bg-sky-700" type="primary" dark={false} onClick={sendPost}>Whisp</Button>
      </div>
    </div>
    <Divider orientation="center">Whisphers</Divider>
    <div className="mb-4">
      <Select
        labelInValue
        defaultValue={{
          value: 'Time',
          label: 'Time',
        }}
        className="mr-2"
        options={[
          {
            value: 'Time',
            label: 'Time',
          },
          {
            value: 'Likes',
            label: 'Likes',
          },
          {
            value: 'Dislikes',
            label: 'Dislikes',
          },
        ]}
      />
      <Select
        labelInValue
        defaultValue={{
          value: 'Ascending',
          label: 'Ascending',
        }}
        className="mr-2"
        options={[
          {
            value: 'Ascending',
            label: 'Ascending',
          },
          {
            value: 'Descending',
            label: 'Descending',
          },
        ]}
      />
      <Select
          mode="tags"
          placeholder="Select tag"
          defaultValue={[]}
          onChange={tagChange}
          options={tags}
          className="inline-block w-32 mr-2"
        />
      <Button dark={false} type="primary" className="bg-sky-700">Filter</Button>
      <Divider />
    </div>
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
    {
      filtered.map((val)=>{
        return(
          <CustomCard vals={val} />
        )
      })
    }
    </Row>
    {loading&&
    <div className="fixed top-0 left-0 h-full w-full z-20 flex bg-[rgba(50,50,50,0.8)] justify-center items-center">
      <Spin size="large" className="text-sky-600" tip="Loading..."/>
    </div>
    }
    </ConfigProvider>
  )
}

export default App