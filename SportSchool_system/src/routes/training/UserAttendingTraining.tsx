import { MouseEvent, useContext, useEffect } from "react";
import { ICompetitionData } from "../../dto/Competition/ICompetitionData";

import jwt_decode from "jwt-decode";
import React, { useRef, useState } from 'react';
import { JwtContext } from "../Root";
import { IUserAtCompetitionData } from "../../dto/UserAtCompetition/IUserAtCompetitionData";
import { CompetitionService } from "../../Services/Competition Service/CompetitionService";
import { useParams } from "react-router-dom";
import { IUserInfoProps } from "../../dto/IUserInfoProps";
import { UserAtCompetitionService } from "../../Services/UserAtCompetition Service/UserAtCompetitionService";
import { Link } from "react-router-dom";
import { IUserAtCompetitionDataRemove } from "../../dto/UserAtCompetition/IUserAtCompetitionDataRemove";
import { UserAtTrainingService } from "../../Services/UserAtTrainingService/UserAtTrainingService";
import { TrainingService } from "../../Services/Training Service/TrainingService";
import { IUserAtTrainingData } from "../../dto/UserAtTraining/IUserAtTrainingData";
import { ITrainingData } from "../../dto/Training/ITrainingData";



const UsersAttendingTraining = () => {
    const { jwtResponse, setJwtResponse } = useContext(JwtContext);

    const userAtTrainingService = new UserAtTrainingService(setJwtResponse!);

    const trainingService = new TrainingService(setJwtResponse!);

    const [data, setData] = useState([] as IUserAtTrainingData[]);

    const [info, setTrainingData] = useState([] as ITrainingData[]);

    const [date, setDate] = useState('');
    const [datee, setDatee] = useState('');


    const { id } = useParams()
    
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
            trainingService.getAll(jwtResponse).then(
                response => {
                    if (response){
                        setTrainingData(response);
                    } else {
                        setTrainingData([]);
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


    const mappedArray = data
    .map(item => (
        info.map(comp => 
            {
                if(comp.id == item.trainingId){
                    return <div>
                            <div className="row align-items-start">
                            <div className="col">
                            <br></br>
                              <b>Training name:</b> {comp.name}
                              <br></br>
                              <b>User id:</b> {item.appUserId}
                              <br></br>
                             <b> Date: </b>{comp.since?.toString()} - {comp.until?.toString()}
                             <Link to={`/UserAtTrainingRemove/id:${item.id}`} className="btn btn-danger">Remove user from training</Link>
                            </div>
                            </div>
                        </div>
                }
            }
            )
    ));
 


    return (
        <>
            <b> Training name:</b>  {mappedArray} 
            </>  
    );
}

export default UsersAttendingTraining;
