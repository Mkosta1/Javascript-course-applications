import { MouseEvent, useEffect } from "react";
import {useState} from "react";
import {useContext} from "react";
import { JwtContext } from "../Root";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { IUserAtCompetitionData } from "../../dto/UserAtCompetition/IUserAtCompetitionData";
import {UserAtCompetitionService} from "../../Services/UserAtCompetition Service/UserAtCompetitionService"
import UserAtCompetition from "./UserAtCompetition";
import { IUserInfoProps } from "../../dto/IUserInfoProps";


const UserAtCompetitionAdd = () => {
    const navigate = useNavigate();

    const [values, setInput] = useState({
        competitionId: "",
        appUserId: ""
    } as IUserAtCompetitionData);

    const [validationErrors, setValidationErrors] = useState([] as string[]);


    const handleChange = (target: EventTarget & HTMLInputElement | HTMLSelectElement) => {
        
        setInput({ ...values, 
            [target.name]: target.value, });
        
    }

    const {jwtResponse, setJwtResponse} = useContext(JwtContext);

    const [data, setData] = useState([] as IUserAtCompetitionData[]);
    
    const userAtCompetitionService = new UserAtCompetitionService(setJwtResponse!);


    useEffect(() => {
        if (jwtResponse) {
            userAtCompetitionService.getAll(jwtResponse).then(
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

    const onSubmit = async (event: MouseEvent) => {
        // console.log('onSubmit', event);
        event.preventDefault();
    
    let quit = false;

    data
    .filter(userid => userid.appUserId === userId)
    .map(thing => {       
            if(values.competitionId == thing.competitionId){
                setValidationErrors(["You are already registred!"]);
                quit = true;
            }      
    })


    
    if (quit) {
        return;
    }
        

        // remove errors
        setValidationErrors([]);

        var jwtData = await userAtCompetitionService.postComp(jwtResponse!, values);

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
        <UserAtCompetition values={values} handleChange={handleChange} validationErrors={validationErrors} onSubmit={onSubmit} />
    );
}

export default UserAtCompetitionAdd;
