//window.visualsModule = visualsModule || {}

visualsModule.stackedChart = (function () {

    var _chartInstance;
    var _chartData;

    var _generateChartData = function (dataset) {
        //check the data availability
        if (dataset != undefined) {
            //its all right, so start extracting what matters
            var completeDataset = dataset;

            var countryData = _.find(completeDataset, function (d) {
                return (d.country === visualsModule.data.getSelectedCountry());
            });
            if (countryData != undefined) {
                _chartData = countryData.data;
            }

            //the chart expect an array of object like this
            //{ serieOneName: value,
            //  serieTwoName: value,
            //  serieThreeName: value, ... }
        }
        ;

    };

    var _drawChart = function (containerID, dataset) {
        _generateChartData(dataset);
        _chartInstance = AmCharts.makeChart(containerID, {
            "colors": ["#DB5800", "#FF9000", "#F0C600", "#8EA106", "#59631E", "#D1D88C", "#7890BF", "#D9CEC5", "#8C8074", "#BF4F36", "#105B63", "#9EA55A", "#FFD34E", "#DB9E36", "#BF6D68", "#95A7BF", "#EAF29C", '#0D8ECF', '#2A0CD0', '#CD0D74'],
//        default "colors":['#FF6600', '#FCD202', '#B0DE09', '#0D8ECF', '#2A0CD0', '#CD0D74', '#CC0000', '#00CC00', '#0000CC', '#DDDDDD', '#999999', '#333333', '#990000'],
            "type": "serial",
            "theme": "none",
            "pathToImages": "http://www.amcharts.com/lib/3/images/",
            "legend": {
                "align": "center",
                "equalWidths": true,
//            "periodValueText": "total: [[value.sum]]",
                "valueAlign": "left",
                "valueText": "[[value]] ([[percents]]%)",
                "fontSize": 9,
                "borderAlpha": 0.5
//            "valueWidth": 100
            },
            "dataProvider": _chartData,
            "valueAxes": [
                {
                    "stackType": "100%",
                    "gridAlpha": 0.1,
                    "position": "left",
                    "unitPosition": "right",
                    "title": "%"
                }
            ],
            "graphs": [
                {
                    "balloonText": "<span class='fa fa-lg fa-shopping-cart'>&nbsp; [[value]]</span>",
                    "fillAlphas": 0.3,
                    "lineAlpha": 0.5,
                    "title": "Alimentos",
                    "valueField": "division1",
                    "color": "#DB5800"
                },
                {
                    "balloonText": "<span class='fa fa-lg fa-glass'>&nbsp; [[value]]</span>",
                    "fillAlphas": 0.3,
                    "lineAlpha": 0.5,
                    "title": "Alcohol",
                    "valueField": "division2",
                    "color": "#FF9000"
                },
                {
                    "balloonText": "<img src='resources/images/clothing.png' style='vertical-align:bottom; margin-right: 10px; width:16px; height:16px;'><span style='font-size:14px; color:#000000;'>[[value]]</span>",
                    "fillAlphas": 0.3,
                    "lineAlpha": 0.5,
                    "title": "Vestuario",
                    "valueField": "division3",
                    "color": "#F0C600"
                },
                {
                    "balloonText": "<span class='fa fa-lg fa-home'>&nbsp; [[value]]</span>",
                    "fillAlphas": 0.3,
                    "lineAlpha": 0.5,
                    "title": "Vivienda",
                    "valueField": "division4",
                    "color": "#8EA106"
                },
                {
                    "balloonText": "<span class='fa fa-lg fa-power-off'>&nbsp; [[value]]</span>",
                    "fillAlphas": 0.3,
                    "lineAlpha": 0.5,
                    "title": "Equipamiento",
                    "valueField": "division5",
                    "color": "#D9CEC5"
                },
                {
                    "balloonText": "<span class='fa fa-lg fa-plus'>&nbsp; [[value]]</span>",
                    "fillAlphas": 0.3,
                    "lineAlpha": 0.5,
                    "title": "Salud",
                    "valueField": "division6",
                    "color": "#7890BF"
                },
                {
                    "balloonText": "<span class='fa fa-lg fa-bus'> &nbsp; [[value]]</span>",
                    "fillAlphas": 0.3,
                    "lineAlpha": 0.5,
                    "title": "Transporte",
                    "valueField": "division7",
                    "color": "#59631E"
                },
                {
                    "balloonText": "<span class='fa fa-lg fa-laptop'> &nbsp; [[value]]</span>",
                    "fillAlphas": 0.3,
                    "lineAlpha": 0.5,
                    "title": "Comunicaciones",
                    "valueField": "division8",
                    "color": "#7890BF"
                },
                {
                    "balloonText": "<span class='fa fa-lg fa-futbol-o'> &nbsp; [[value]]</span>",
                    "fillAlphas": 0.3,
                    "lineAlpha": 0.5,
                    "title": "Recreación",
                    "valueField": "division9",
                    "color": "#7890BF"
                },
                {
                    "balloonText": "<span class='fa fa-lg fa-mortar-board'> &nbsp; [[value]]</span>",
                    "fillAlphas": 0.3,
                    "lineAlpha": 0.5,
                    "title": "Educación",
                    "valueField": "division10",
                    "color": "#7890BF"
                },
                {
                    "balloonText": "<span class='fa fa-lg fa-plane'> &nbsp; [[value]]</span>",
                    "fillAlphas": 0.3,
                    "lineAlpha": 0.5,
                    "title": "Hoteles",
                    "valueField": "division11",
                    "color": "#7890BF"
                },
                {
                    "balloonText": "<span class='fa fa-lg fa-visa'> &nbsp; [[value]]</span>",
                    "fillAlphas": 0.3,
                    "lineAlpha": 0.5,
                    "title": "Bienes",
                    "valueField": "division12",
                    "color": "#7890BF"
                }

            ],
            "plotAreaBorderAlpha": 0,
            "marginLeft": 0,
            "marginBottom": 0,
            "chartCursor": {
                "cursorAlpha": 0,
                "zoomable": false
            },
            "categoryField": "year",
            "categoryAxis": {
                "fontSize": 10,
                "startOnAxis": true,
                "axisColor": "#DADADA",
                "gridAlpha": 0.07
            },
            "exportConfig": {
                "menuTop": "10px",
                "menuRight": "11px",
                "menuItems": [
                    {
                        "icon": 'http://www.amcharts.com/lib/3/images/export.png',
                        "format": 'png'
                    }
                ]
            }
        });
    };

    var getChartInstance = function () {
        return _chartInstance;
    }

    var initMethod = function () {
        // show the chart
        visualsModule.myDOMElements.stacked_container.ref.show();

        //draw and setup event handlers
        _drawChart(visualsModule.myDOMElements.stacked_div.id);

        //Show the time series for the specific division when this chart is clicked
        //_chartInstance.addListener("clickGraph", function (event) {
        //        visualsModule.myDOMElements.stock_container.ref.show();
        //        visualsModule.utils.scrollToElement(visualsModule.myDOMElements.stock_container.id);
        //
        //        var graphData = event.graph; //AmGraph object
        //        if (graphData != undefined) {
        //            var graphid = graphData.id;
        //            var graphtitle = graphData.title;
        //        }
        //    }
        //);
    }

    return {
        init: initMethod,
        getChartInstance: getChartInstance,
        drawChart: _drawChart
    };

})
();
