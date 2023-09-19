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


interface IProps {
    values: ILocationRemoveData;

    validationErrors: string[];

    handleChange: (target: EventTarget & HTMLInputElement | HTMLSelectElement) => void;

    onSubmit: (event: MouseEvent) => void;

}

const LocationRemoveForm = (props: IProps) => {

    const { id } = useParams()
    

    const cleanId = id!.replace('id:', '');
   
    return (
        <form className="form-signin w-100 m-auto">
            <input type="checkbox" name="id" value={cleanId} onChange={(e) => props.handleChange(e.target)}/>
            <label className="form-check-label">
            <b>Do you realy want to remove this location?</b>
            </label>
            <button
                onClick={(e) => props.onSubmit(e)}
                id="registerSubmit" className="w-100 btn btn-lg btn-primary">Delete location</button>

        </form>
    );
}

export default LocationRemoveForm;
