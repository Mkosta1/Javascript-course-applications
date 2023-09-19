import { MouseEvent, useContext, useEffect } from "react";
import { ICompetitionData } from "../../dto/Competition/ICompetitionData";

import jwt_decode from "jwt-decode";
import React, { useRef, useState } from 'react';
import { JwtContext } from "../Root";
import { IUserAtCompetitionData } from "../../dto/UserAtCompetition/IUserAtCompetitionData";
import { CompetitionService } from "../../Services/Competition Service/CompetitionService";
import { useParams } from "react-router-dom";
import { IUserInfoProps } from "../../dto/IUserInfoProps";
import { IUserAtCompetitionDataRemove } from "../../dto/UserAtCompetition/IUserAtCompetitionDataRemove";
import { ILocationRemoveData } from "../../dto/Location/ILocationRemoveData";
import { IMessageRemoveData } from "../../dto/Message/IMessageRemoveData";


interface IProps {
    values: IMessageRemoveData;

    validationErrors: string[];

    handleChange: (target: EventTarget & HTMLInputElement | HTMLSelectElement) => void;

    onSubmit: (event: MouseEvent) => void;

}

const MessageRemoveForm = (props: IProps) => {

    const { id } = useParams()
    

    const cleanId = id!.replace('id:', '');
   
    return (
        <form className="form-signin w-100 m-auto">
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
                name="id" value={cleanId} onChange={(e) => props.handleChange(e.target)}/>
                <label className="form-check-label" >Confirm message delete</label>
            </div>
            <button
                onClick={(e) => props.onSubmit(e)}
                id="registerSubmit" className="w-100 btn btn-lg btn-primary">Delete message</button>

        </form>
    );
}

export default MessageRemoveForm;
