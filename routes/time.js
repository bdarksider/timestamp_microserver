var express = require('express');

module.exports = function() {
    var app = express.Router();

    app.get('/:date', (req, res) => {
        var date = Number(req.params.date);

        // if date contains string
        if (isNaN(date)) {
            date = req.params.date;
        }

        var formattedDate = dateHandler(date);
        res.json(formattedDate);
    });

    return app;
}

function dateHandler(date) {
    var dateToSend = {
        unix: null,
        natural: null
    };
    
    var dateObj = new Date(date);
    if (dateObj == 'Invalid Date') return dateToSend;

    // set received time to unix time
    dateToSend.unix = dateObj.getTime();
    // set received time to natural date
    dateToSend.natural = toNaturalDate(dateObj);

    return dateToSend;
}

function toNaturalDate(date) {
    var day = date.getDate();
    var month = getMonthName(date);
    var year = date.getFullYear();

    var naturalDate = `${month} ${day}, ${year}`;
    return naturalDate;
}

function getMonthName(date) {
    var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[date.getMonth()];
}