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



const UserCompetitionList = () => {
    const { jwtResponse, setJwtResponse } = useContext(JwtContext);
    const userAtCompetitionService = new UserAtCompetitionService(setJwtResponse!);

    const competitionService = new CompetitionService(setJwtResponse!);

    const [data, setData] = useState([] as IUserAtCompetitionData[]);

    const [info, setCompetitionData] = useState([] as ICompetitionData[]);

    const [date, setDate] = useState('');
    const [datee, setDatee] = useState('');


    const { id } = useParams()
    
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
            competitionService.getAll(jwtResponse).then(
                response => {
                    if (response){
                        setCompetitionData(response);
                    } else {
                        setCompetitionData([]);
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
    .filter(user => user.appUserId == userId)
    .map(item => (
        info.map(comp => 
            {
                if(comp.id == item.competitionId){
                    return <div>
                            <div className="row align-items-start">
                            <div className="col">
                            <br></br>
                              <b>Competition name:</b> {comp.name}
                              <br></br>
                             <b> Date: </b>{comp.since?.toString()} - {comp.until?.toString()}
                            </div>
                            <div className="col">
                            <br></br>
                            <Link to={`/UserAtCompetitionRemove/id:${item.id}`} className="btn btn-danger">Remove</Link>
                            </div>
                            </div>
                        </div>
                }
            }
            )
    ));
 


    return (
        <>
            <b> Competition name:</b>  {mappedArray} 
            </>  
    );
}

export default UserCompetitionList;
