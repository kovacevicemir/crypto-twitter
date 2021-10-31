const dollarFormatter = (num) => { 
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0}).format(num)
}

module.exports = dollarFormatter