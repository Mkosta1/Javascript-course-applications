import { MouseEvent } from "react";
import {useState} from "react";
import {useContext} from "react";
import { JwtContext } from "../Root";
import { useNavigate } from "react-router-dom";
import { IMessageRemoveData } from "../../dto/Message/IMessageRemoveData";
import { MessageRemoveService } from "../../Services/Message Service/MessageRemoveService";
import MessageRemoveForm from "./MessageRemoveForm";


const MessageRemove = () => {
    const navigate = useNavigate();

    const [values, setInput] = useState({
        id: ""
    } as IMessageRemoveData);

    const [validationErrors, setValidationErrors] = useState([] as string[]);


    const handleChange = (target: EventTarget & HTMLInputElement | HTMLSelectElement) => {
        
        setInput({ ...values, 
            [target.name]: target.value, });
        
    }

    const {jwtResponse, setJwtResponse} = useContext(JwtContext);

    const messageRemoveService = new MessageRemoveService(setJwtResponse!);

    const onSubmit = async (event: MouseEvent) => {
        console.log('onSubmit', event);
        event.preventDefault();

        // if (values.appUserId == "" || values.competitionId == "") {
        //     setValidationErrors(["Bad input values!"]);
        //     return;
        // }


        // remove errors
        setValidationErrors([]);

        var jwtData = await messageRemoveService.deleteMessage(jwtResponse!, values);

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
        <MessageRemoveForm values={values} handleChange={handleChange} validationErrors={validationErrors} onSubmit={onSubmit} />
    );
}

export default MessageRemove;
