import { radionice } from './RadionicePodaci'

// 1/4 Read od CRUD
async function get() {
    return { data: [...radionice] }
}

async function getBySifra(sifra) {
    return { data: radionice.find(r => r.sifra === parseInt(sifra)) }
}

// 2/4 Create od CRUD
async function dodaj(radionica) {
    if (radionice.length === 0) {
        radionica.sifra = 1
    } else {
        radionica.sifra = radionice[radionice.length - 1].sifra + 1
    }
    radionice.push(radionica)
}

// 3/4 Update od CRUD
async function promjeni(sifra, radionica) {
    const index = nadiIndex(sifra)
    radionice[index] = { ...radionice[index], ...radionica }
}

function nadiIndex(sifra) {
    return radionice.findIndex(r => r.sifra === parseInt(sifra))
}

// 4/4 Delete od CRUD
async function obrisi(sifra) {
    const index = nadiIndex(sifra)
    radionice.splice(index, 1)
}

export default {
    get,
    getBySifra,
    dodaj,
    promjeni,
    obrisi
}
