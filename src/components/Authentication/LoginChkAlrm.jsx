import { IMAGES } from "../../constants/images";
import "./LoginChkAlrm.css";

const LoginChkAlrm=({ children, icon, paddingSize})=>{
    let SelectIcon = IMAGES.check_red;
    if(icon === "X"){
        SelectIcon = IMAGES.check_x_red;
    }
    return(
        <div className="check-message">
            <img src={SelectIcon} alt={icon} style={{paddingRight: `${paddingSize}`}}/>
            <span>{children}</span>
        </div>
    )
}
export default LoginChkAlrm;