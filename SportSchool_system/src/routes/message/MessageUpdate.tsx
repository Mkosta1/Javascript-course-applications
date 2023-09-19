import { MouseEvent } from "react";
import {useState} from "react";
import {useContext} from "react";
import { JwtContext } from "../Root";
import { useNavigate } from "react-router-dom";
import { ICompetitionData } from "../../dto/Competition/ICompetitionData";
import { CompetitionService } from "../../Services/Competition Service/CompetitionService";
import { ITrainingData } from "../../dto/Training/ITrainingData";
import { TrainingService } from "../../Services/Training Service/TrainingService";
import { IMessageData } from "../../dto/Message/IMessageData";
import { MessageService } from "../../Services/Message Service/MessageService";
import MessageAddForm from "./MessageAddForm";
import { MessageRemoveService } from "../../Services/Message Service/MessageRemoveService";
import MessageUpdateForm from "./MessageUpdateForm";


const MessageUpdate = () => {
    const navigate = useNavigate();

    const [values, setInput] = useState({
        id: "",
        subject: "",
        content: "",
        date: null
    } as IMessageData);

    const [validationErrors, setValidationErrors] = useState([] as string[]);
    

    const handleChange = (target: EventTarget & HTMLInputElement | HTMLSelectElement) => {
        
        setInput({ ...values, 
            [target.name]: target.value, });
        
    }

    const {jwtResponse, setJwtResponse} = useContext(JwtContext);

    const messageService = new MessageRemoveService(setJwtResponse!);

    const onSubmit = async (event: MouseEvent) => {
        console.log('onSubmit', event);
        event.preventDefault();

        if (values.subject == "" || values.content == "")  {
            setValidationErrors(["Bad input values!"]);
            return;
        }


        // remove errors
        setValidationErrors([]);

        var jwtData = await messageService.updateMessage(jwtResponse!, values);

        if (jwtData === undefined) {
            // TODO: get error info
            setValidationErrors(["no jwt"]);
            return;
        } 

        if (setJwtResponse){
            setJwtResponse(jwtResponse);
            navigate("/message");
       }
       

    }

    return (
        <MessageUpdateForm values={values} handleChange={handleChange} onSubmit={onSubmit} validationErrors={validationErrors} />
    );
}

export default MessageUpdate;
