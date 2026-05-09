const {
    getCertificadoUsuarios,
    getCertificadoUsuario,
    postCertificadoUsuario,
    patchCertificadoUsuario,
    removeCertificadoUsuario
} = require("../controller/certificado_usuario.js")

const { Router } = require("express")

const router = Router()

router.get('/', getCertificadoUsuarios)
router.get('/:id', getCertificadoUsuario)
router.post('/', postCertificadoUsuario)
router.patch('/:id', patchCertificadoUsuario)
router.delete('/:id', removeCertificadoUsuario)

module.exports = router
