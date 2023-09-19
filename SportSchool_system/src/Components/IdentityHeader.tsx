import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { JwtContext } from "../routes/Root";
import { IdentityService } from "../Services/IdentityService";
import jwt_decode from "jwt-decode";
import { IUserInfoProps } from "../dto/IUserInfoProps";
import { UserGroupService } from "../Services/UserGroup/UserGroupService";
import { UserInGroupService } from "../Services/UserInGroup/UserInGroupService";
import { IUserGroupData } from "../dto/UserGroup/IUserGroupData";
import { IUserInGroupData } from "../dto/UserInGroup/IUserInGroupData";

const IdentityHeader = () => {
    const { jwtResponse, setJwtResponse } = useContext(JwtContext);
    const navigate = useNavigate();
    const identityService = new IdentityService();

    const logout = () => {
        if (jwtResponse)
            identityService.logout(jwtResponse).then(response => {
                if (setJwtResponse)
                    setJwtResponse(null);
                navigate("/");
            });
    }

    if (jwtResponse) {
        let jwtObject: any = jwt_decode(jwtResponse.jwt);

        console.log(jwtObject);

        return (
            <>
                <li className="nav-item">
                    <Link to="" className="nav-link text-light">
                        <UserInfo jwtObject={jwtObject} />
                    </Link>
                </li>
                <li className="nav-item">
                    <a onClick={(e) => {
                        e.preventDefault();
                        logout();
                    }} className="nav-link text-light" href="#">Logout</a>
                </li>
            </>
        );
    }
    return (
        <>
            <li className="nav-item">
                <Link to="register" className="nav-link text-light">Register</Link>
            </li>
            <li className="nav-item">
                <Link to="login" className="nav-link text-light">Login</Link>
            </li>
        </>
    );

}






const UserInfo = (props: IUserInfoProps) => {

    const { jwtResponse, setJwtResponse } = useContext(JwtContext);
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
            <b>{userRole.toString()}</b>
            {' ' + props.jwtObject['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'] + ' '}
            {props.jwtObject['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname']+ ' '}
            ({props.jwtObject['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']})
        </>
    );
}

export default IdentityHeader;
