import { MouseEvent, useContext, useEffect } from "react";
import { ICompetitionData } from "../../dto/Competition/ICompetitionData";


import React, { useRef, useState } from 'react';
import { ILocationData } from "../../dto/Location/ILocationData";
import { JwtContext } from "../Root";
import { LocationService } from "../../Services/Location Service/LocationService";


interface IProps {
    values: ICompetitionData;

    validationErrors: string[];

    handleChange: (target: EventTarget & HTMLInputElement | HTMLSelectElement) => void;

    onSubmit: (event: MouseEvent) => void;

}



const CompetitionCreateForm = (props: IProps) => {
    const { jwtResponse, setJwtResponse } = useContext(JwtContext);
    
    const locationService = new LocationService(setJwtResponse!);

    const [data, setData] = useState([] as ILocationData[]);

    const [date, setDate] = useState('');
    const [datee, setDatee] = useState('');
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
   


    return (
    
        <form className="form-signin w-100 m-auto">
            <h2>Create competition</h2>
            <hr />

            <ul style={{ 'display': props.validationErrors.length == 0 ? 'none' : '' }}>
                <li>{props.validationErrors.length > 0 ? props.validationErrors[0] : ''}</li>
            </ul>

            <div className="form-floating mb-3">
                <input
                    onChange={(e) => props.handleChange(e.target)}
                    className="form-control"  aria-required="true" type="text" id="Input_Name" name="name"
                 />
                <label htmlFor="Input_Name">Competiton name</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    onChange={(e) => props.handleChange(e.target)}
                    className="form-control"  aria-required="true" type="number" id="Input_GroupsSize" name="groupSize"
                 />
                <label htmlFor="Input_Name">Groups size</label>
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
            <br></br>
            <button
                onClick={(e) => props.onSubmit(e)}
                id="registerSubmit" className="w-100 btn btn-lg btn-primary">Add competition</button>

        </form>
        
    );
}

export default CompetitionCreateForm;
