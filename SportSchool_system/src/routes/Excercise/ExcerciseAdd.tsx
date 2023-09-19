import { MouseEvent, useEffect } from "react";
import {useState} from "react";
import {useContext} from "react";
import { JwtContext } from "../Root";

import { useNavigate } from "react-router-dom";
import ExcerciseAddForm from "./ExcerciseAddForm";
import { IExcerciseData } from "../../dto/Excercise/IExcerciseData";
import { ExcerciseService } from "../../Services/Excercise Service/ExcerciseService";


const ExcerciseAdd = () => {
    const navigate = useNavigate();

    const [values, setInput] = useState({
        name: "",
        duration: 0,
        level: ""
    } as IExcerciseData);

    const [validationErrors, setValidationErrors] = useState([] as string[]);


    const handleChange = (target: EventTarget & HTMLInputElement | HTMLSelectElement) => {
        
        setInput({ ...values, 
            [target.name]: target.value, });
        
    }

    const {jwtResponse, setJwtResponse} = useContext(JwtContext);
    
    const excerciseService = new ExcerciseService(setJwtResponse!);


    const onSubmit = async (event: MouseEvent) => {
        // console.log('onSubmit', event);
        event.preventDefault();

       
            if (values.name == "" || values.duration == 0 || values.level == "") {
                setValidationErrors(["Check inputs!"]);
                return;
            }
        


        // remove errors
        setValidationErrors(["help"]);

        var jwtData = await excerciseService.postExcercise(jwtResponse!, values);

        if (jwtData === undefined) {
            // TODO: get error info
            setValidationErrors(["no jwt"]);
            return;
        } 

        if (setJwtResponse){
            setJwtResponse(jwtResponse);
            navigate("/excercise");
       }
       

    }

    return (
        <ExcerciseAddForm values={values} handleChange={handleChange} validationErrors={validationErrors} onSubmit={onSubmit} />
    );
}

export default ExcerciseAdd;
