import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { IME_APLIKACIJE, RouteNames } from '../constants.js'
import { useNavigate } from 'react-router-dom'

export default function Izbornik() {

    const navigate = useNavigate()

    return (
        <Navbar expand="lg" className="bg-body-tertiary border-bottom">
            <Container>
                <Navbar.Brand href="#" style={{ fontWeight: 600, fontSize: '1rem', color: '#2d6a4f' }}>
                    🌿 {IME_APLIKACIJE}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => navigate(RouteNames.HOME)}>
                            Početna
                        </Nav.Link>
                        <NavDropdown title="Radionice" id="radionice-dropdown">
                            <NavDropdown.Item onClick={() => navigate(RouteNames.RADIONICE)}>
                                Pregled radionica
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
