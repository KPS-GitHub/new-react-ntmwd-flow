import React from "react";
import logo from "../../images/ntmwd-logo.svg";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import Theme from "../../vars/ThemeOptions";

const HeaderWrap = styled.header`
  background-color: ${Theme.hex("tertiary")};
  border-top: ${Theme.pad("single")} solid ${Theme.hex("primary")};
`;

const TitleWrap = styled(Col)`
display: flex;
align-items: center;
h1 {
  color: white;
}
`

const Header = () => (
  <HeaderWrap>
    <Container>
      <Row>
        <Col sm={"auto"}>
          <img
            src={logo}
            alt="logo"
            style={{
              height: `${Theme.pad("x4", false) * 1.5}rem`,
              padding: `${Theme.pad("half")} 0`
            }}
          />
        </Col>
        <TitleWrap sm={"auto"}>
          <h1>Flow Information</h1>
        </TitleWrap>
      </Row>
    </Container>
  </HeaderWrap>
);

export default Header;
