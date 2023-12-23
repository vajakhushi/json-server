import { useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setdata] = useState([]);

  const title = useRef();
  const author = useRef();

  const getData = () => {
    axios.get("http://localhost:3001/posts").then((res) => {
      console.log(res.data);
      setdata(res.data);
    });
  };
  const handleData = () => {
    const detail = {
      title: title.current.value,
      author: author.current.value,
    };
    console.log(detail);
    axios.post("http://localhost:3001/posts", detail).then((res) => {
      console.log(res.data);
      setdata([...data, res.data]);
    });
  };
  const handleDelete = (id) => {
    console.log(id);
    axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
    //  console.log(id)
      setdata(data.filter((e) => e.id !== id));
    });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <input type="text" name="title" ref={title} />
      <input type="text" name="author" ref={author} />
      <button onClick={handleData}>Submit</button>
      <>
        {data?.map((val, ind) => {
          return (
            <div key={ind}>
              <h1>{val.title}</h1>
              <h2>{val.author}</h2>
              <button onClick={()=>handleDelete(val.id)}>Delete</button>
            </div>
          );
        })}
      </>
    </div>
  );
}

export default App;
