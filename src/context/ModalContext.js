import React,{createContext,useEffect,useState} from 'react'
import axios from 'axios';

export const ModalContext=createContext();

const ModalProvider=(props)=>{

    const [idReceta,setIdReceta]=useState(null);
    const [info,setReceta]= useState({})

    useEffect(()=>{
        const ObtenerReceta= async ()=>{
            if(!idReceta) return;
                const url= `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`;
                const resultado= await axios.get(url);
                setReceta(resultado.data.drinks[0]);
            
        }
        ObtenerReceta();
    },[idReceta])
    return(
        <ModalContext.Provider
            value={{
                setIdReceta,
                info,
                setReceta
            }}
        >
            {props.children}
        </ModalContext.Provider>
    )
} 

export default ModalProvider