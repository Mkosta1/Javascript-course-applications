import { MouseEvent, useContext, useEffect } from "react";
import { ICompetitionData } from "../../dto/Competition/ICompetitionData";


import React, { useRef, useState } from 'react';
import { ILocationData } from "../../dto/Location/ILocationData";
import { JwtContext } from "../Root";
import { LocationService } from "../../Services/Location Service/LocationService";


interface IProps {
    values: ILocationData;

    validationErrors: string[];

    handleChange: (target: EventTarget & HTMLInputElement | HTMLSelectElement) => void;

    onSubmit: (event: MouseEvent) => void;

}

const LocationAddForm = (props: IProps) => {


    return (
    
        <form className="form-signin w-100 m-auto">
            <h2>Add Location</h2>
            <hr />

            <ul style={{ 'display': props.validationErrors.length == 0 ? 'none' : '' }}>
                <li>{props.validationErrors.length > 0 ? props.validationErrors[0] : ''}</li>
            </ul>

            <div className="form-floating mb-3">
                <input
                    onChange={(e) => props.handleChange(e.target)}
                    className="form-control"  aria-required="true" type="text" id="Input_Name" name="name"
                 />
                <label htmlFor="Input_Name">Location name</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    onChange={(e) => props.handleChange(e.target)}
                    className="form-control"  aria-required="true" type="text" id="Input_GroupsSize" name="address"
                 />
                <label htmlFor="Input_Name">Address</label>
            </div>
            
            <br></br>
            <button
                onClick={(e) => props.onSubmit(e)}
                id="registerSubmit" className="w-100 btn btn-lg btn-primary">Add location</button>

        </form>
        
    );
}

export default LocationAddForm;
