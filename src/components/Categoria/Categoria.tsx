import { useState , useEffect } from "react";
import { Task } from "../../types/Task";
import CategoriaSelector from "../CategoriaSelector/CategoriaSelector";
import CategoriaTareas from "../CategoriaTareas/CategoriaTareas";
import { TaskService } from "../../services/TaskService";

const Categoria = () => {
  const[tasks,setTasks]= useState<Task[]>([]);
  const[selectedCategory,setSelectedCategory]=useState<string>('');//estado paala categoria seleccionada

  useEffect(()=>{
    const fetchTasks=async()=>{
      const tasksData =await TaskService.getAllTasks();
      setTasks(tasksData);
     };
     fetchTasks();
  },[]);

  //filtra las tareas por la categoria selecionada
  const filteredTasks=selectedCategory
  ?tasks.filter(task=>task.estado.toUpperCase()===selectedCategory.toUpperCase())
  :tasks;

  
  return (
    <div className="container mt-5">
      <CategoriaSelector onSelectedCategory={setSelectedCategory}/> {/* pasa la funcion  para manejar la seleccion de categoria*/}
      <CategoriaTareas tasks={filteredTasks}/>{/**pasa las tareas filtradas al componente categoriastareas */}

    </div>
    
  )
}

export default Categoria