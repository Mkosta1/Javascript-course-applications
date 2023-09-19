import { MouseEvent } from "react";
import {useState} from "react";
import {useContext} from "react";
import { JwtContext } from "../Root";
import { useNavigate } from "react-router-dom";

import {UserAtCompetitionServiceRemove} from "../../Services/UserAtCompetition Service/UserAtCompetitionServiceRemove"
import { IUserAtTrainingRemoveData } from "../../dto/UserAtTraining/IUserAtTrainingRemoveData";
import { UserAtTrainingServiceRemove } from "../../Services/UserAtTrainingService/UserAtTrainingRemoveService";
import UserAtTrainingRemoveForm from "./UserAtTrainingRemoveForm";


const UserAtTrainingRemove = () => {
    const navigate = useNavigate();

    const [values, setInput] = useState({
        id: ""
    } as IUserAtTrainingRemoveData);

    const [validationErrors, setValidationErrors] = useState([] as string[]);


    const handleChange = (target: EventTarget & HTMLInputElement | HTMLSelectElement) => {
        
        setInput({ ...values, 
            [target.name]: target.value, });
        
    }

    const {jwtResponse, setJwtResponse} = useContext(JwtContext);

    const userAtCompetitionService = new UserAtTrainingServiceRemove(setJwtResponse!);

    const onSubmit = async (event: MouseEvent) => {
        console.log('onSubmit', event);
        event.preventDefault();

        // if (values.appUserId == "" || values.competitionId == "") {
        //     setValidationErrors(["Bad input values!"]);
        //     return;
        // }


        // remove errors
        setValidationErrors([]);

        var jwtData = await userAtCompetitionService.deleteUserTraining(jwtResponse!, values);

        if (jwtData === undefined) {
            // TODO: get error info
            setValidationErrors(["no jwt"]);
            return;
        } 

        if (setJwtResponse){
            setJwtResponse(jwtResponse);
            navigate("/training");
       }
       

    }

    return (
        <UserAtTrainingRemoveForm values={values} handleChange={handleChange} validationErrors={validationErrors} onSubmit={onSubmit} />
    );
}

export default UserAtTrainingRemove;
