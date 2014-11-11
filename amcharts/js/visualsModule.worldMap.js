//visualsModule = visualsModule || {}

visualsModule.worldMap = (function () {

    var _mapData = [];
    var _mapInstance;

    var _generateMapData = function () {
        _mapData = {
            mapVar: AmCharts.maps.worldLow,
            zoomLevel: 2,
            zoomLongitude: -85,
            zoomLatitude: -12,
            areas: [
                {
                    id: "CO",
                    title: "Colombia",
                    selectable: true,
                    customData: "1810",
                    groupId: "colombia"
                }, {
                    id: "CL",
                    title: "Chile",
                    selectable: true,
                    customData: "1818",
                    groupId: "chile"
                }, {
                    id: "PE",
                    title: "Perú",
                    selectable: true,
                    customData: "1825",
                    groupId: "peru"
                }
            ]
        };
    };

    var _drawMap = function (containerID) {
        _generateMapData();
        _mapInstance = new AmCharts.AmMap();
        //_mapInstance.panEventsEnabled = true;
        _mapInstance.zoomOnDoubleClick = false;
        _mapInstance.fitMapToContainer = true;
        _mapInstance.pathToImages = "js/vendor/ammap/images/";
        //_mapInstance.pathToImages = "http://www.amcharts.com/lib/3/images/";
        //_mapInstance.panEventsEnabled = true; // this line enables pinch-zooming and dragging on touch devices
        //_mapInstance.zoomControl.panControlEnabled = true;
        //_mapInstance.zoomControl.zoomControlEnabled = true;

        _mapInstance.areasSettings = {
            autoZoom: false,
            unlistedAreasColor: "#DDDDDD",
            rollOverOutlineColor: "#FFFFFF",
            rollOverColor: "#CC0402",
            selectedColor: "#880000",
            selectable: true,
            alpha: 0.8,
            unlistedAreasAlpha: 0.5
        };

        _mapInstance.dataProvider = _mapData;

        _mapInstance.write(containerID);

        //When a selectable country is picked show others charts
        _mapInstance.addListener("clickMapObject", function (event) {
            if (event.mapObject.groupId != undefined) {
                var selectedAreaID = event.mapObject.groupId;
                visualsModule.data.selectedCountry(selectedAreaID);
                _updateStackDataset(visualsModule.data.getSelectedCountry());
                _updateLineDataset(visualsModule.data.getSelectedCountry());
                _updateMultiDataset(visualsModule.data.getSelectedCountry());
                //animate transition to show stacked chart
                //visualsModule.myDOMElements.lines_container.ref.hide(400);
                //visualsModule.myDOMElements.stacked_container.ref.show(400);
                //scroll to second panel
                visualsModule.utils.scrollToElement(visualsModule.myDOMElements.lines_container.id);
            }
        });

    };

    var initMethod = function () {
        // show the map
        //visualsModule.myDOMElements.worldmap_container.ref.show(300);
        console.log("visualsModule.worldMap initMethod");
        //draw and setup event handlers
        _drawMap(visualsModule.myDOMElements.worldmap_div.id);

        //fires the show init state Chile selected
        var mapObject = _mapInstance.getObjectById("CL");
        _mapInstance.clickMapObject(mapObject);

        //show the map
        visualsModule.utils.scrollToElement(visualsModule.myDOMElements.worldmap_panel.id)

    };

    // When user select a country in the map the stacked dataset changes so the charts needs to update

    var _updateStackDataset = function (selectedCountry) {
        //Find data for that area (country)
        var countryData;
        if (visualsModule.data.getLastDataStackedChart() != undefined) {
            var datasetForStacked = visualsModule.data.getLastDataStackedChart();
            $.each(datasetForStacked, function (key, value) {
                if (value.country === selectedCountry) {
                    countryData = value.data;
                    return false;
                }
            });
        }

        if (countryData == undefined) {
            visualsModule.myDOMElements.stacked_container.ref.hide();
        } else {
            visualsModule.myDOMElements.stacked_container.ref.show(200);
            visualsModule.stackedChart.getChartInstance().dataProvider = countryData;
            visualsModule.stackedChart.getChartInstance().validateData();
        }
    };

    // When user select a country in the map the line dataset does not change.
    // Only the style of that graph changes so only the view needs to update

    var _updateLineDataset = function (selectedCountry) {
        var graphsArrays;
        if (visualsModule.linesChart.getChartInstance()!= undefined){
            graphsArrays = visualsModule.linesChart.getChartInstance().graphs;
        }
        if (graphsArrays != undefined) {
            $.each(graphsArrays, function (index, value) {
                //find the corresponding graph and modify style accordingly
                if (selectedCountry === value.valueField) {
                    value.bulletSize = 20;
                    value.bulletAlpha = 1;
                    value.lineAlpha = 1;
                    value.lineThickness = 12;
                } else {
                    value.bulletSize = 5;
                    value.bulletAlpha = .4;
                    value.lineThickness = 2;
                    value.lineAlpha = .4;
                }
            });
            visualsModule.linesChart.getChartInstance().validateNow();
        }
    };


    // When user select a country in the map the stacked dataset changes so the charts needs to update

    var _updateMultiDataset = function (selectedCountry) {
        //Find data for that area (country)
        var countryData;
        if (visualsModule.data.getLastDataMultiChart() != undefined) {
            var datasetForMulti = visualsModule.data.getLastDataMultiChart();
            for (var ijCountry = 0; ijCountry < datasetForMulti.length; ijCountry++) {
                var specificCountry = datasetForMulti[ijCountry];
                if (specificCountry.country == selectedCountry){
                    countryData = specificCountry.txData;
                }
            }

            if (countryData == undefined) {
                //there's no data available for that country, hide it
                visualsModule.myDOMElements.multi_container.ref.hide();
            } else {
                //its all right
                visualsModule.myDOMElements.multi_container.ref.show(200);
                    visualsModule.stackedChart.getChartInstance().dataProvider = countryData;
                visualsModule.stackedChart.getChartInstance().validateData();
            }

        }
    };

    //getter method
    var getMapInstance = function () {
        return _mapInstance;
    };

    return {
        init: initMethod,
        drawMap: _drawMap,
        getMapInstance: getMapInstance
    };

})
();
