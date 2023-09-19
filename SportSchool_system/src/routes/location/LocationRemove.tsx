import { MouseEvent } from "react";
import {useState} from "react";
import {useContext} from "react";
import { JwtContext } from "../Root";
import { useNavigate } from "react-router-dom";

import { CompetitionRemoveService } from "../../Services/Competition Service/CompetitionRemoveService";
import { ILocationRemoveData } from "../../dto/Location/ILocationRemoveData";
import { LocationRemoveService } from "../../Services/Location Service/LocationRemoveService";
import LocationRemoveForm from "./LocationRemoveForm";


const LocationRemove = () => {
    const navigate = useNavigate();

    const [values, setInput] = useState({
        id: ""
    } as ILocationRemoveData);

    const [validationErrors, setValidationErrors] = useState([] as string[]);


    const handleChange = (target: EventTarget & HTMLInputElement | HTMLSelectElement) => {
        
        setInput({ ...values, 
            [target.name]: target.value, });
        
    }

    const {jwtResponse, setJwtResponse} = useContext(JwtContext);

    const competitionRemoveService = new LocationRemoveService(setJwtResponse!);

    const onSubmit = async (event: MouseEvent) => {
        console.log('onSubmit', event);
        event.preventDefault();

        // if (values.appUserId == "" || values.competitionId == "") {
        //     setValidationErrors(["Bad input values!"]);
        //     return;
        // }


        // remove errors
        setValidationErrors([]);

        var jwtData = await competitionRemoveService.deleteLocation(jwtResponse!, values);

        if (jwtData === undefined) {
            // TODO: get error info
            setValidationErrors(["no jwt"]);
            return;
        } 

        if (setJwtResponse){
            setJwtResponse(jwtResponse);
            navigate("/location");
       }
       

    }

    return (
        <LocationRemoveForm values={values} handleChange={handleChange} validationErrors={validationErrors} onSubmit={onSubmit} />
    );
}

export default LocationRemove;
