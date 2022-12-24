import checkIcon from "../../media/icons/check.png";

const IconText = ({ title }) => 
  <div>
    <img src={checkIcon} width="12" alt="checkIcon"/> 
    {' '}
    {title}
  </div>

export default IconText;
