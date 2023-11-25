import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Task } from "../../types/Task";
import { TaskService } from "../../services/TaskService";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

const DetalleTarea = () => {
  const { taskId } = useParams<{ taskId?: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [estado, setEstado] = useState<string>('');
  const [relatedTasks, setRelatedTasks] = useState<Task[]>([]);

  const navigate = useNavigate();//redirigir al ususario a la pagina principal

  //obtener Tarea

  useEffect(() => {

    const fetchTask = async () => {
      try {
        if (taskId && !isNaN(parseInt(taskId, 10))) {
          const taskData = await TaskService.getOneTask(parseInt(taskId, 10));
          setTask(taskData);

          const tasksInCategory = await TaskService.getTasksInCategory(taskData.estado);
          setRelatedTasks(tasksInCategory);
        } else {
          console.error('Identificador de tarea no valido');
        }
      } catch (error) {
        console.error('Error al cargar la tarea: ', error);

      }
    };

    fetchTask();
  }, [taskId]);


  //cambiar estado a una tarea

  const handleUpdateState = async () => {
    if (estado !== '') {
      try {
        const updatedTask = await TaskService.updateStateTask(parseInt(taskId!, 10), estado);
        //actualiza la tarea local con la tarea actualizada
        setTask(updatedTask);
        //muestra una notificacion de exito utilizando reac-toastify
        toast.success('Estado de la tarea actualizado correctamente', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      } catch (error) {
        //maneja errores de la actualizacion de la tarea u muestra una notificacion de error
        toast.error('Error al actualizar el estado de la tarea',{
          position:toast.POSITION.TOP_RIGHT,
          autoClose:2000,
        });
        console.error('Error al actualizar el estado de la tarea: ',error);

      }
    }else{
      //si el estado esta vacio , muestra un mensaje de error y una notificacion
      toast.error('Selecciona un estado valido',{
        position:toast.POSITION.TOP_RIGHT,
        autoClose:2000,
      });
      console.error('Selecciona un estado valido');

    }
  };

  //eliminar tarea

  const handleDeleteTask=async()=>{
    try {
      if(taskId){
        await TaskService.deleteTask(parseInt(taskId,10));
        toast.success('Tarea eliminada correctamente',{
          position:toast.POSITION.TOP_RIGHT,
          autoClose:2000,
        });
        console.log('Tarea eliminada con exito');
        //redirige al usuario ala pagina principal despues de eliminar la tarea
        navigate('/');
        
      }
    } catch (error) {
      toast.error('Error al eliminar la tarea',{
        position:toast.POSITION.TOP_RIGHT,
        autoClose:2000,
      });
      console.error('Eror al eliminar la tarea:',error)
      
    }
  }




  return (
    <div className="container-mt-5">
      {task && (
        <div className="row">
          <div className="col-12 col-md-6">
            <img src={task.imagen} alt={task.titulo} className="card-img-top mb-5" />
          </div>
          <div className="col-12 col-md-6">
            <h1 className="display-5 fw-bolder">Titulo: {task.titulo}</h1>
            <h3>Detalle de la tarea con ID: {task.id}</h3>
            <h5>Estado actual: {task.estado}</h5>
            <p className="lead">Tiempo: {task.tiempo} </p>
            <p className="lead">Responsable: {task.responsable} </p>
            <p className="lead">Descripcion: {task.descripcion} </p>

            <select className="form-select mb-3" onChange={(e)=>setEstado(e.target.value)} value={estado}>
              <option value="">Seleccionar estado</option>
              <option value="PORHACER">Por hacer</option>
              <option value="ENPRODUCCION">En produccion</option>
              <option value="PORTESTEAR">Por testear</option>
              <option value="COMPLETADA">Completada</option>
            </select>
            <button className="btn btn-danger" onClick={handleDeleteTask}>Eliminar tarea</button>
            <button className="btn btn-primary ms-2" onClick={handleUpdateState}>Actualizar estado</button>
          </div>

        </div>
      )}

      <div className="row mt-5">
        {relatedTasks.map((relatedTasks)=>(
          <div className="col-12 col-md-4 mb-4" key={relatedTasks.id}>
            <div className="card">
              <img src={relatedTasks.imagen} alt={relatedTasks.titulo} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{relatedTasks.titulo}</h5>
                <p className="card-text">Tiempo: {relatedTasks.tiempo}</p>
                <p className="card-text">Responsable: {relatedTasks.responsable}</p>

                <Button variant="primary" onClick={()=> navigate(`/detalle/${relatedTasks.id}`)}>Ver mas</Button>
                 

              </div>

            </div>
          </div>
        ))}

      </div>

    </div>
  )
}

export default DetalleTarea