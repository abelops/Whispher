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
  const [tag, setTag] = useState([])
  const [sortBy, setSortBy] = useState("Time")
  const [sort, setSort] = useState("Descending")
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
            let yy = {
              value: "#"+tg,
              label: "#"+tg,
            }
            if(!tr.includes("#"+tg) && tg!="" && !tr.includes(yy)){
              tr.push({
                value: "#"+tg,
                label: "#"+tg,
              })
            }
          })
        })
        tr = [...new Set(tr)]
        console.log(tr)
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
      setLoading(false)
    })
    .catch((err)=>{
      console.log(err)
      setLoading(false)
    })
    
  }

  const filter = ()=>{
    setLoading(true)
    let tr = []
    whisps.map((ind)=>{
      // console.log(ind)
      if(tag.length>0){
        tag.map((val)=>{
          if(ind.tag){
            if(ind.tag.includes(val) && !tr.includes(ind)){
              tr.push(ind)
            }
          }
        })
        setFiltered(tr)
      }
    })
    let tem = filtered
    console.log(sortBy)
    if(sortBy=="Time")
      tem.sort((p1, p2) => (p1.stamp < p2.stamp) ? 1 : (p1.stamp > p2.stamp) ? -1 : 0);
    else if(sortBy=="Likes")
      tem.sort((p1, p2) => (p1.likes < p2.likes) ? 1 : (p1.likes > p2.likes) ? -1 : 0);
    else if(sortBy=="Dislikes")
      tem.sort((p1, p2) => (p1.dislikes < p2.dislikes) ? 1 : (p1.dislikes > p2.dislikes) ? -1 : 0);
    if(sort=="Descending")
      tem.reverse()
    setFiltered(tem)
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
    filter()
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
    // let v = value.toString().replaceAll(",", "")
    let v = ""
    value.map((vall)=>{
      v+="#"+val
    })
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
  const updateTag = (value)=>{
    console.log(tag)
    setTag(value)
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
      setLoading(false)
    })
    .catch((err)=>{
      console.log(err)
      setLoading(false)
    })
  }


  const updateSortBy = (value)=>{
    console.log(value.value)
    setSortBy(value.value)
    filter()
  }
  const updateSort = (value)=>{
    console.log(value.value)
    setSort(value.value)
    filter()
  }
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
    <div className="sticky top-0 h-28 z-10 w-full backdrop-blur-sm bg-[rgba(36,36,36,0.8)]/30">
      <Title className="pt-2">Whisper</Title>
    </div>

    <div className="flex justify-center">
      <div className="mt-2 w-[400px]">
        <Input type="text" placeholder="Title of your Whisper" onChange={titleChange} />
        <TextArea rows={4} placeholder="Whispers here :)"
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
    <Divider orientation="center">Whispers</Divider>
    <div className="mb-4">
      <Select
        labelInValue
        onChange={updateSortBy}
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
        onChange={updateSort}
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
          onChange={updateTag}
          options={tags}
          className="inline-block w-32 mr-2"
        />
      <Button dark={false} type="primary" className="bg-sky-700" onClick={filter}>Filter</Button>
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
