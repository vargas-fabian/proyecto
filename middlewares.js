
const ES_ADMIN = true;
const FORBIDDEN = 403;

const soloAdmins = ( _ , res , next ) => {
    if (ES_ADMIN) {
        next()
        return
    }
    res.status(FORBIDDEN).json({ error: { descripcion: `ruta NO autorizada`}})
}

module.exports = {
    soloAdmins,
}