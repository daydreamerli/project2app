const url = 'http://localhost:4000/api/power';
const url1 = 'http://localhost:4000/api/power21'
let datasetP1 = [];
let xyz=0;
let z;
let datasetP = [];

// fetch call to our /api/data page
fetch(url)
    // creates promise to work with response from /api/data
    .then(res => {
        // throws error if there is a problem fetching page
        if (!res.ok) {
            // returns error with response text of error
            throw new Error(res.statusText);
        }
        // returns data from /api/data page in json format to next promise
        return res.json();
    })
    // creates promise with returned data from previous promise
    .then(data => {
        // creates entries variable to store JSON data form /api/data
        let entries = data;



        // creates empty powerInfo array
        let powerInfo = [];
        // loops through data from entry variable
        entries.forEach(entry => {
            // pushes values from entries variable to empty entryInfo array
            if (entry.Power != null) {

                powerInfo.push([(entry.Date), parseInt(entry.Power)]);
            }

        });





        for (var i = 0; i < 12; i++) {
            datasetP.push((powerInfo[i])[1]);
        }
        for (var i = 6; i < 24; i++) {
            datasetP1.push((powerInfo[i])[1]);
        }

        // for (var i = 0; i < 12; i++) {
        //   datasetP.push((power1Info[i])[1]);
        // }

        var config = {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
                    'September',
                    'October', 'November', 'December'
                ],
                datasets: [{
                    label: 'Power usage for 2020',
                    backgroundColor: window.chartColors.red,
                    borderColor: window.chartColors.red,
                    fill: false,
                    data: datasetP,
                }, {
                    label: 'Power usage for 2021',
                    backgroundColor: window.chartColors.blue,
                    borderColor: window.chartColors.blue,
                    fill: false,
                    data: datasetP1,
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Chart.js Line Chart - Logarithmic'
                },
                scales: {
                    xAxes: [{
                        display: true,

                    }],
                    yAxes: [{
                        display: true,
                        ticks:{
                            beginAtZero: true
                        }
                        // type: 'logarithmic',
                    }]
                }
            }
        };


        var ctx = document.getElementById('canvas').getContext('2d');
        window.myLine = new Chart(ctx, config);

    })
    // catches errors in promise chain
    .catch(error => console.log('fetch error'));