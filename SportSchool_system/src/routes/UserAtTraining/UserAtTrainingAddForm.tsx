import { MouseEvent, useContext, useEffect } from "react";
import { ICompetitionData } from "../../dto/Competition/ICompetitionData";

import jwt_decode from "jwt-decode";
import React, { useRef, useState } from 'react';
import { JwtContext } from "../Root";
import { IUserAtCompetitionData } from "../../dto/UserAtCompetition/IUserAtCompetitionData";
import { CompetitionService } from "../../Services/Competition Service/CompetitionService";
import { useParams } from "react-router-dom";
import { IUserInfoProps } from "../../dto/IUserInfoProps";
import { IUserAtTrainingData } from "../../dto/UserAtTraining/IUserAtTrainingData";
import { TrainingService } from "../../Services/Training Service/TrainingService";
import { ITrainingData } from "../../dto/Training/ITrainingData";


interface IProps {
    values: IUserAtTrainingData;

    validationErrors: string[];

    handleChange: (target: EventTarget & HTMLInputElement | HTMLSelectElement) => void;

    onSubmit: (event: MouseEvent) => void;

}



const UserAtTrainingAddForm = (props: IProps) => {
    const { jwtResponse, setJwtResponse } = useContext(JwtContext);
    const trainingService = new TrainingService(setJwtResponse!);

    const [data, setData] = useState([] as ITrainingData[]);


    const { id } = useParams()
    
    useEffect(() => {
        if (jwtResponse) {
            trainingService.getAll(jwtResponse).then(
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

    const cleanId = id!.replace('id:', '');

    const mappedArray = data
    .filter(item => item.id === cleanId)
    .map(item => (
      <div key={item.id}>{item.name}</div>
    ));

    const sinceArray = data
    .filter(item => item.id === cleanId)
    .map(item => (
      item.since
    ));

    const untilArray = data
    .filter(item => item.id === cleanId)
    .map(item => (
      item.until
    ));


    const UserInfo = (props: IUserInfoProps) => {
        return (
            props.jwtObject['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
        );
    }
   


    return (
        
        <form className="form-signin w-100 m-auto">

                <ul style={{'display': props.validationErrors.length == 0 ? 'none' : ''}}>
                <li>{props.validationErrors.length > 0 ? props.validationErrors[0] : ""}</li>
            </ul> 

            <h2>You want to join {mappedArray} training?</h2>
            <input type="checkbox" name="trainingId" value={cleanId}  onChange={(e) => props.handleChange(e.target)}/>
            <label className="form-check-label">
            <b> Training name:{mappedArray}</b>
            </label>
            <br></br>
            <input type="checkbox" name="since" value={sinceArray.toString()} onChange={(e) => props.handleChange(e.target)}/>
            <label className="form-check-label">
            </label>
            <b>Training start at:</b> {sinceArray.toString()}
            <br></br>
            <input type="checkbox" name="until" value={untilArray.toString()} onChange={(e) => props.handleChange(e.target)}/>
            <label className="form-check-label">
            </label>
            <b>Training ends at:</b>{untilArray.toString()}
            <br></br>
            <input type="checkbox" name="appUserId" value={UserInfo(jwtObject={jwtObject})} onChange={(e) => props.handleChange(e.target)}/>
            <label className="form-check-label">
            <b>Do you realy want to join?</b>
            </label>
            <button
                onClick={(e) => props.onSubmit(e)}
                id="registerSubmit" className="w-100 btn btn-lg btn-primary">Join training</button>

        </form>
        
    );
}

export default UserAtTrainingAddForm;
