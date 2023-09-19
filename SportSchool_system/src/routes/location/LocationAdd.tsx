import { MouseEvent, useEffect } from "react";
import {useState} from "react";
import {useContext} from "react";
import { JwtContext } from "../Root";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { IUserAtCompetitionData } from "../../dto/UserAtCompetition/IUserAtCompetitionData";
import {UserAtCompetitionService} from "../../Services/UserAtCompetition Service/UserAtCompetitionService"
import { IUserInfoProps } from "../../dto/IUserInfoProps";
import { ILocationData } from "../../dto/Location/ILocationData";
import { LocationService } from "../../Services/Location Service/LocationService";
import LocationAddForm from "./LocationAddForm";


const LocationAdd = () => {
    const navigate = useNavigate();

    const [values, setInput] = useState({
        name: "",
        address: "",
    } as ILocationData);

    const [validationErrors, setValidationErrors] = useState([] as string[]);


    const handleChange = (target: EventTarget & HTMLInputElement | HTMLSelectElement) => {
        
        setInput({ ...values, 
            [target.name]: target.value, });
        
    }

    const {jwtResponse, setJwtResponse} = useContext(JwtContext);
    
    const locationService = new LocationService(setJwtResponse!);


    const onSubmit = async (event: MouseEvent) => {
        // console.log('onSubmit', event);
        event.preventDefault();

       
            if (values.address == "" || values.name == "") {
                setValidationErrors(["Check inputs!"]);
                return;
            }
        


        // remove errors
        setValidationErrors(["help"]);

        var jwtData = await locationService.postLocation(jwtResponse!, values);

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
        <LocationAddForm values={values} handleChange={handleChange} validationErrors={validationErrors} onSubmit={onSubmit} />
    );
}

export default LocationAdd;
