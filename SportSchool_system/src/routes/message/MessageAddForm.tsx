import { MouseEvent, useContext, useEffect } from "react";
import { ICompetitionData } from "../../dto/Competition/ICompetitionData";


import React, { useRef, useState } from 'react';
import { ILocationData } from "../../dto/Location/ILocationData";
import { JwtContext } from "../Root";
import { LocationService } from "../../Services/Location Service/LocationService";
import { IMessageData } from "../../dto/Message/IMessageData";


interface IProps {
    values: IMessageData;

    validationErrors: string[];

    handleChange: (target: EventTarget & HTMLInputElement | HTMLSelectElement) => void;

    onSubmit: (event: MouseEvent) => void;

}



const MessageAddForm = (props: IProps) => {
    const [date, setDate] = useState('');
    const [datee, setDatee] = useState('');
    const dateInputRef = useRef(null);
    const currentDate = new Date();
    const formattedTime = currentDate.toISOString();
    return (
    
        <form className="form-signin w-100 m-auto">
            <h2>Create message</h2>
            <hr />

            <ul style={{ 'display': props.validationErrors.length == 0 ? 'none' : '' }}>
                <li>{props.validationErrors.length > 0 ? props.validationErrors[0] : ''}</li>
            </ul>
            
            <div className="form-floating mb-3">
                <input
                    onChange={(e) => props.handleChange(e.target)}
                    className="form-control"  aria-required="true" type="text" id="Input_Name" name="subject"
                 />
                <label htmlFor="Input_Name">Subject</label>
            </div>

            <div className="form-floating mb-3">
                <input
                    onChange={(e) => props.handleChange(e.target)}
                    className="form-control"  aria-required="true" type="text" id="Input_Name" name="content"
                 />
                <label htmlFor="Input_Name">Content</label>
            </div>

           
            <label>Message date is: {formattedTime.toString()}</label>
            <div className="form-floating mb-3">
            <input
                type="checkbox"
                onChange={(e) => props.handleChange(e.target)}
                ref={dateInputRef}
                value={formattedTime}
                id="Input_since" name="date"
                />
            </div>
            
            <br></br>
            <button
                onClick={(e) => props.onSubmit(e)}
                id="registerSubmit" className="w-100 btn btn-lg btn-primary">Add message</button>

        </form>
        
    );
}

export default MessageAddForm;
