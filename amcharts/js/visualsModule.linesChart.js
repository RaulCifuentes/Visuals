//visualsModule = visualsModule || {}

visualsModule.linesChart = (function () {

    var _chartInstance;
    var _chartData;

    var _generateChartData = function (dataset) {
        // there's no need to read from file as it was done on init
        // just check the variable is defined
        //check the data availability
        //if (visualsModule.data.getLastDataLinesChart()) {
        //    //its all right
        //    //_chartData = visualsModule.data.getLastDataLinesChart();
        //}
        if (dataset != undefined) {
            _chartData = dataset;
        }

    };

    var _drawChart = function (containerID, dataset) {
        _generateChartData(dataset);
        _chartInstance = AmCharts.makeChart(containerID, {
            "type": "serial",
            "theme": "none",
            "pathToImages": "http://www.amcharts.com/lib/3/images/",
            "dataDateFormat": "YYYY-MM",
            equalSpacing: true,
            "valueAxes": [{
                "id": "v1",
                "axisAlpha": 0,
                "position": "right"
            }],
            "legend": {
                //"position": "left",
                "horizontalGap": 10,
                "useGraphSettings": true,
                "markerSize": 10
            },
            "graphs": [{
                "id": "g1",
                "bullet": "round",
                "bulletBorderAlpha": 1,
                "bulletColor": "#AAFF34",
                "bulletSize": 5,
                "hideBulletsCount": 50,
                "lineThickness": 2,
                "title": "Peru",
                "useLineColorForBulletBorder": true,
                "valueField": "peru"
            }, {
                "id": "g2",
                "bullet": "round",
                "bulletBorderAlpha": 1,
                "bulletColor": "#FF10FF",
                "bulletSize": 5,
                "hideBulletsCount": 50,
                "lineThickness": 2,
                "title": "Chile",
                "useLineColorForBulletBorder": true,
                "valueField": "chile"
            }, {
                "id": "g3",
                "bullet": "round",
                "bulletBorderAlpha": 1,
                "bulletColor": "#FF10FF",
                "bulletSize": 5,
                "hideBulletsCount": 50,
                "lineThickness": 2,
                "title": "Colombia",
                "useLineColorForBulletBorder": true,
                "valueField": "colombia"
            }, {
                "id": "g4",
                "bullet": "round",
                "bulletBorderAlpha": 1,
                "bulletColor": "#FF10FF",
                "bulletSize": 5,
                "hideBulletsCount": 50,
                "lineThickness": 2,
                "title": "Argentina",
                "useLineColorForBulletBorder": true,
                "valueField": "argentina"
            }, {
                "id": "g5",
                "bullet": "round",
                "bulletBorderAlpha": 1,
                "bulletColor": "#FF10FF",
                "bulletSize": 5,
                "hideBulletsCount": 50,
                "lineThickness": 2,
                "title": "Brasil",
                "useLineColorForBulletBorder": true,
                "valueField": "brasil"
            }],
            "chartScrollbar": {
                "graph": "g1",
                "scrollbarHeight": 30
            },
            "chartCursor": {
                "cursorPosition": "mouse",
                "pan": true,
                "valueLineEnabled": true,
                "valueLineBalloonEnabled": true
            },
            "categoryField": "date",
            "categoryAxis": {
                "parseDates": true,
                "dashLength": 1,
                "minorGridEnabled": true,
                "position": "top"
            },
            dataProvider: _chartData
        });
        //_chartInstance.dataProvider = _chartData;
        //_chartInstance.validateData();

    };

    var getChartInstance = function () {
        return _chartInstance;
    }

    var initMethod = function (dataset) {
        // show the map
        visualsModule.myDOMElements.lines_container.ref.show();

        //draw and setup event handlers
        _drawChart(visualsModule.myDOMElements.lines_div.id, dataset);

        //Handle the events of interest
        _chartInstance.addListener("clickGraph", function (event) {
                //no particular action here
            }
        );
    };


    return {
        init: initMethod,
        getChartInstance: getChartInstance,
        drawChart: _drawChart
    };

})
();
