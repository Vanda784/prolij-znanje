import { useEffect, useState } from 'react'
import RadioniceService from '../../services/radionice/RadioniceService'
import { Link, useNavigate } from 'react-router-dom'
import { RouteNames } from '../../constants'
import { FaGraduationCap, FaCalendarAlt, FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa'
import { Table, Button } from 'react-bootstrap'

export default function RadionicePregled() {

    const navigate = useNavigate()
    const [radionice, setRadionice] = useState([])

    useEffect(() => {
        ucitaj()
    }, [])

    async function ucitaj() {
        await RadioniceService.get().then(odg => setRadionice(odg.data))
    }

    async function obrisi(sifra) {
        if (!confirm('Sigurno obrisati radionicu?')) return
        await RadioniceService.obrisi(sifra)
        ucitaj()
    }

    return (
        <>
            <Link to={RouteNames.RADIONICE_NOVA} className="btn btn-success w-100 my-3">
                <FaPlus size={13} style={{ marginRight: 6 }} />
                Dodaj novu radionicu
            </Link>

            <Table striped bordered hover responsive>
                <thead style={{ backgroundColor: '#2d6a4f', color: '#fff' }}>
                    <tr>
                        <th>Naziv</th>
                        <th>Ustanova</th>
                        <th>Razred</th>
                        <th>Voditeljica</th>
                        <th>Uzrast</th>
                        <th>Sudionici</th>
                        <th>Datum</th>
                        <th>Tema</th>
                        <th>Aktivnost</th>
                        <th style={{ textAlign: 'center' }}>Održano</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {radionice && radionice.map((r) => (
                        <tr key={r.sifra}>
                            <td><strong>{r.naziv}</strong></td>
                            <td style={{ fontSize: '0.88rem' }}>{r.ustanova}</td>
                            <td>{r.razred}</td>
                            <td style={{ fontSize: '0.88rem', whiteSpace: 'nowrap' }}>{r.voditeljica}</td>
                            <td>
                                <span style={{
                                    display: 'inline-block',
                                    padding: '2px 8px',
                                    borderRadius: '10px',
                                    fontSize: '0.78rem',
                                    backgroundColor: '#f0fdf4',
                                    color: '#15803d',
                                    border: '1px solid #bbf7d0'
                                }}>
                                    {r.uzrast}
                                </span>
                            </td>
                            <td style={{ textAlign: 'center' }}>{r.brojSudionika}</td>
                            <td style={{ whiteSpace: 'nowrap', fontSize: '0.88rem' }}>{r.datumRadionice}</td>
                            <td style={{ fontSize: '0.85rem' }}>{r.tema}</td>
                            <td style={{ fontSize: '0.85rem' }}>{r.aktivnosti}</td>
                            <td style={{ textAlign: 'center' }}>
                                {r.odrzano
                                    ? <FaGraduationCap size={20} color="#16a34a" title="Održano" />
                                    : <FaCalendarAlt size={18} color="#ea580c" title="Planirano" />
                                }
                            </td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Button size="sm" variant="primary"
                                    onClick={() => navigate(`/radionice/${r.sifra}`)}
                                    style={{ marginRight: 4 }}>
                                    <FaEdit size={12} />
                                </Button>
                                <Button size="sm" variant="danger"
                                    onClick={() => obrisi(r.sifra)}>
                                    <FaTrashAlt size={12} />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}
