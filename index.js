const express = require('express');
const app = express();

app.use(express.json());

app.post('/', async (req, res) => {
    try {
        const data = req.body;
        
        // Verificar si el modo simulación está activo
        const isDryRun = process.env.DRY_RUN && process.env.DRY_RUN.toLowerCase() === 'true';

        if (isDryRun) {
            console.log("Modo simulación activo: orden recibida sin tocar Binance.");
            return res.status(200).json({
                status: "success",
                mode: "SIMULATION",
                message: "Orden de prueba simulada correctamente",
                received_data: data
            });
        }

        // --- CÓDIGO REAL DE BINANCE ---
        // (Esto solo se ejecutará cuando cambies DRY_RUN a False en el futuro)

    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
