import { LocationService } from "../../Services/Location Service/LocationService";
import { ILocationData } from "../../dto/Location/ILocationData";
import { JwtContext } from "../Root";
import { useContext, useEffect, useState } from "react"
import '../../site.css'; 

const Index = () => {


    const { jwtResponse, setJwtResponse } = useContext(JwtContext);
    const locationService = new LocationService(setJwtResponse!);

    const [data, setData] = useState([] as ILocationData[]);


    useEffect(() => {
        if (jwtResponse) {
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
    

    return (
        
        <>
        <br></br>
        <div className="boxed-element">
            <h1 className="display-4" style={{'display': jwtResponse == null ? '' : 'none'}}>Welcome to Sport School internalsystem</h1>
            <h1 className="display-4" style={{'display': jwtResponse == null ? 'none' : ''}}>Welcome online</h1>
            <br></br>
            <h3 className="display-6" style={{'display': jwtResponse == null ? '' : 'none'}}>Get started by making an account or log in!</h3>
        </div>
        </>
    );
}

export default Index;
