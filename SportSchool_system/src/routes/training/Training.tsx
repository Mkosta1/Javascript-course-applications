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
import { ITrainingData } from "../../dto/Training/ITrainingData";
import { TrainingService } from "../../Services/Training Service/TrainingService";
import { LocationService } from "../../Services/Location Service/LocationService";
import { ILocationData } from "../../dto/Location/ILocationData";
import { ExcerciseService } from "../../Services/Excercise Service/ExcerciseService";
import { IExcerciseData } from "../../dto/Excercise/IExcerciseData";
import { UserGroupService } from "../../Services/UserGroup/UserGroupService";
import { UserInGroupService } from "../../Services/UserInGroup/UserInGroupService";
import { IUserGroupData } from "../../dto/UserGroup/IUserGroupData";
import { IUserInGroupData } from "../../dto/UserInGroup/IUserInGroupData";



const Training = () => {
    const { jwtResponse, setJwtResponse } = useContext(JwtContext);

    const trainingService = new TrainingService(setJwtResponse!);

    const [data, setData] = useState([] as ITrainingData[]);

    const locationService = new LocationService(setJwtResponse!);

    const [location, setLocation] = useState([] as ILocationData[]);

    const excerciseService = new ExcerciseService(setJwtResponse!);

    const [excercise, setExcercise] = useState([] as IExcerciseData[]);

    const currentDate = new Date();
    
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

    useEffect(() => {
        if (jwtResponse) {
            locationService.getAll(jwtResponse).then(
                response => {
                    if (response){
                        setLocation(response);
                    } else {
                        setLocation([]);
                    }
                }
            );
        }
    }    
    , []);

    useEffect(() => {
        if (jwtResponse) {
            excerciseService.getAll(jwtResponse).then(
                response => {
                    if (response){
                        setExcercise(response);
                    } else {
                        setExcercise([]);
                    }
                }
            );
        }
    }    
    , []);

    let jwtObject: any = jwt_decode(jwtResponse!.jwt);


    const UserId = (props: IUserInfoProps) => {
        return (
            props.jwtObject['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
            //UserInfo(jwtObject={jwtObject})
        );
    }

    
    let userId = UserId(jwtObject={jwtObject})

    const userGroupService = new UserGroupService(setJwtResponse!);
    const userInGroupService = new UserInGroupService(setJwtResponse!);

    const [group, setGroup] = useState([] as IUserGroupData[]);
    const [inGroup, setInGroup] = useState([] as IUserInGroupData[]);

    useEffect(() => {
        if (jwtResponse) {
            userGroupService.getAll(jwtResponse).then(
                response => {
                    if (response){
                        setGroup(response);
                    } else {
                        setGroup([]);
                    }
                }
            );
        }
    }, []);

    useEffect(() => {
        if (jwtResponse) {
            userInGroupService.getAll(jwtResponse).then(
                response => {
                    if (response){
                        setInGroup(response);
                    } else {
                        setInGroup([]);
                    }
                }
            );
        }
    }, []);



    const finalRole = inGroup
    .map(data => {
        if(data.appUserId == userId){
            return data.userGroupId
        }
    })

    const userRole = group
    .map(item => {
        if(item.id == finalRole.toString()){
            return item.name;
        }
    })
    


    const trainingsMapp = 
    excercise.map(excercise => (
    location.map(location => (
    data.map(train => {
        const correctSince = new Date(train.since!);
        const correctCurrent = currentDate.toLocaleDateString('en-US');
        const correctDb = correctSince.toLocaleDateString('en-US');
        if(excercise.id == train.excerciseId){
        if(location.id == train.locationId){
        return  <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    <b>{train.name} at {train.since?.toString()} </b>
                    </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                    <strong>Training duration is:</strong> {train.duration} minutes<br></br>
                    <strong>Training start at:</strong> {train.since?.toString()}<br></br>
                    <strong>Training ends at:</strong> {train.until?.toString()}<br></br>
                    <strong>Location:</strong> {location.name}<br></br>
                    <strong>We will do</strong> {excercise.name} <strong>and difficulty is</strong> {excercise.level}<br></br>
                    <Link hidden={correctCurrent < correctDb ? false : true} to={`/userAtTrainingAdd/id:${train.id}`} className="card-link"><b>Join</b></Link><br></br>
                    <div hidden={correctCurrent < correctDb ? true : false} className="card-link"><b>ENDED</b></div><br></br>
                    <Link hidden={userRole.toString() == ",COACH" ? false : true} to={`/trainingRemove/id:${train.id}`} className="card-link"><b>Remove</b></Link><br></br>
                    {/* <Link hidden={userRole == "COACH" && correctCurrent < correctDb ? false : true} to={`/usersAtTraining/id:${train.id}`} className="card-link"><b>List of people who have joined</b></Link> */}
                    </div>
                </div>
                </div>
                
   
    }} })))))



    return (
        <>
        <h1>Sportschool trainings</h1>
            <b><Link hidden={userRole.toString() == ",COACH" ? false : true} to="/trainingAdd">Add new training</Link></b><br></br>
            <b><Link hidden={userRole.toString() == ",COACH" ? false : true} to="/usersAttendingTraining">Users Attending trainings</Link></b><br></br>
            <b><Link to="/usersAtTraining">My joined trainings</Link></b>
            <div className="accordion" id="accordionExample">
                {trainingsMapp} 
            </div>
        </>
    );
}

export default Training;
