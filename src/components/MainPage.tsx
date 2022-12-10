import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Task from "./Task";


export default function MainPage() {
  const list = JSON.parse(localStorage.getItem("list") || "");   
  const inputRef = useRef<any>(null);  
  const [refresh, setRefresh] = useState<boolean>(true);
  const [todo, setTodo] = useState<any>(list);

  const handleForm = useCallback((e: FormEvent) => {
    e.preventDefault();
    
    const body = {
      id: todo.length + 1,
      name: inputRef.current?.value
    }

    inputRef.current.value = "";
    setTodo([...todo, body]);
    localStorage.setItem("list", JSON.stringify([...todo, body]));
    setRefresh(!refresh);
  }, [refresh, todo]);   

  useEffect(() => {
    inputRef.current?.focus();
  }, [refresh]);

  return (
    <>
      <Title>
        <h1>ToDoList.</h1>
      </Title>

      <Wrapper>        
        <Form onSubmit={handleForm}>
          <input
            ref={inputRef} 
            type="text" 
            name="text" 
            placeholder="Digite sua tarefa"
            required
             />
            
          <button>+</button>
        </Form>

        <Tasks>
          {todo.map((value: any, index: number) => (
            <Task 
              key={index} 
              id={value.id} 
              name={value.name}
              todo={todo}
              setTodo={setTodo} 
              refresh={refresh} 
              setRefresh={setRefresh}/>
          ))}
        </Tasks>
      </Wrapper>
    </>
  );
}

const Tasks = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
  margin-left: 30px;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;

  input {
    width: 80%;
    height: 40px;
    margin-top: 10px;
    border-radius: 10px;
    font-size: 1rem;
    border: none;
  }

  input:focus {
      outline-color: #2e1437;
    }

    input::placeholder {
      color: #cad1c3;
      padding-left: 10px;
    }

  button {
    width: 40px;
    height: 40px;
    margin-left: 10px;
    margin-top: 10px;
    border-radius: 10px;
    border: none;
    font-size: 30px;
    color: #2e1437;
    background-color: #948e99;
    cursor: pointer;
  }
`;

const Title = styled.div`
  background-color:#948e99;
  margin: 20px auto;
  width: 300px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  box-shadow: 0px 2px 10px 5px rgba(0, 0, 0, 0.2);

  h1 {
    font-family: 'Lobster', cursive;
    color: #2e1437;
    font-size: 3rem;
  }
`;

const Wrapper = styled.div`
  max-width: 600px;
  min-height: 40vh;
  background-color: #cad1c3;
  margin: 0 auto;
  border-radius: 20px;
  box-shadow: 0px 2px 10px 5px rgba(0, 0, 0, 0.2);
`;

