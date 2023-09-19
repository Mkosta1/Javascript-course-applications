import { MouseEvent, useContext, useEffect } from "react";
import React, { useRef, useState } from 'react';
import { ILocationData } from "../../dto/Location/ILocationData";
import { JwtContext } from "../Root";
import { LocationService } from "../../Services/Location Service/LocationService";
import { ITrainingData } from "../../dto/Training/ITrainingData";
import { ExcerciseService } from "../../Services/Excercise Service/ExcerciseService";
import { IExcerciseData } from "../../dto/Excercise/IExcerciseData";


interface IProps {
    values: ITrainingData;

    validationErrors: string[];

    handleChange: (target: EventTarget & HTMLInputElement | HTMLSelectElement) => void;

    onSubmit: (event: MouseEvent) => void;

}



const TrainingAddForm = (props: IProps) => {
    const { jwtResponse, setJwtResponse } = useContext(JwtContext);
    
    const locationService = new LocationService(setJwtResponse!);

    const [data, setData] = useState([] as ILocationData[]);

    const excerciseService = new ExcerciseService(setJwtResponse!);

    const [excercise, setExcercise] = useState([] as IExcerciseData[]);

    const dateInputRef = useRef(null);

    
    useEffect(() => {
        if (jwtResponse) {
            locationService.getAll(jwtResponse).then(
                response => {
                    if (response){
                        setData(response);
                    } else {
                        setData([]);
                    }
                }
            );
        }
    }, []);

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
    }, []);
   


    return (
    
        <form className="form-signin w-100 m-auto">
            <h2>Create training</h2>
            <hr />

            <ul style={{ 'display': props.validationErrors.length == 0 ? 'none' : '' }}>
                <li>{props.validationErrors.length > 0 ? props.validationErrors[0] : ''}</li>
            </ul>

            <div className="form-floating mb-3">
                <input
                    onChange={(e) => props.handleChange(e.target)}
                    className="form-control"  aria-required="true" type="text" id="Input_Name" name="name"
                 />
                <label htmlFor="Input_Name">Training name</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    onChange={(e) => props.handleChange(e.target)}
                    className="form-control"  aria-required="true" type="number" id="Input_GroupsSize" name="duration"
                 />
                <label htmlFor="Input_Name">Duration</label>
            </div>
            <label>Enter start date:</label>
            <div className="form-floating mb-3">
                
            <input
                type="datetime-local"
                onChange={(e) => props.handleChange(e.target)}
                ref={dateInputRef}
                id="Input_since" name="since"
                />
            </div>
            <label>Enter end date:</label>
            <div className="form-floating mb-3">
            <input
                type="datetime-local"
                onChange={(e) => props.handleChange(e.target)}
                ref={dateInputRef}
                id="Input_until" name="until"
                />
            </div>
            <label htmlFor="Input_locationId">Location name</label>
            <div className="form-floating mb-3">
                <select name="locationId" onChange={(e) => props.handleChange(e.target)}>
                    <option>Select location</option>
                    {data.map(c =>
                        <option value={c.id}>
                            {c.address}
                        </option>)}
                </select>
            </div>
            <div className="form-floating mb-3">
                <select name="excerciseId" onChange={(e) => props.handleChange(e.target)}>
                    <option>Select excercise</option>
                    {excercise.map(c =>
                        <option value={c.id}>
                            {c.name}
                        </option>)}
                </select>
            </div>
            <br></br>
            <button
                onClick={(e) => props.onSubmit(e)}
                id="registerSubmit" className="w-100 btn btn-lg btn-primary">Add training</button>

        </form>
        
    );
}

export default TrainingAddForm;
