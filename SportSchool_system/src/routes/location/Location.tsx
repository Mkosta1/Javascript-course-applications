
import { Link } from "react-router-dom";
import { LocationService } from "../../Services/Location Service/LocationService";
import { ILocationData } from "../../dto/Location/ILocationData";
import { JwtContext } from "../Root";
import { useContext, useEffect, useState } from "react"
import { IUserInfoProps } from "../../dto/IUserInfoProps";
import jwt_decode from "jwt-decode";
import { UserGroupService } from "../../Services/UserGroup/UserGroupService";
import { UserInGroupService } from "../../Services/UserInGroup/UserInGroupService";
import { IUserGroupData } from "../../dto/UserGroup/IUserGroupData";
import { IUserInGroupData } from "../../dto/UserInGroup/IUserInGroupData";

const Location = () => {
    const { jwtResponse, setJwtResponse } = useContext(JwtContext);
    const locationService = new LocationService(setJwtResponse!);

    const [data, setData] = useState([] as ILocationData[]);


    useEffect(() => {
        if (jwtResponse) {
            console.log(locationService.getAll(jwtResponse))
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
        <b><Link hidden={userRole.toString() == ",COACH" ? false : true} to="/locationAdd">Add new location</Link></b>
        <table className="table">
            <thead>
                <tr>
                <th scope="col">Location</th>
                <th scope="col">Address</th>
                <th scope="col">Remove</th>
                </tr>
            </thead>
                {data.map(loc =>
                    <tbody>
                        <tr>
                        <td>{loc.name}</td>
                        <td>{loc.address}</td>
                        <td><Link hidden={userRole.toString() == ",COACH" ? false : true} className="btn btn-outline-warning" to={`/locationRemove/id:${loc.id}`}>Remove location</Link></td>
                        </tr>
                    </tbody>

                )}
        </table>

        </>
    );
}

export default Location;

