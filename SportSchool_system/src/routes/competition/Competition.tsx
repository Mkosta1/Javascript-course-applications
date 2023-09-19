import { Link } from "react-router-dom";
import { CompetitionService } from "../../Services/Competition Service/CompetitionService";
import { IUserInfoProps } from "../../dto/IUserInfoProps";
import { JwtContext } from "../Root";
import { useContext, useEffect, useState } from "react"
import { ICompetitionData } from "../../dto/Competition/ICompetitionData";
import { LocationService } from "../../Services/Location Service/LocationService";
import { ILocationData } from "../../dto/Location/ILocationData";
import jwt_decode from "jwt-decode";
import { UserAtCompetitionService } from "../../Services/UserAtCompetition Service/UserAtCompetitionService";
import { IUserAtCompetitionData } from "../../dto/UserAtCompetition/IUserAtCompetitionData";
import { UserGroupService } from "../../Services/UserGroup/UserGroupService";
import { UserInGroupService } from "../../Services/UserInGroup/UserInGroupService";
import { IUserGroupData } from "../../dto/UserGroup/IUserGroupData";
import { IUserInGroupData } from "../../dto/UserInGroup/IUserInGroupData";


const Competition = () => {
    const { jwtResponse, setJwtResponse } = useContext(JwtContext);
    const competitionService = new CompetitionService(setJwtResponse!);

    const locationService = new LocationService(setJwtResponse!);

    const userAtCompService = new UserAtCompetitionService(setJwtResponse!);

    const [data, setData] = useState([] as ICompetitionData[]);

    const [userComp, setComp] = useState([] as IUserAtCompetitionData[]);

    const [location, setLocation] = useState([] as ILocationData[]);

    const currentDate = new Date();

    // const [sportschool, getData] = useState([] as ILocation[]);


    useEffect(() => {
        if (jwtResponse) {
            competitionService.getAll(jwtResponse).then(
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

    useEffect(() => {
        if (jwtResponse) {
            locationService.getAll(jwtResponse).then(
                response => {
                    if (response){
                        setLocation(response);
                    } else {
                        setLocation([]);
                    }
                }
            );
        }
    }, []);

    useEffect(() => {
        if (jwtResponse) {
            userAtCompService.getAll(jwtResponse).then(
                response => {
                    if (response){
                        setComp(response);
                    } else {
                        setComp([]);
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



    const mappedArray = data
    .map(item => (
        location.map(loc => 
            {
                const groupSizeControll = userComp
                .filter(m => m.competitionId == item.id)
                .map(a => {
                    return a.competitionId
                }
                );

                const correctSince = new Date(item.since!);
                const correctCurrent = currentDate.toLocaleDateString('en-US');
                const correctDb = correctSince.toLocaleDateString('en-US');
                if(loc.id == item.locationId){
                    return <tbody key={item.id}>
                            <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">Location: {loc.name} - {loc.address}</p>
                            <p className="card-text">Begins at: {item.since!.toString()}</p>
                            <p className="card-text">Ends at: {item.until!.toString()}</p>
                            <p hidden={correctCurrent < correctDb && groupSizeControll.length < item.groupSize ? false : true}>{item.groupSize - groupSizeControll.length} available spots!</p>
                            <b><p hidden={groupSizeControll.length < item.groupSize ? true : false}>Competition group is FULL</p></b>
                            <Link hidden={correctCurrent < correctDb && groupSizeControll.length < item.groupSize ? false : true} to={`/userAtCompetitionAdd/id:${item.id}`} className="card-link">Join</Link>
                            <Link hidden={userRole.toString() === ",COACH" ? false : true} to={`/competitionRemove/id:${item.id}`} className="card-link">Remove</Link>
                        </div>
                        </div>
                        </tbody>
                }

        }
            )
    ))
    
    return (
        <>
        <h1>Sportschool competitions</h1>
<p>
    <Link hidden={userRole.toString() == ",COACH" ? false : true} to="/competitionCreate">Add new competition</Link>
</p>

<p>
    <Link to="/userCompetitionList">See my joined competitions</Link>
</p>
        {mappedArray}
        </>
    );
}

export default Competition;

