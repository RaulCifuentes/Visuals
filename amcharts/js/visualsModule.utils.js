visualsModule.utils = (function () {

    var _normalizationTable = {
        "USD": 500 / 1.5,
        "UF": 20000 * 2,
        "Desempleo": 10,
        "IPC": 100
    };


    var _normalize = function (indexName, value) {
        //This is just to create a better vertical visual distribution
        var factor = _normalizationTable[indexName];
        return (value / factor) * 100;
    }

    var _denormalize = function(indexName, value){
        var factor = _normalizationTable[indexName];
        return (value/100)*factor;
    }

    var _scrollToElement =  function (targetID) {
        var target = $('#' + targetID);
        var targetTop = target.offset().top - 20;
        $('html,body').animate({scrollTop: targetTop}, 800);
        return false;
    }


    function _fancyScrollToElement( targetID ) {
        var topoffset = 30;
        var speed = 800;
        var destination = $('#' + targetID ).offset().top - topoffset;
        $( 'html:not(:animated),body:not(:animated)' ).animate( { scrollTop: destination}, speed, function() {
            window.location.hash = targetID;
        });
        return false;
    }

    //clean up the screen -  hide the charts
    var hideChartsMethod = function ($container) {
        visualsModule.myDOMElements.lines_container.ref.hide(200);
        visualsModule.myDOMElements.stacked_container.ref.hide(200);
        visualsModule.myDOMElements.multi_container.ref.hide(200);
    };

    return {
        scrollToElement: _scrollToElement,
        fancyScrollToElement: _fancyScrollToElement,
        normalize : _normalize,
        denormalize: _denormalize
    };

})
();
