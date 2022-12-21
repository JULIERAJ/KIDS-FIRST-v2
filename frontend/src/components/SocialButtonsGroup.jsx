import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import googleIcon from "../media/icons/google.png";
import facebookIcon from "../media/icons/facebook.png";

const SocialButton = ({ icon, title }) => (
  <Button className="tertiary-btn w-100" type="button" variant="outline-secondary" size="lg">
    <img src={icon} width="25" height="25" alt=""/>
    {' '}
    {title}
  </Button>
);
 

const SocialButtonsGroup = () => (
  <Row className="py-5">
    <Col xs={12} md={6}>
      <SocialButton icon={googleIcon} title="Google"/>
    </Col>

    <Col xs={12} md={6}>
      <SocialButton icon={facebookIcon} title="Facebook"/>
    </Col>
  </Row>
)
export default SocialButtonsGroup;
