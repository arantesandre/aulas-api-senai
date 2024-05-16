const express = require('express');
const port = 3000;

const app = express();
app.use(express.json());

app.get('/usuarios', (req, res) => {
    console.log(req.query)
    res.send('Chamou o GET!');
    
});

app.post('/usuarios', (req, res) => {
    console.log(req.body)
    res.send(`Chamou o POST com o nome: ${req.body.nome}`);
});

app.put('/usuarios', (req, res) => {
    console.log(req.headers)

    if(!req.headers.autorizacao){


    }else{

        res.send('Chamou o PUT!');
    }
    
    
});

app.delete('/usuarios/:id', (req, res) => {
    res.send('Chamou o DELETE!');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});