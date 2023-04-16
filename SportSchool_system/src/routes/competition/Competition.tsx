import { CompetitionService } from "../../Services/CompetitionService";
import { ICompetition } from "../../domain/ICompetition";
import { JwtContext } from "../Root";
import { useContext, useEffect, useState } from "react"


const Competition = () => {
    const competitionService = new CompetitionService();
    const { jwtResponse, setJwtResponse } = useContext(JwtContext);

    const [data, setData] = useState([] as ICompetition[]);

    useEffect(() => {
        if (jwtResponse) {
            competitionService.getAll(jwtResponse.jwt).then(
                response => {
                    console.log(response);
                    if (response){
                        setData(response);
                    } else {
                        setData([]);
                    }
                }
            );
        }
    }, [jwtResponse]);


    return (
        <>Competition {data.length}</>
    );
}

export default Competition;
