import { MouseEvent, useContext, useEffect } from "react";
import { ICompetitionData } from "../../dto/Competition/ICompetitionData";

import jwt_decode from "jwt-decode";
import React, { useRef, useState } from 'react';
import { JwtContext } from "../Root";
import { IUserAtCompetitionData } from "../../dto/UserAtCompetition/IUserAtCompetitionData";
import { CompetitionService } from "../../Services/Competition Service/CompetitionService";
import { useParams } from "react-router-dom";
import { IUserInfoProps } from "../../dto/IUserInfoProps";


interface IProps {
    values: IUserAtCompetitionData;

    validationErrors: string[];

    handleChange: (target: EventTarget & HTMLInputElement | HTMLSelectElement) => void;

    onSubmit: (event: MouseEvent) => void;

}



const UserAtCompetition = (props: IProps) => {
    const { jwtResponse, setJwtResponse } = useContext(JwtContext);
    const competitionService = new CompetitionService(setJwtResponse!);

    const [data, setData] = useState([] as ICompetitionData[]);

    const [date, setDate] = useState('');
    const [datee, setDatee] = useState('');


    const { id } = useParams()
    
    useEffect(() => {
        if (jwtResponse) {
            competitionService.getAll(jwtResponse).then(
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

            <h2>You want to join {mappedArray} competition?</h2>
            <input type="checkbox" name="competitionId" value={cleanId}  onChange={(e) => props.handleChange(e.target)}/>
            <label className="form-check-label">
            <b> Competition name:{mappedArray}</b>
            </label>
            <br></br>
            
            <input type="checkbox" name="appUserId" value={UserInfo(jwtObject={jwtObject})} onChange={(e) => props.handleChange(e.target)}/>
            <label className="form-check-label">
            <b>Do you really want to join?</b>
            </label>
            <button
                onClick={(e) => props.onSubmit(e)}
                id="registerSubmit" className="w-100 btn btn-lg btn-primary">Join competition</button>

        </form>
        
    );
}

export default UserAtCompetition;
