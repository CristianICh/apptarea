import { useEffect, useState } from "react";
import CarouselHome from "../components/CarouselHome/CarouselHome"
import CategoriaSelector from "../components/CategoriaSelector/CategoriaSelector"
import CategoriaTareas from "../components/CategoriaTareas/CategoriaTareas"
import { Task } from "../types/Task";
import { TaskService } from "../services/TaskService";

const LandingPage = () => {

  const [tasks,setTask]=useState<Task[]>([]);
  const [filteredTasks,setFilterdTasks]=useState<Task[]>([]);//estado para almacenar tareas filtradas
  const [selectedCategory,setSelectedCategory]=useState<string>('');//estado para la categoria selecionada

  useEffect(()=>{
    const fetchTasks=async()=>{
      const taskData=await TaskService.getAllTasks();
      setTask(taskData);
    };
    fetchTasks();
  },[]);

  //efecto para filtrar las tareas cuando se seleciona una categoria

  useEffect(()=>{
    if (selectedCategory){
      const filtered=tasks.filter(task=>task.estado.toUpperCase()=== selectedCategory.toUpperCase());
      setFilterdTasks(filtered);

    }else{
      setFilterdTasks(tasks);//si nohay categoria selecionada , mostrar todas las tareas
    }
  },[selectedCategory,tasks]);
  
  return (
    <>
    <CarouselHome/>
    <CategoriaSelector onSelectedCategory={setSelectedCategory}/>
    <CategoriaTareas tasks={filteredTasks.length>0 ? filteredTasks:tasks}/>
    
    
    
    </>
    
  )
}

export default LandingPage