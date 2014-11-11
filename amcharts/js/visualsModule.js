var visualsModule = (function () {

    var initMethod = function ($container) {
        //placeholder for initialization
        //multilanguage support for instance,
        //I actually tried using i18next library but it didn't work as expected
        //so I leave my texts hard coded :(
        //i18next.init()
        console.log("visualsModule. initMethod");
    };



    //helper to mantain some DOM ids and jQuery object references
    var getDOMElements = function () {
        return {
            worldmap_panel: { id: 'world-map-panel', ref: $('#world-map-panel') } ,
            worldmap_container: { id: 'world-map-container', ref: $('#world-map-container') } ,
            worldmap_div: { id: 'map-div', ref: $('#world-map-div') },

            stacked_panel: { id: 'stacked-chart-panel', ref: $('#stacked-chart-panel') },
            stacked_container: { id: 'stacked-chart-container', ref: $('#stacked-chart-container') },
            stacked_div: { id: 'stacked-div', ref: $('#stacked-div') },

            lines_panel: { id: 'lines-chart-panel', ref: $('#lines-chart-panel') },
            lines_container: { id: 'lines-chart-container', ref: $('#lines-chart-container') },
            lines_div: { id: 'lines-div', ref: $('#lines-div') },

            multi_panel: { id: 'multi-chart-container', ref: $('#multi-chart-panel') },
            multi_container: { id: 'multi-chart-container', ref: $('#multi-chart-container') },
            multi_div: { id: 'multi-div', ref: $('#multi-div') },

            bubbles_panel: { id: 'bubbles-chart-panel', ref: $('#bubbles-chart-panel') },
            bubbles_container: { id: 'bubbles-chart-container', ref: $('#bubbles-chart-container') },
            bubbles_div: { id: 'bubbles-div', ref: $('#bubbles-div') }

        };
    }();

    return {
        init: initMethod,
        myDOMElements: getDOMElements
    };

})
();
