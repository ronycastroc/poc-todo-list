import { useState } from "react";
import styled from "styled-components";

export default function Task({ id, name, todo, setTodo, refresh, setRefresh }: any) {
  const [check, setCheck] = useState(false);

  function deleteTask() {
    const newList = todo.filter((value: any) => value.id !== id)
    setTodo([...newList]);
    localStorage.setItem("list", JSON.stringify(newList));
    setRefresh(!refresh)
  }

  return (
    <Wrapper check={check}>      
        <li onClick={() => setCheck(!check)}>{name}</li>
        
        <div>
          <p onClick={deleteTask}>x</p>  
        </div>          
    </Wrapper>
  );
}

const Wrapper: any = styled.div`  
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  li {
    margin-left: 5px;
    color: #2e1437;
    font-size: 1.5rem;
    list-style: initial;
    text-decoration: ${(props: any) => (props.check === true ? "line-through;" : "none")};
    cursor: pointer;
  }

  div {
    width: 20px;
    height: 20px;
    margin-left: 20px;
    background-color: #948e99;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }

  p {
    cursor: pointer;
    font-size: 1rem;
    color: #2e1437;
    cursor: pointer;
  }
`;