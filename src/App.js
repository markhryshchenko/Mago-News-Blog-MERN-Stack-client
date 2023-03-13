import "./App.css";
import "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Admin from "./components/admin/Admin";
import Post from "./components/post/Post";
import Error from "./components/error/Error";
import { LabelsContext, PostsContext } from "./context/context";
import React, { useEffect } from "react";
import { getLabels } from "./services/labelsServices";
import { getPosts } from "./services/postsServices";
import EditList from "./components/admin/editPosts/EditList";
import EditPage from "./components/admin/editPosts/EditPage";
import SortContent from "./components/content/SortContent";

function App() {
  const [labels, setLabels] = React.useState([]);
  const [posts, setPosts] = React.useState([]);
  const [change, setChange] = React.useState(false);

  useEffect(() => {
    async function fetchLabels() {
      const data = await getLabels();
      setLabels(data);
    }
    fetchLabels();
  }, [change]);

  useEffect(() => {
    async function fetchPosts() {
      const data = await getPosts();
      setPosts(data);
    }
    fetchPosts();
  }, [change]);

  const addPostToContext = (newPost) => {
    setLabels([...posts, newPost]);
  };
  const editPostToContext = (editLabel, id) => {
    /*  let sort = [...labels].findIndex((item)=>item._id===id) ---=====refactor!!
 console.log("index: ",sort)
 setLabels( [...labels].splice(sort, 1, editLabel ))
 console.log("labels: ",labels)
  */
  };

  const addLabelToContext = (newLabel) => {
    setLabels([...labels, newLabel]);
  };
 

  const deleteLabelToContext = (id) => {
    //setValue([...value.filter((value) => value.id !== id)]);
    setLabels([
      ...labels.filter((item) => {
        return item._id !== id;
      }),
    ]);
  };

  const deletePostToContext = (id) => {
    //setValue([...value.filter((value) => value.id !== id)]);
    setPosts([
      ...posts.filter((item) => {
        return String(item._id) !== String(id);
      }),
    ]);
  };

  const updatePostsToContext = () => {
    setChange(!change);
  };
  
  const updateLabelsToContext = () => {
    setChange(!change);
   
  };
  return (
    <LabelsContext.Provider
      value={{
        labels: labels,
        addLabelToContext,
        
        deleteLabelToContext,
        updateLabelsToContext,
      }}
    >
      <PostsContext.Provider
        value={{
          posts: posts,
          updatePostsToContext,
          addPostToContext,
          editPostToContext,
          deletePostToContext,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />;
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/label/:id" element={<SortContent />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/editList" element={<EditList />} />
            <Route path="/editPage/:id" element={<EditPage />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </PostsContext.Provider>
    </LabelsContext.Provider>
  );
}

export default App;
