import { MouseEvent, useEffect } from "react";
import {useState} from "react";
import {useContext} from "react";
import { JwtContext } from "../Root";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { IUserAtCompetitionData } from "../../dto/UserAtCompetition/IUserAtCompetitionData";
import {UserAtCompetitionService} from "../../Services/UserAtCompetition Service/UserAtCompetitionService"
import { IUserInfoProps } from "../../dto/IUserInfoProps";
import UserAtTrainingAddForm from "./UserAtTrainingAddForm";
import { IUserAtTrainingData } from "../../dto/UserAtTraining/IUserAtTrainingData";
import { UserAtTrainingService } from "../../Services/UserAtTrainingService/UserAtTrainingService";


const UserAtTrainingAdd = () => {
    const navigate = useNavigate();

    const [values, setInput] = useState({
        trainingId: "",
        appUserId: "",
        since: null,
        until: null
    } as IUserAtTrainingData);

    const [validationErrors, setValidationErrors] = useState([] as string[]);


    const handleChange = (target: EventTarget & HTMLInputElement | HTMLSelectElement) => {
        
        setInput({ ...values, 
            [target.name]: target.value, });
        
    }

    const {jwtResponse, setJwtResponse} = useContext(JwtContext);

    const [data, setData] = useState([] as IUserAtTrainingData[]);
    
    const userAtTrainingService = new UserAtTrainingService(setJwtResponse!);


    useEffect(() => {
        if (jwtResponse) {
            userAtTrainingService.getAll(jwtResponse).then(
                response => {
                    if (response){
                        setData(response);
                    } else {
                        setData([]);
                    }
                }
            );
        }
    }    
    , []);

    let jwtObject: any = jwt_decode(jwtResponse!.jwt);

    const UserInfo = (props: IUserInfoProps) => {
        return (
            props.jwtObject['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
            //UserInfo(jwtObject={jwtObject})
        );
    }

    let userId = UserInfo(jwtObject={jwtObject});

    let quit = false;


    const onSubmit = async (event: MouseEvent) => {
        // console.log('onSubmit', event);
        event.preventDefault();

    
    data
    .filter(userid => userid.appUserId === userId)
    .map(thing => {
            if(values.trainingId == thing.trainingId){
                setValidationErrors(["You are already registred!"]);
                quit = true;
            }
    })


    
    if (quit) {
        return;
    }
        


        // remove errors
        setValidationErrors([]);

        var jwtData = await userAtTrainingService.postTraining(jwtResponse!, values);

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
        <UserAtTrainingAddForm values={values} handleChange={handleChange} validationErrors={validationErrors} onSubmit={onSubmit} />
    );
}

export default UserAtTrainingAdd;
