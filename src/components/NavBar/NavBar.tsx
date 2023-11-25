import { useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap"
import { Basket, Person } from "react-bootstrap-icons"
import { useNavigate } from "react-router-dom"
import { Task } from "../../types/Task";
import { TaskService } from "../../services/TaskService";
import { toast } from "react-toastify";
import ModalAgregarTarea from "../ModalAgregarTarea/ModalAgregarTarea";

const NavBar = () => {
    const navigate = useNavigate();
    const [showModal,setShowModal]=useState(false);

    


    const handleShowModal=()=>{
        setShowModal(true);
    };
    const handleCloseModal=()=>{
        setShowModal(false);
    };


    //agregar nueva tarea

    const createTask=async (newTask:Task)=>{
        try {
            const result=await TaskService.createTask(newTask);
            console.log('Nueva tarea Agregada:',result.id);
            navigate(`/detalle/${result.id}`);//ir al detalle de la tarea creada

            //muestra una notificacion de exito itulizando react-toastify

            toast.success('Tarea creada correctamente',{
                position:toast.POSITION.TOP_RIGHT,
                autoClose:2000,//cerrar automaticamente despues de 2 seg
            });
            
            
        } catch (error) {

            //}muestra una notificacion de un error si la creacion de la tarea falla
            toast.error('Error al crear la tarea:',{
                position:toast.POSITION.TOP_RIGHT,
                autoClose:2000,
            });
            console.error('Error al crear la tarea: ',error);

            
        }
    }





    return (
        <>
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Desarrollo en Argentina</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="me-auto">

                        <Nav.Link onClick={()=>navigate('/')}>Inicio</Nav.Link>

                        <NavDropdown title="Tareas" id="basic-nav-dropdown">
                            <NavDropdown.Item  href="#PORHACER">Por hacer</NavDropdown.Item>
                            <NavDropdown.Item href="#ENPRODUCCION">En Produccion </NavDropdown.Item>
                            <NavDropdown.Item href="#PORTESTEAR">Por testear</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#COMPLETADA">Completada</NavDropdown.Item>

                        </NavDropdown>
                        {/* agregar una tarea */}
                        <Nav.Link  onClick={handleShowModal}>Agregar una Tarea</Nav.Link>
                    </Nav>
                    <Nav className="d-none d-md-flex ms-auto">
                        <Nav.Link href="#carrito">
                            <Basket />
                        </Nav.Link>
                        <Nav.Link href="#usuario">
                            <Person />
                        </Nav.Link>
                    </Nav>

                    <div className="d-md-none">
                        <ul className="navbar-nav me-auto-mb-2 mb-md-0">
                            <li className="nav-item">
                                <a className="nav-link" href="#ticket">Ticket</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#perfil">Perfil</a>
                            </li>
                        </ul>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <ModalAgregarTarea showModal={showModal} handleClose={handleCloseModal} createTask={createTask} /> 
        </>
    )
}

export default NavBar