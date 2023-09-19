import { MouseEvent } from "react";
import {useState} from "react";
import {useContext} from "react";
import { JwtContext } from "../Root";
import { useNavigate } from "react-router-dom";
import { TrainingRemoveService } from "../../Services/Training Service/TrainingRemoveService";
import { ITrainingRemoveData } from "../../dto/Training/ITrainingRemoveData";
import TrainingRemoveForm from "./TrainingRemoveForm";


const TrainingRemove = () => {
    const navigate = useNavigate();

    const [values, setInput] = useState({
        id: ""
    } as ITrainingRemoveData);

    const [validationErrors, setValidationErrors] = useState([] as string[]);


    const handleChange = (target: EventTarget & HTMLInputElement | HTMLSelectElement) => {
        
        setInput({ ...values, 
            [target.name]: target.value, });
        
    }

    const {jwtResponse, setJwtResponse} = useContext(JwtContext);

    const trainingRemoveService = new TrainingRemoveService(setJwtResponse!);

    const onSubmit = async (event: MouseEvent) => {
        console.log('onSubmit', event);
        event.preventDefault();

        // if (values.appUserId == "" || values.competitionId == "") {
        //     setValidationErrors(["Bad input values!"]);
        //     return;
        // }


        // remove errors
        setValidationErrors([]);

        var jwtData = await trainingRemoveService.deleteTraining(jwtResponse!, values);

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
        <TrainingRemoveForm values={values} handleChange={handleChange} validationErrors={validationErrors} onSubmit={onSubmit} />
    );
}

export default TrainingRemove;
