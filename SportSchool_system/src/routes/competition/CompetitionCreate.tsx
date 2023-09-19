import { MouseEvent } from "react";
import {useState} from "react";
import {useContext} from "react";
import { JwtContext } from "../Root";
import { useNavigate } from "react-router-dom";
import CompetitionCreateForm from "./CompetitionCreateForm";
import { ICompetitionData } from "../../dto/Competition/ICompetitionData";
import { CompetitionService } from "../../Services/Competition Service/CompetitionService";


const CompetitionCreate = () => {
    const navigate = useNavigate();

    const [values, setInput] = useState({
        name: "",
        groupSize: 0,
        since: null,
        until: null,
        locationId: ""
    } as ICompetitionData);

    const [validationErrors, setValidationErrors] = useState([] as string[]);
    

    const handleChange = (target: EventTarget & HTMLInputElement | HTMLSelectElement) => {
        
        setInput({ ...values, 
            [target.name]: target.value, });
        
    }

    const {jwtResponse, setJwtResponse} = useContext(JwtContext);

    const competitionService = new CompetitionService(setJwtResponse!);

    const onSubmit = async (event: MouseEvent) => {
        console.log('onSubmit', event);
        event.preventDefault();

        if (values.name.length == 0 || values.groupSize < 0 || values.locationId == "" ) {
            setValidationErrors(["Bad input values!"]);
            return;
        }


        // remove errors
        setValidationErrors([]);

        var jwtData = await competitionService.postComp(jwtResponse!, values);

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
        <CompetitionCreateForm values={values} handleChange={handleChange} onSubmit={onSubmit} validationErrors={validationErrors} />
    );
}

export default CompetitionCreate;
