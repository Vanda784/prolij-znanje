import { Form, Row, Col, Button } from 'react-bootstrap'
import { RouteNames, USTANOVE, VODITELJICE, UZRASTI, TEME, AKTIVNOSTI } from '../../constants'
import { Link, useNavigate } from 'react-router-dom'
import RadioniceService from '../../services/radionice/RadioniceService'

export default function RadionicaNova() {

    const navigate = useNavigate()

    async function dodaj(radionica) {
        await RadioniceService.dodaj(radionica).then(() => {
            navigate(RouteNames.RADIONICE)
        })
    }

    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)
        dodaj({
            naziv: podaci.get('naziv'),
            ustanova: podaci.get('ustanova'),
            razred: podaci.get('razred'),
            voditeljica: podaci.get('voditeljica'),
            uzrast: podaci.get('uzrast'),
            brojSudionika: parseInt(podaci.get('brojSudionika')),
            datumRadionice: podaci.get('datumRadionice'),
            tema: podaci.get('tema'),
            aktivnosti: podaci.get('aktivnosti'),
            odrzano: podaci.get('odrzano') === 'on'
        })
    }

    return (
        <>
            <h3 className="my-3">Unos nove radionice</h3>
            <Form onSubmit={odradiSubmit}>
                <Row>
                    <Col md={8}>
                        <Form.Group controlId="naziv" className="mb-3">
                            <Form.Label>Naziv radionice</Form.Label>
                            <Form.Control type="text" name="naziv" required />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="datumRadionice" className="mb-3">
                            <Form.Label>Datum radionice</Form.Label>
                            <Form.Control type="date" name="datumRadionice" required />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={8}>
                        <Form.Group controlId="ustanova" className="mb-3">
                            <Form.Label>Ustanova</Form.Label>
                            <Form.Select name="ustanova" required>
                                <option value="">-- Odaberi ustanovu --</option>
                                {USTANOVE.map(u => <option key={u} value={u}>{u}</option>)}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="razred" className="mb-3">
                            <Form.Label>Razred</Form.Label>
                            <Form.Control type="text" name="razred" placeholder="npr. 1a i 1b" required />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={4}>
                        <Form.Group controlId="voditeljica" className="mb-3">
                            <Form.Label>Voditeljica / Voditelj</Form.Label>
                            <Form.Select name="voditeljica" required>
                                <option value="">-- Odaberi --</option>
                                {VODITELJICE.map(v => <option key={v} value={v}>{v}</option>)}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="uzrast" className="mb-3">
                            <Form.Label>Uzrast</Form.Label>
                            <Form.Select name="uzrast" required>
                                <option value="">-- Odaberi uzrast --</option>
                                {UZRASTI.map(u => <option key={u} value={u}>{u}</option>)}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="brojSudionika" className="mb-3">
                            <Form.Label>Broj sudionika</Form.Label>
                            <Form.Control type="number" name="brojSudionika" min="1" required />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="tema" className="mb-3">
                            <Form.Label>Tema</Form.Label>
                            <Form.Select name="tema" required>
                                <option value="">-- Odaberi temu --</option>
                                {TEME.map(t => <option key={t} value={t}>{t}</option>)}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="aktivnosti" className="mb-3">
                            <Form.Label>Aktivnosti</Form.Label>
                            <Form.Select name="aktivnosti" required>
                                <option value="">-- Odaberi aktivnost --</option>
                                {AKTIVNOSTI.map(a => <option key={a} value={a}>{a}</option>)}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="odrzano" className="mb-4">
                    <Form.Check label="Radionica je održana" name="odrzano" />
                </Form.Group>

                <Row>
                    <Col>
                        <Link to={RouteNames.RADIONICE} className="btn btn-danger">Odustani</Link>
                    </Col>
                    <Col className="text-end">
                        <Button type="submit" variant="success">Dodaj radionicu</Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}
