import React,{useState} from "react";
import uniqid from 'uniqid';

const ListadoNombres = () => {
   //logica de comportamiento

   //useState para guardar el nombre del input de introducir el nombre
   const [nombre, setNombre] = useState('');
   //useState para guardar el listado de nombres al apretar el boton submit
   const[listaNombres,setListaNombres] = useState([]);
   //useState para sabe en que modo estamos (modo edicion, modo agregar)
   const[modoEdicion,setModoEdicion] = useState(false);
   //useState para obtener el id creado para el nombre dentro de la lista Array y poder editarlo (reemplazarlo)
   const [id, setId] = useState('');
   //useState para mostrar mensajes de errores
   const [error,setError] = useState(null);

   //agregamos un numbre al array
    const AddNombre = (e)=>{
        e.preventDefault();
        if(!nombre.trim()){
            //console.log("El campo nombre esta vacio");
            setError("El campo nombre esta vacio");
            return;
        }
        const nuevoNombre ={
            id: uniqid(),
            tituloNombre: nombre
        }
        setListaNombres([...listaNombres, nuevoNombre]);
        setNombre('');
        setError(null);
    }

    //filtramos un nuevo array sin el id que le pasamos y lo reemplazamos por el array original simulando que borramos
    const DeleteNombre=(id) =>{
        const nuevoArray = listaNombres.filter(item => item.id !== id);
        setListaNombres(nuevoArray);
    }

   //Editar el nombre del boton y pasar el nombre al input de registrar nombre
   const Editar = (item) =>{
        setModoEdicion(true);
        setNombre(item.tituloNombre);
        setId(item.id);
    }

    //Editar el nombre que ahora esta en el input
    const EditarNombre = (item) =>{
        item.preventDefault();
        const nuevoArray = listaNombres.map(item => item.id === id ? {id: id, tituloNombre: nombre} : item);
        setListaNombres(nuevoArray);
        setModoEdicion(false);
        setNombre('');
    }


   //En el return va solo lo que se va a renderizar en el HTML
    return(
        <div>
            <h1>CRUD Basico en un Lista</h1>
            <div className="row">
                <div className="col"> 
                    <h2>Listado de nombres </h2>
                    <ul className="list-group">
                        {
                        listaNombres.map(item => 
                            <li key={item.id} className="list-group-item">
                                {item.tituloNombre} 
                                <button className="btn btn-danger" onClick={ () => {DeleteNombre(item.id)} }>
                                    Borrar
                                </button> 
                                <button className="btn btn-info" onClick={ () => {Editar(item)} }>
                                    Editar
                                </button>
                            </li>)
                        }
                    </ul>
                </div>
                <div className="col">
                    <h2>Formulario para añadir nombres</h2>
                    <form onSubmit={ modoEdicion ? EditarNombre : AddNombre } className="form-group">
                        <input onChange={(e)=>{setNombre(e.target.value)}}className="form-control mb-3" type="text" placeholder="introduce nombre" value={nombre}></input>
                        <input className="btn btn-info" type="submit" value={modoEdicion ? 'Editar nombre' : 'Registrar nombre'} />
                    </form>
                    {error != null ? (<div className="alert alert-danger">{error}</div>) : (<div></div>)}
                </div>
            </div>
        </div>
    )
}
export default ListadoNombres