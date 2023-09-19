import { MouseEvent } from "react";
import {useState} from "react";
import {useContext} from "react";
import { JwtContext } from "../Root";
import { useNavigate } from "react-router-dom";

import { ICompetitionRemoveData } from "../../dto/Competition/ICompetitionRemoveData";
import { CompetitionRemoveService } from "../../Services/Competition Service/CompetitionRemoveService";
import CompetitionRemoveForm from "./CompetitionRemoveForm";


const CompetitionRemove = () => {
    const navigate = useNavigate();

    const [values, setInput] = useState({
        id: ""
    } as ICompetitionRemoveData);

    const [validationErrors, setValidationErrors] = useState([] as string[]);


    const handleChange = (target: EventTarget & HTMLInputElement | HTMLSelectElement) => {
        
        setInput({ ...values, 
            [target.name]: target.value, });
        
    }

    const {jwtResponse, setJwtResponse} = useContext(JwtContext);

    const competitionRemoveService = new CompetitionRemoveService(setJwtResponse!);

    const onSubmit = async (event: MouseEvent) => {
        console.log('onSubmit', event);
        event.preventDefault();

        // if (values.appUserId == "" || values.competitionId == "") {
        //     setValidationErrors(["Bad input values!"]);
        //     return;
        // }


        // remove errors
        setValidationErrors([]);

        var jwtData = await competitionRemoveService.deleteComp(jwtResponse!, values);

        if (jwtData === undefined) {
            // TODO: get error info
            setValidationErrors(["no jwt"]);
            return;
        } 

        if (setJwtResponse){
            setJwtResponse(jwtResponse);
            navigate("/competition");
       }
       

    }

    return (
        <CompetitionRemoveForm values={values} handleChange={handleChange} validationErrors={validationErrors} onSubmit={onSubmit} />
    );
}

export default CompetitionRemove;
