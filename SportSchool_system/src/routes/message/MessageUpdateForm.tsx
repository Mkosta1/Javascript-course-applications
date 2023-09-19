import { MouseEvent, useContext, useEffect } from "react";
import { ICompetitionData } from "../../dto/Competition/ICompetitionData";


import React, { useRef, useState } from 'react';
import { ILocationData } from "../../dto/Location/ILocationData";
import { JwtContext } from "../Root";
import { LocationService } from "../../Services/Location Service/LocationService";
import { IMessageData } from "../../dto/Message/IMessageData";
import { MessageService } from "../../Services/Message Service/MessageService";
import { useParams } from "react-router-dom";


interface IProps {
    values: IMessageData;

    validationErrors: string[];

    handleChange: (target: EventTarget & HTMLInputElement | HTMLSelectElement) => void;

    onSubmit: (event: MouseEvent) => void;

}

const MessageUpdateForm = (props: IProps) => {

    const [date, setDate] = useState('');
    const [datee, setDatee] = useState('');
    const dateInputRef = useRef(null);
    const currentDate = new Date();
    const formattedTime = currentDate.toISOString();


    const { jwtResponse, setJwtResponse } = useContext(JwtContext);
    const messageService = new MessageService(setJwtResponse!);

    const [data, setData] = useState([] as IMessageData[]);

    const { id } = useParams()
    

    const cleanId = id!.replace('id:', '');

    useEffect(() => {
        if (jwtResponse) {
            console.log(messageService.getAll(jwtResponse))
            messageService.getAll(jwtResponse).then(
                
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


    const mappedForm = data
    .map(e => {
        return <form className="form-signin w-100 m-auto">
        <h2>Update message</h2>
        <hr />

        <ul style={{ 'display': props.validationErrors.length == 0 ? 'none' : '' }}>
            <li>{props.validationErrors.length > 0 ? props.validationErrors[0] : ''}</li>
        </ul>
        
        <div className="form-floating mb-3">
            <input
                onChange={(e) => props.handleChange(e.target)}
                className="form-control"  aria-required="true" type="text" id="Input_Name" name="subject"/>
                <p>Subject: {e.subject}</p>
            <label htmlFor="Input_Name">Subject</label>
        </div>

        <div className="form-floating mb-3">
            <input
                onChange={(e) => props.handleChange(e.target)}
                className="form-control"  aria-required="true"type="text" id="Input_Name" name="content"/>
                <p>Content: {e.content}</p>
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
        <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" name="id"
                 value={cleanId} onChange={(e) => props.handleChange(e.target)}/>
                <label className="form-check-label" >Confirm message update</label>
        </div>
        
        <br></br>
        <button
            onClick={(e) => props.onSubmit(e)}
            id="registerSubmit" className="w-100 btn btn-lg btn-primary">Update message</button>

    </form>
    })


    return (
        <>
        {mappedForm}
        </>
    );
}

export default MessageUpdateForm;
