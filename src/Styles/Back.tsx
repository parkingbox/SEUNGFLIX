import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled(motion.nav)`
  font-family: "Raleway Sans";
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  top: 0;
  background-color: transparent;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
  z-index: 100;
`;

const Box = styled.div`
  width: 95%;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Back = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(-1);
  };
  return (
    <Container>
      <Box>
        <Link to="/"></Link>
        <KeyboardBackspaceIcon
          onClick={onClick}
          style={{ width: "30px", height: "30px", cursor: "pointer" }}
        />
      </Box>
    </Container>
  );
};

export default Back;
