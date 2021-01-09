import React,{createContext,useState,useEffect} from 'react'
import axios from 'axios';
export const RecetasContext =createContext();

const RecetasProvider=(props)=>{
    const [recetas,setRecetas]=useState([]);
    const [buscarRecetas,setBuscarRecetas]=useState({
        nombre:'',
        categoria:''
    });
     const [consultar,setConsultar]=useState(false)
    const {nombre,categoria}=buscarRecetas;

    useEffect(()=>{
        if(consultar){

            const obtenerRecetas= async()=>{
                const url=`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
                const resultado= await axios.get(url);
                setRecetas(resultado.data.drinks);
               
                setConsultar(false)
                
            }
            obtenerRecetas();
        }
         // eslint-disable-next-line
    },[buscarRecetas])
    return(
        <RecetasContext.Provider
            value={{
                setBuscarRecetas, setConsultar,recetas
            }}
        >
            {props.children}
        </RecetasContext.Provider>
    )
}

export default RecetasProvider;