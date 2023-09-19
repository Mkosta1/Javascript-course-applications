
import { Link } from "react-router-dom";
import { LocationService } from "../../Services/Location Service/LocationService";
import { ILocationData } from "../../dto/Location/ILocationData";
import { JwtContext } from "../Root";
import { useContext, useEffect, useState } from "react"
import { IUserInfoProps } from "../../dto/IUserInfoProps";
import jwt_decode from "jwt-decode";
import { MessageService } from "../../Services/Message Service/MessageService";
import { IMessageData } from "../../dto/Message/IMessageData";
import { UserGroupService } from "../../Services/UserGroup/UserGroupService";
import { UserInGroupService } from "../../Services/UserInGroup/UserInGroupService";
import { IUserGroupData } from "../../dto/UserGroup/IUserGroupData";
import { IUserInGroupData } from "../../dto/UserInGroup/IUserInGroupData";

const Message = () => {
    const { jwtResponse, setJwtResponse } = useContext(JwtContext);
    const messageService = new MessageService(setJwtResponse!);

    const [data, setData] = useState([] as IMessageData[]);


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


    const messageMap = data.map(mes => {
        return <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    <b>Subject: {mes.subject} -</b> <br></br>
                    <b>Added: {mes.date?.toString()}</b>
                    </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <p>
                            {mes.content}
                        </p>
                    <Link hidden={userRole.toString() == ",COACH" ? false : true} to={`/messageUpdate/id:${mes.id}`} className="card-link"><b>Update message</b></Link><br></br>
                    <Link hidden={userRole.toString() == ",COACH" ? false : true} to={`/messageRemove/id:${mes.id}`} className="card-link"><b>Remove</b></Link><br></br>
                    </div>
                </div>
                </div>


    })

    return (
        
        <>
        <h1>Messages</h1>
        <b><Link hidden={userRole.toString() == ",COACH" ? false : true} to="/messageAdd">Add new message</Link></b>
        <div className="accordion" id="accordionExample">
                {messageMap} 
        </div>

        </>
    );
}

export default Message;

