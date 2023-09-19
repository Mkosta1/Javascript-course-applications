import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { JwtContext } from "../routes/Root";
import IdentityHeader from "./IdentityHeader";
import { ISportsSchoolData } from "../dto/SportsSchool/ISportsSchoolData";
import { SportsSchoolService } from "../Services/SportsSchool service/SportSchoolService";

const Header = () => {

    const {jwtResponse, setJwtResponse} = useContext(JwtContext);

    const [data, setData] = useState([] as ISportsSchoolData[]);

    
    const sportsSchoolService = new SportsSchoolService(setJwtResponse!);


    //values
    useEffect(() => {
        if (jwtResponse) {
            sportsSchoolService.getAll(jwtResponse).then(
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

    const mapper = data.map(name =>
      {
        return name.address
      })

    return (
       
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            
  <div className="container-fluid">
    <Link to="/" className="navbar-brand">{mapper}</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link active" aria-current="page" >Home</Link>
        </li>
        <li className="nav-item">
          <Link to="message" className="nav-link" style={{'display': jwtResponse == null ? 'none' : ''}} >Messages</Link>
        </li>
        {/* jwtResponse 
        d.jwtObject['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] */}
        
        <li className="nav-item dropdown" style={{'display': jwtResponse == null ? 'none' : ''}}>
          <Link to="" className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Competition options
          </Link>
          <ul className="dropdown-menu">
            <li><Link to="competition" className="dropdown-item" >Competitons</Link></li>
            <li><Link to="location" className="dropdown-item" >Competition locations</Link></li>
          </ul>
        </li>
        <li className="nav-item dropdown" style={{'display': jwtResponse == null ? 'none' : ''}}>
          <Link to="" className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Training options
          </Link>
          <ul className="dropdown-menu">
            <li><Link to="training" className="dropdown-item" >Trainings</Link></li>
            <li><Link to="excercise" className="dropdown-item" >Excercise list</Link></li>
          </ul>
        </li>
      </ul>
    </div>
        <ul className="navbar-nav" aria-current="page" >
        <IdentityHeader/>
        </ul>
  </div>

</nav>

    );
}

export default Header;