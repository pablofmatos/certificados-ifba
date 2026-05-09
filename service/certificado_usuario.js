const fs = require("fs")
const URL_JSON = "./json/certificado_usuario.json"

async function getTodosCertificadoUsuarios() {
    return JSON.parse(fs.readFileSync(URL_JSON))
}

async function getCertificadoUsuarioPorId(id) {
    const registros = await getTodosCertificadoUsuarios()
    return registros.find(registro => registro.id == id || registro._id == id)
}

async function insereCertificadoUsuario(novoRegistro) {
    const registros = await getTodosCertificadoUsuarios()
    registros.push(novoRegistro)
    fs.writeFileSync(URL_JSON, JSON.stringify(registros))
}

async function modificaCertificadoUsuario(modificacoes, id) {
    let registrosAtuais = await getTodosCertificadoUsuarios()

    const indiceModificado = registrosAtuais.findIndex(
        registro => registro.id == id || registro._id == id
    )

    const conteudoMudado = {
        ...registrosAtuais[indiceModificado],
        ...modificacoes
    }

    registrosAtuais[indiceModificado] = conteudoMudado

    fs.writeFileSync(URL_JSON, JSON.stringify(registrosAtuais))

    return conteudoMudado
}

async function removeCertificadoUsuarioPorId(id) {
    const registros = await getTodosCertificadoUsuarios()

    const registrosFiltrados = registros.filter((registro) => {
        if (!registro || (registro.id != id && registro._id != id)) {
            return registro
        }
    })

    if (registros.length == registrosFiltrados.length) {
        return false
    } else {
        fs.writeFileSync(URL_JSON, JSON.stringify(registrosFiltrados))
        return true
    }
}

module.exports = {
    getTodosCertificadoUsuarios,
    getCertificadoUsuarioPorId,
    insereCertificadoUsuario,
    modificaCertificadoUsuario,
    removeCertificadoUsuarioPorId
}
