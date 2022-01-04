import { useState } from "react";
import shortid from "shortid";
//importamos la libreria shortid para generar identificadores(IDs) aleatorios



function App() {


  const [tarea, setTarea] = useState('')
  const [tareasAgregadas, setTareasAgregadas] = useState([])
  const [modoEditar, setModoEditar] = useState(false)
  const [id, setId] = useState('')
  const [error, setError] = useState(null)


  const agregarTarea = (e) => {
    e.preventDefault()

    if(!tarea.trim()){
      setError("La nota o tarea no puede ir vacia...")
      return
    }

    setTarea('')
    setError(null)

    setTareasAgregadas([
      ...tareasAgregadas,
      {
        id: shortid.generate(),
        nombreTarea: tarea
        //hacemos uso de la libreria shortid utilizando su metodo generate() para generar ids aleatorios cada vez que se agrega una nueva tarea
        //tarea viene del estado: const [tarea, setTarea] = useState('')
      }
    ])
  }


  const eliminarTarea = id => {
    let arrayTareaFiltrada = tareasAgregadas.filter(tarea => tarea.id !== id)
    setTareasAgregadas(arrayTareaFiltrada)
  }

  const modoCrud = (tareas) => {
    setModoEditar(true)
    setTarea(tareas.nombreTarea)
    setId(tareas.id)
  }

  const editarTareas = (e) => {
    e.preventDefault()

    if(!tarea.trim()){
      setError("La nota o tarea no puede ir vacia...")
      return
    }

    const arrayTareaEditada = tareasAgregadas.map(item =>
       item.id === id ? {id, nombreTarea: tarea} : item
      )
    setTareasAgregadas(arrayTareaEditada)

    setModoEditar(false)
    setTarea('')
    setId('')
    setError(null)
    
  }





  return (
    <div className="container mt-3">
      <h1 className="text-center">CRUD DE TAREAS</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">
            Lista de Tareas
          </h4>
          <ul className="list-group">
            {

              tareasAgregadas.length === 0 ? (
                <li className="list-group-item">No hay tareas</li>
              ) : (
                tareasAgregadas.map(tareas => (
                  <li className="list-group-item" key={tareas.id}>
                    <span className="lead">{tareas.nombreTarea}</span>
  
                    <button 
                      className="btn btn-danger btn-sm float-right mx-2"
                      onClick={() => eliminarTarea(tareas.id)}
                    >
                      Eliminar
                    </button>
  
                    <button 
                      className="btn btn-info btn-sm float-right mx-2"
                      onClick={() => modoCrud(tareas)}
                    >
                      Editar
                    </button>
  
                  </li>
                ))
              )
            }
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {
              modoEditar ? "Editar tarea" : "Agregar tarea"
            }
          </h4>
          <form onSubmit={ modoEditar ? editarTareas : agregarTarea }>


          {
            error ? <span className="text-danger">{error}</span> : null
          }

            <input 
              type="text" 
              className="form-control mb2" 
              placeholder="Ingrese tarea"
              onChange={e => setTarea(e.target.value)}
              value={tarea}
            />

            {
              modoEditar ? (
                <button className="btn btn-primary btn-block" type="submit">Editar</button>
              ) : (
                <button className="btn btn-success btn-block" type="submit">Agregar</button>
              )
              
            }
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
