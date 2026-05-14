import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import RadioniceService from '../../services/radionice/RadioniceService'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { RouteNames, USTANOVE, VODITELJICE, UZRASTI, TEME, AKTIVNOSTI } from '../../constants'

export default function RadionicaPromjena() {

    const navigate = useNavigate()
    const params = useParams()
    const [radionica, setRadionica] = useState({})
    const [odrzano, setOdrzano] = useState(false)

    useEffect(() => {
        ucitaj()
    }, [])

    async function ucitaj() {
        await RadioniceService.getBySifra(params.sifra).then((odg) => {
            setRadionica(odg.data)
            setOdrzano(odg.data.odrzano)
        })
    }

    async function promjeni(novaRadionica) {
        await RadioniceService.promjeni(params.sifra, novaRadionica).then(() => {
            navigate(RouteNames.RADIONICE)
        })
    }

    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)
        promjeni({
            naziv: podaci.get('naziv'),
            ustanova: podaci.get('ustanova'),
            razred: podaci.get('razred'),
            voditeljica: podaci.get('voditeljica'),
            uzrast: podaci.get('uzrast'),
            brojSudionika: parseInt(podaci.get('brojSudionika')),
            datumRadionice: podaci.get('datumRadionice'),
            tema: podaci.get('tema'),
            aktivnosti: podaci.get('aktivnosti'),
            odrzano: odrzano
        })
    }

    return (
        <>
            <h3 className="my-3">Promjena podataka radionice</h3>
            <Form onSubmit={odradiSubmit}>
                <Row>
                    <Col md={8}>
                        <Form.Group controlId="naziv" className="mb-3">
                            <Form.Label>Naziv radionice</Form.Label>
                            <Form.Control type="text" name="naziv" required defaultValue={radionica.naziv} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="datumRadionice" className="mb-3">
                            <Form.Label>Datum radionice</Form.Label>
                            <Form.Control type="date" name="datumRadionice" required defaultValue={radionica.datumRadionice} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={8}>
                        <Form.Group controlId="ustanova" className="mb-3">
                            <Form.Label>Ustanova</Form.Label>
                            <Form.Select name="ustanova" required
                                value={radionica.ustanova || ''}
                                onChange={e => setRadionica({ ...radionica, ustanova: e.target.value })}>
                                <option value="">-- Odaberi ustanovu --</option>
                                {USTANOVE.map(u => <option key={u} value={u}>{u}</option>)}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="razred" className="mb-3">
                            <Form.Label>Razred</Form.Label>
                            <Form.Control type="text" name="razred" required defaultValue={radionica.razred} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={4}>
                        <Form.Group controlId="voditeljica" className="mb-3">
                            <Form.Label>Voditeljica / Voditelj</Form.Label>
                            <Form.Select name="voditeljica" required
                                value={radionica.voditeljica || ''}
                                onChange={e => setRadionica({ ...radionica, voditeljica: e.target.value })}>
                                <option value="">-- Odaberi --</option>
                                {VODITELJICE.map(v => <option key={v} value={v}>{v}</option>)}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="uzrast" className="mb-3">
                            <Form.Label>Uzrast</Form.Label>
                            <Form.Select name="uzrast" required
                                value={radionica.uzrast || ''}
                                onChange={e => setRadionica({ ...radionica, uzrast: e.target.value })}>
                                <option value="">-- Odaberi uzrast --</option>
                                {UZRASTI.map(u => <option key={u} value={u}>{u}</option>)}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="brojSudionika" className="mb-3">
                            <Form.Label>Broj sudionika</Form.Label>
                            <Form.Control type="number" name="brojSudionika" min="1" required defaultValue={radionica.brojSudionika} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="tema" className="mb-3">
                            <Form.Label>Tema</Form.Label>
                            <Form.Select name="tema" required
                                value={radionica.tema || ''}
                                onChange={e => setRadionica({ ...radionica, tema: e.target.value })}>
                                <option value="">-- Odaberi temu --</option>
                                {TEME.map(t => <option key={t} value={t}>{t}</option>)}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="aktivnosti" className="mb-3">
                            <Form.Label>Aktivnosti</Form.Label>
                            <Form.Select name="aktivnosti" required
                                value={radionica.aktivnosti || ''}
                                onChange={e => setRadionica({ ...radionica, aktivnosti: e.target.value })}>
                                <option value="">-- Odaberi aktivnost --</option>
                                {AKTIVNOSTI.map(a => <option key={a} value={a}>{a}</option>)}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="odrzano" className="mb-4">
                    <Form.Check label="Radionica je održana" name="odrzano"
                        checked={odrzano}
                        onChange={e => setOdrzano(e.target.checked)} />
                </Form.Group>

                <Row>
                    <Col>
                        <Link to={RouteNames.RADIONICE} className="btn btn-danger">Odustani</Link>
                    </Col>
                    <Col className="text-end">
                        <Button type="submit" variant="success">Spremi promjene</Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}
