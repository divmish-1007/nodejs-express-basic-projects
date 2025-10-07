const express = require('express')
const app = new express()

function calculateSum(n){
    let sum = 0;
    for(let i=1; i<=n; i++){
        sum = sum+i;
    }
    return sum;
}

app.get('/', (req, res) => {
    const n = req.query.n
    const ans = calculateSum(n);
    res.send(ans.toString());
})

app.listen(3000)
