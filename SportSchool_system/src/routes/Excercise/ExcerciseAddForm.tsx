import { MouseEvent, useContext, useEffect } from "react";
import { IExcerciseData } from "../../dto/Excercise/IExcerciseData";


interface IProps {
    values: IExcerciseData;

    validationErrors: string[];

    handleChange: (target: EventTarget & HTMLInputElement | HTMLSelectElement) => void;

    onSubmit: (event: MouseEvent) => void;

}

const ExcerciseAddForm = (props: IProps) => {


    return (
    
        <form className="form-signin w-100 m-auto">
            <h2>Add Excercise</h2>
            <hr />

            <ul style={{ 'display': props.validationErrors.length == 0 ? 'none' : '' }}>
                <li>{props.validationErrors.length > 0 ? props.validationErrors[0] : ''}</li>
            </ul>

            <div className="form-floating mb-3">
                <input
                    onChange={(e) => props.handleChange(e.target)}
                    className="form-control"  aria-required="true" type="text" id="Input_Name" name="name"
                 />
                <label htmlFor="Input_Name">Excercise name</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    onChange={(e) => props.handleChange(e.target)}
                    className="form-control"  aria-required="true" type="number" id="Input_Duration" name="duration"
                 />
                <label htmlFor="Input_Name">Duration</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    onChange={(e) => props.handleChange(e.target)}
                    className="form-control"  aria-required="true" type="text" id="Input_Duration" name="level"
                 />
                <label htmlFor="Input_Name">Difficulty</label>
            </div>
            
            <br></br>
            <button
                onClick={(e) => props.onSubmit(e)}
                id="registerSubmit" className="w-100 btn btn-lg btn-primary">Add Excercise</button>

        </form>
        
    );
}

export default ExcerciseAddForm;
