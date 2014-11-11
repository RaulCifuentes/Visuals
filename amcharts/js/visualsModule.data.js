visualsModule.data = (function () {

    var _stackedChartData;
    var _multiChartData;
    var _linesChartData;
    var _bubblesChartData;
    //colombia, chile, peru
    var _selectedCountry;


    var _reloadDataLinesChart = function (sourceJSON, myCallback) {
        // Assign handlers immediately after making the request,
        // and remember the jqxhr object for this request
        var _jqxhr = $.getJSON(sourceJSON, function () {
                console.log("success:: _linesChartData : " + _linesChartData);
            })
                .done(function (data, textStatus, jqXHR) {
                    _linesChartData = data;
                    //console.log("done success:: _linesChartData : " + _linesChartData);
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    var errorReported = textStatus + ", " + errorThrown;
                    console.log("error >> Request Failed: " + errorReported);
                    console.log("error >> _linesChartData : " + _linesChartData);

                })
                .always(function (data, textStatus, errorThrown) {
                    //console.log("always sucess:: _linesChartData : " + _linesChartData);
                    //console.log("always text status" + textStatus);
                }
            )
            ;
        // Set another completion function for the request above
        _jqxhr.complete(function () {
            console.log("complete sucess:: _linesChartData : " + _linesChartData);
            myCallback(_linesChartData);
            return _linesChartData;
        });

    };


    var _reloadDataStackedChart = function (sourceJSON, myCallback) {
        // Assign handlers immediately after making the request,
        // and remember the jqxhr object for this request
        var _jqxhr = $.getJSON(sourceJSON, function () {
                console.log("success:: _stackedChartData : " + _stackedChartData);
            })
                .done(function (data, textStatus, jqXHR) {
                    _stackedChartData = data;
                    //console.log("done success:: _stackedChartData : " + _stackedChartData);
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    var errorReported = textStatus + ", " + errorThrown;
                    console.log("error >> Request Failed: " + errorReported);
                    console.log("error >> _stackedChartData : " + _stackedChartData);

                })
                .always(function (data, textStatus, errorThrown) {
                    //console.log("always sucess:: _stackedChartData : " + _stackedChartData);
                    //console.log("always text status" + textStatus);
                }
            )
            ;
        // Set another completion function for the request above
        _jqxhr.complete(function (data) {
            console.log("complete sucess:: _stackedChartData : " + _stackedChartData);
            myCallback(_stackedChartData);
            return _stackedChartData;
        });

    };


    var _reloadDataMultiChart = function (sourceJSON, myCallback) {
        var originalDataReaded;
        // Assign handlers immediately after making the request,
        // and remember the jqxhr object for this request
        var _jqxhr = $.getJSON(sourceJSON, function () {
                console.log("success:: _multiChartData : " + _multiChartData);
            })
                .done(function (data, textStatus, jqXHR) {
                    originalDataReaded = data;
                    //console.log("done success:: _multiChartData : " + _multiChartData);
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    var errorReported = textStatus + ", " + errorThrown;
                    console.log("error >> Request Failed: " + errorReported);
                    console.log("error >> _multiChartData : " + _multiChartData);

                })
                .always(function (data, textStatus, errorThrown) {
                    //console.log("always sucess:: _multiChartData : " + _multiChartData);
                    //console.log("always text status" + textStatus);
                }
            )
            ;
        // Set another completion function for the request above
        _jqxhr.complete(function () {
                console.log("complete sucess:: _multiChartData : " + originalDataReaded);


                //transformar el arreglo original en algo como lo necesito y guardarlo
                //para no recargar la data cada vez que cambie el pais


                var transformedCompleteData = [];
                //For each country transform
                for (var countryIndex = 0; countryIndex < originalDataReaded.length; countryIndex++) {

                    var specificCountryArray = originalDataReaded[countryIndex];

                    //Elegir el primer elemento y sacar los indices que tiene disponible

                    var series = _.keys(specificCountryArray.observedVariables);
                    console.log(series);

                    //Pre-armar un objeto que representara esa serie ( cada indice es una serie)
                    var objectsArray = [];

                    var renderers = ['line', 'stack', 'bar', 'scatterplot', 'line', 'stack'];
                    var colors = [
                        'rgba(30, 195, 146, 1)',
                        'rgba(231, 210, 146, .3)',
                        'rgba(255, 0, 0, 0.4)',
                        'rgba(127, 0, 0, 0.3)',
                        'rgba(98, 126, 149, .6)'
                    ];

                    console.log(objectsArray);

                    _.forEach(series, function (indexName) {
                        objectsArray.push({
                            name: indexName,
                            color: colors.shift(),
                            opacity: .3,
                            renderer: renderers.shift(),
                            data: specificCountryArray.observedVariables[indexName]
                        })
                    });


                    console.log(objectsArray);

                    for (var ij = 0; ij < objectsArray.length; ij++) {
                        var obj = objectsArray[ij];

                        _.forEach(obj.data, function (d) {
                            var splitedDate = d.date.split('-');
                            var parsedYear = splitedDate[0];
                            var parsedMoth = splitedDate[1];
                            var dateCreated = new Date(parsedYear, parsedMoth)
                            d.x = dateCreated.getTime() / 1000;
                            d.y = visualsModule.utils.normalize(obj.name, d.value);
                        });

                    }

                    transformedCompleteData.push({country: originalDataReaded[countryIndex].country, txData: objectsArray});
                } //End For each country transform


                _multiChartData = transformedCompleteData;
                console.log(transformedCompleteData);

                //el callback se va con el transform completo
                myCallback(transformedCompleteData);
                return _multiChartData;
            }
        )
        ;
    };



    var _getLastDataStackedChart = function () {
        return _stackedChartData;
    }

    var _getLastDataMultiChart = function () {
        return _multiChartData;
    }

    var _getLastDataLinesChart = function () {
        return _linesChartData;
    }

    var _getSelectedCountry = function () {
        //first time loading theres no yet country selected, so use
        //chile as default
        if (_selectedCountry === undefined) {
            _selectedCountry = "chile";
        }
        return _selectedCountry;
    }
    var _setSelectedCountry = function (selectedCountry) {
        _selectedCountry = selectedCountry;
    }

    return {
        getLastDataStackedChart: _getLastDataStackedChart,
        getLastDataMultiChart: _getLastDataMultiChart,
        getLastDataLinesChart: _getLastDataLinesChart,
        loadDataStackChart: _reloadDataStackedChart,
        loadDataLinesChart: _reloadDataLinesChart,
        loadDataMultiChart: _reloadDataMultiChart,
        getSelectedCountry: _getSelectedCountry,
        selectedCountry: _setSelectedCountry
        //,
        //getLastDataBubblesChart: _getLastDataBubblesChart,
        //loadDataBubblesChart: _reloadDataBubblesChart
    };

})
();


//**** I HAD NO TIME TO SET UP THE BUBBLES CHART HARD TIME
//
//var _addYearToData = function (year, dataArray) {
//    dataArray.forEach(function (d) {
//        d.year = 2013;
//    });
//}
//
//var _reloadDataBubblesChart = function (sourceDSV, delimiter, myCallback) {
//    var concatArray = [];
//    var myParser = d3.dsv(delimiter, 'text/plain');
//    myParser(sourceDSV, myCallback);
//};
//
//var loadDataBubblesChart = function (sourceDSV, delimiter, years) {
//    var fileName = sourceDSV.append('-' + years[0]);
//    _reloadDataBubblesChart(fileName, delimiter, _addYearToData());
//    for(var index=1; index<years.length; index++){
//        var currYear = years[i];
//        _addYearToData(currYear,)
//    }
//};
//