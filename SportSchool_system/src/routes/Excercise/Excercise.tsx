
import { Link } from "react-router-dom";
import { JwtContext } from "../Root";
import { useContext, useEffect, useState } from "react"
import { IUserInfoProps } from "../../dto/IUserInfoProps";
import jwt_decode from "jwt-decode";
import { IExcerciseData } from "../../dto/Excercise/IExcerciseData";
import { ExcerciseService } from "../../Services/Excercise Service/ExcerciseService";
import { UserGroupService } from "../../Services/UserGroup/UserGroupService";
import { UserInGroupService } from "../../Services/UserInGroup/UserInGroupService";
import { IUserGroupData } from "../../dto/UserGroup/IUserGroupData";
import { IUserInGroupData } from "../../dto/UserInGroup/IUserInGroupData";

const Excercise = () => {
    const { jwtResponse, setJwtResponse } = useContext(JwtContext);
    const excerciseService = new ExcerciseService(setJwtResponse!);

    const [data, setData] = useState([] as IExcerciseData[]);


    useEffect(() => {
        if (jwtResponse) {
            console.log(excerciseService.getAll(jwtResponse))
            excerciseService.getAll(jwtResponse).then(
                
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

    return (
        
        <>
        <b><Link hidden={userRole.toString() == ",COACH" ? false : true} to="/excerciseAdd">Add new excercise</Link></b>
        <table className="table">
            <thead>
                <tr>
                <th scope="col">Excercise name</th>
                <th scope="col">Duration</th>
                <th scope="col">Difficulty</th>
                <th scope="col">Remove</th>
                </tr>
            </thead>
                {data.map(exc =>
                    <tbody>
                        <tr>
                        <td>{exc.name}</td>
                        <td>{exc.duration} minutes</td>
                        <td>{exc.level}</td>
                        <td><Link hidden={userRole.toString() == ",COACH" ? false : true} className="btn btn-outline-warning" to={`/excerciseRemove/id:${exc.id}`}>Remove excercise</Link></td>
                        </tr>
                    </tbody>

                )}
        </table>

        </>
    );
}

export default Excercise;

