//window.visualsModule = visualsModule || {}

visualsModule.multiChart = (function () {

    var _chartData;
    var _chartInstance;

    var _generateChartData = function (dataset) {
        if (dataset != undefined) {
            //its all right, transform the complete data set into whatever
            //the actual chart needs to create the chart
            ////Find the user-selected country
            var specificCountryArray = _.find(dataset, function (curr) {
                return (curr.country == visualsModule.data.getSelectedCountry());
            });

            _chartData = specificCountryArray.txData;
        }
        console.log('exiting ' + ' generateChartData');
    }


    var _drawChart = function (containerID, dataset) {
        _generateChartData(dataset);
        _chartInstance  = new Rickshaw.Graph({
            element: document.getElementById(containerID),
            renderer: 'multi',
            width: 900,
            height: 500,
            dotSize: 5,
            series: _chartData
        });

        var slider = new Rickshaw.Graph.RangeSlider.Preview({
            graph: _chartInstance,
            element: document.querySelector('#multi-slider')
        });

        _chartInstance.render();

        //var detail = new Rickshaw.Graph.HoverDetail({
        //    graph: _chartInstance
        //});

        var hoverDetail = new Rickshaw.Graph.HoverDetail( {
            graph: _chartInstance,


            formatter: function(series, x, y, formattedX, formattedY, d) {

                xFormatter = function(x) {
                    var d = new Date( x * 1000);
                    var curr_date = d.getDate();
                    var curr_month = d.getMonth();
                    var curr_year = d.getFullYear();
                    var m_names = new Array("Ene", "Feb", "Mar",
                        "Abr", "May", "Jun", "Jul", "Ago", "Sep",
                        "Oct", "Nov", "Dic");
                    return curr_date + "-" + m_names[curr_month]
                        + "-" + curr_year ;
                };

                yFormatter = function(y) {
                    return y === null ? y : y.toFixed(2);
                };

                var swatch = '<span class="detail_swatch" style="background-color: ' + series.color + '"></span>';
                //var content = swatch + formattedX + '<br>' + yFormatter(visualsModule.utils.denormalize(series.name, y)) + ' ' + series.name;
                var content = swatch + xFormatter(x) + '<br>' + yFormatter(visualsModule.utils.denormalize(series.name, y)) + ' ' + series.name;
                return content;
            }
        } );


    };

    var initMethod = function (dataset) {
        // show the stock
        visualsModule.myDOMElements.multi_container.ref.show();

        //draw and setup event handlers
        _drawChart(visualsModule.myDOMElements.multi_div.id, dataset);

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
