//window.visualsModule = visualsModule || {}

visualsModule.oldstockChart = (function () {

    var _chartData = [];
    var _chartInstance;

    var _generateChartData = function () {
        console.log('entering ' + 'generateChartData');
        var firstDate = new Date();
        firstDate.setHours(0, 0, 0, 0);
        firstDate.setDate(firstDate.getDate() - 2000);

        for (var i = 0; i < 2000; i++) {
            var newDate = new Date(firstDate);

            newDate.setDate(newDate.getDate() + i);

            var open = Math.round(Math.random() * (30) + 100);
            var close = open + Math.round(Math.random() * (15) - Math.random() * 10);

            var low;
            if (open < close) {
                low = open - Math.round(Math.random() * 5);
            } else {
                low = close - Math.round(Math.random() * 5);
            }

            var high;
            if (open < close) {
                high = close + Math.round(Math.random() * 5);
            } else {
                high = open + Math.round(Math.random() * 5);
            }

            var volume = Math.round(Math.random() * (1000 + i)) + 100 + i;

            var value = Math.round(Math.random() * (30) + 100);

            _chartData[i] = ({
                date: newDate,
                open: open,
                close: close,
                high: high,
                low: low,
                volume: volume,
                value: value
            });
        }
        console.log('exiting ' + ' generateChartData');
    }

    var _drawChart = function (containerID) {
        console.log('entering ' + ' drawChart');
        _generateChartData();
        _chartInstance = AmCharts.makeChart(containerID, {
            type: "stock",
            "theme": "none",
            pathToImages: "http://www.amcharts.com/lib/3/images/",

            dataSets: [
                {
                    fieldMappings: [
                        {
                            fromField: "open",
                            toField: "open"
                        },
                        {
                            fromField: "close",
                            toField: "close"
                        },
                        {
                            fromField: "high",
                            toField: "high"
                        },
                        {
                            fromField: "low",
                            toField: "low"
                        },
                        {
                            fromField: "volume",
                            toField: "volume"
                        },
                        {
                            fromField: "value",
                            toField: "value"
                        }
                    ],

                    color: "#7f8da9",
                    dataProvider: _chartData,
                    title: "West Stock",
                    categoryField: "date"
                },
                {
                    fieldMappings: [
                        {
                            fromField: "value",
                            toField: "value"
                        }
                    ],
                    color: "#fac314",
                    dataProvider: _chartData,
                    compared: true,
                    title: "East Stock",
                    categoryField: "date"
                }
            ],


            panels: [
                {
                    title: "Value",
                    showCategoryAxis: false,
                    percentHeight: 70,
                    valueAxes: [
                        {
                            id: "v1",
                            dashLength: 5
                        }
                    ],

                    categoryAxis: {
                        dashLength: 5
                    },

                    stockGraphs: [
                        {
                            type: "candlestick",
                            id: "g1",
                            openField: "open",
                            closeField: "close",
                            highField: "high",
                            lowField: "low",
                            valueField: "close",
                            lineColor: "#7f8da9",
                            fillColors: "#7f8da9",
                            negativeLineColor: "#db4c3c",
                            negativeFillColors: "#db4c3c",
                            fillAlphas: 1,
                            useDataSetColors: false,
                            comparable: true,
                            compareField: "value",
                            showBalloon: false,
                            proCandlesticks: true
                        }
                    ],

                    stockLegend: {
                        valueTextRegular: undefined,
                        periodValueTextComparing: "[[percents.value.close]]%"
                    }
                },

                {
                    title: "Volume",
                    percentHeight: 30,
                    marginTop: 1,
                    showCategoryAxis: true,
                    valueAxes: [
                        {

                            dashLength: 5
                        }
                    ],

                    categoryAxis: {
                        dashLength: 5
                    },

                    stockGraphs: [
                        {
                            valueField: "volume",
                            type: "column",
                            showBalloon: false,
                            fillAlphas: 1
                        }
                    ],

                    stockLegend: {
                        markerType: "none",
                        markerSize: 0,
                        labelText: "",
                        periodValueTextRegular: "[[value.close]]"
                    }
                }
            ],

            chartScrollbarSettings: {

                graph: "g1",
                graphType: "line",
                usePeriod: "WW"
            },


            chartCursorSettings: {
                valueLineBalloonEnabled: true,
                valueLineEnabled: true
            },

            periodSelector: {
                position: "bottom",
                periods: [
                    {
                        period: "DD",
                        count: 10,
                        label: "10 days"
                    },
                    {
                        period: "MM",
                        selected: true,
                        count: 1,
                        label: "1 month"
                    },
                    {
                        period: "YYYY",
                        count: 1,
                        label: "1 year"
                    },
                    {
                        period: "YTD",
                        label: "YTD"
                    },
                    {
                        period: "MAX",
                        label: "MAX"
                    }
                ]
            }
        });
        console.log('exiting ' + 'drawChart' );
    };

    var initMethod = function () {
        // show the stock
        visualsModule.myDOMElements.stock_container.ref.show();

        $container = visualsModule.myDOMElements.stock_div.id;

        //draw and setup event handlers
        _drawChart($container);

        //What to do when user zoomed ??
        _chartInstance.addListener("zoomed", function (event) {

        });
    }

    var getChartInstance = function () {
        return _chartInstance;
    }

    return {
        init: initMethod,
        getChartInstance: getChartInstance,
        drawChart: _drawChart
    };

})
();
