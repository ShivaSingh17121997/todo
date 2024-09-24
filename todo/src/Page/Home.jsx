import React, { useEffect, useState } from 'react'
import { db } from '../Firebase';
import { collection, addDoc, doc, getDocs, deleteDoc, updateDoc } from "firebase/firestore";


export default function Home() {
    const [todo, setTodo] = useState(''); // input
    const todoCollection = collection(db, "todos");
    const [todos, setTodos] = useState([]); // array of obj from database
    const [isEditId, setIsEditId] = useState(null);


    const handleForm = async (e) => {
        e.preventDefault();

        try {
            if (isEditId) {
                // update logic
                const toEditData = doc(db, "todos", isEditId);
                console.log(toEditData)
                await updateDoc(toEditData, { todo: todo })

                setTodos(todos.map((item) => {
                    if (item.id == isEditId) {
                        return { ...item, todo }
                    }
                    return item
                }))


                setIsEditId(null);
                alert("data updated successfully")

            } else {

                // add logic
                await addDoc(todoCollection, { todo: todo });
                setTodo('');
                console.log(addDoc)
                console.log("Data addes successfully")
                getData();
            }

        } catch (error) {
            console.log(error, "someting is wrong")
        }
    }

    // show data in ui

    async function getData() {
        await getDocs(collection(db, "todos")) // req ? resove : reject
            .then((res) => {
                const newData = res.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setTodos(newData);
                console.log(res)
                console.log(todos, newData);
            })
    }

    useEffect(() => {
        getData();
    }, [])



    // delete todo
    const handleDelete = async (id) => {
        const data = doc(db, "todos", id)
        await deleteDoc(data);

        let deleteddata = todos.filter((item) => item.id != id)
        setTodos(deleteddata);

    }

    // Edit function ;
    const handleEdit = (item) => {
        setIsEditId(item.id);
        setTodo(item.todo)
    }





    return (
        <div>

            <form onSubmit={handleForm} >
                <input value={todo} onChange={(e) => setTodo(e.target.value)} type="text" placeholder='Add your todo...' />
                <button >   {isEditId ? "Update" : "Add todo"}</button>
            </form>


            <div>
                {
                    todos.map((item) => {
                        return <div style={{ border: "1px solid white", padding: "10px", margin: "10px" }} key={item.id}>
                            <h3>{item.todo}</h3>
                            <button onClick={() => handleDelete(item.id)}>Delete</button>
                            <button onClick={() => handleEdit(item)} >   Edit</button>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
