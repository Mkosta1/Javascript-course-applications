import { MouseEvent } from "react";
import {useState} from "react";
import {useContext} from "react";
import { JwtContext } from "../Root";
import { useNavigate } from "react-router-dom";

import { CompetitionRemoveService } from "../../Services/Competition Service/CompetitionRemoveService";
import { ILocationRemoveData } from "../../dto/Location/ILocationRemoveData";
import { LocationRemoveService } from "../../Services/Location Service/LocationRemoveService";
import { IExcerciseRemoveData } from "../../dto/Excercise/IExcerciseRemove";
import ExcerciseRemoveForm from "./ExcerciseRemoveForm";
import { ExcerciseRemoveService } from "../../Services/Excercise Service/ExcerciseRemoveService";


const ExcerciseRemove = () => {
    const navigate = useNavigate();

    const [values, setInput] = useState({
        id: ""
    } as IExcerciseRemoveData);

    const [validationErrors, setValidationErrors] = useState([] as string[]);


    const handleChange = (target: EventTarget & HTMLInputElement | HTMLSelectElement) => {
        
        setInput({ ...values, 
            [target.name]: target.value, });
        
    }

    const {jwtResponse, setJwtResponse} = useContext(JwtContext);

    const excerciseRemoveService = new ExcerciseRemoveService(setJwtResponse!);

    const onSubmit = async (event: MouseEvent) => {
        console.log('onSubmit', event);
        event.preventDefault();

        // if (values.appUserId == "" || values.competitionId == "") {
        //     setValidationErrors(["Bad input values!"]);
        //     return;
        // }


        // remove errors
        setValidationErrors([]);

        var jwtData = await excerciseRemoveService.deleteExcercise(jwtResponse!, values);

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
        <ExcerciseRemoveForm values={values} handleChange={handleChange} validationErrors={validationErrors} onSubmit={onSubmit} />
    );
}

export default ExcerciseRemove;
