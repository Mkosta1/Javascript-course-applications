import { MouseEvent } from "react";
import {useState} from "react";
import {useContext} from "react";
import { JwtContext } from "../Root";
import { useNavigate } from "react-router-dom";
import { ICompetitionData } from "../../dto/Competition/ICompetitionData";
import { CompetitionService } from "../../Services/Competition Service/CompetitionService";
import { ITrainingData } from "../../dto/Training/ITrainingData";
import { TrainingService } from "../../Services/Training Service/TrainingService";
import TrainingAddForm from "./TrainingAddForm";


const TrainingAdd = () => {
    const navigate = useNavigate();

    const [values, setInput] = useState({
        name: "",
        since: null,
        until: null,
        duration: 0,
        locationId: "",
        excerciseId: "",
    } as ITrainingData);

    const [validationErrors, setValidationErrors] = useState([] as string[]);
    

    const handleChange = (target: EventTarget & HTMLInputElement | HTMLSelectElement) => {
        
        setInput({ ...values, 
            [target.name]: target.value, });
        
    }

    const {jwtResponse, setJwtResponse} = useContext(JwtContext);

    const trainingService = new TrainingService(setJwtResponse!);

    const onSubmit = async (event: MouseEvent) => {
        console.log('onSubmit', event);
        event.preventDefault();

        if (values.name.length == 0 || values.duration == 0 || values.locationId == "" || values.excerciseId == "")  {
            setValidationErrors(["Bad input values!"]);
            return;
        }


        // remove errors
        setValidationErrors([]);

        var jwtData = await trainingService.postTraining(jwtResponse!, values);

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
        <TrainingAddForm values={values} handleChange={handleChange} onSubmit={onSubmit} validationErrors={validationErrors} />
    );
}

export default TrainingAdd;
