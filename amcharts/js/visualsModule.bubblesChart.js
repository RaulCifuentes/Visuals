//visualsModule.bubblesChart = (function () {
//
//    init = function (_data) {
//        custom_chart(_data);
//        start();
//    };
//
//    display_all = display_group_all;
//    display_year = display_by_year;
//    toggle_view = function (view_type) {
//        if (view_type == 'year') {
//            display_by_year();
//        } else {
//            display_group_all();
//        }
//    };
//
//
//}());
//
//var initMethod = function ($container) {
//    _drawChart($container, Tooltip);
//}
//
//
//var _drawChart = function (containerID, Tooltip) {
//    var width = 900,
//        height = 640,
//        container = visualsModule.myDOMElements.bubbles_container.ref,
//        tooltip = Tooltip(container,"prices_tooltip", 340),
//        layout_gravity = -0.01,
//        damper = 0.1,
//        nodes = [],
//        vis, force, circles, radius_scale;
//
//    var center = {x: width / 2, y: height / 2};
//
//    var year_centers = {
//        "2013": {x: width / 4 + width / 5, y: height / 2},
//        "2014": {x: width - (2 * width / 5), y: height / 2}
//    };
//
//    var fill_color = d3.scale.ordinal()
//
//        .domain(["Alimentos",
//            "Alcohol",
//            "Vestuario",
//            "Vivienda",
//            "Equipamiento",
//            "Salud",
//            "Transporte",
//            "Comunicaciones",
//            "Recreación",
//            "Educación",
//            "Restaurantes",
//            "Bienes y Servicios"
//        ])
//        .range(["#DB5800", "#FF9000", "#F0C600", "#8EA106", "#59631E", "#D1D88C", "#7890BF", "#D9CEC5", "#8C8074", "#BF4F36", "#105B63", "#9EA55A", "#FFD34E", "#DB9E36",  "#BF6D68", "#95A7BF", "#EAF29C"]);
//
//
//    function custom_chart(data) {
//        var max_amount = d3.max(data, function (d) {
//            return parseInt(d.Ponderacion * 30, 10);
//        });
//        radius_scale = d3.scale.pow().exponent(0.5).domain([0, max_amount]).range([2, 85]);
//
//        //create node objects from original data
//        //that will serve as the data behind each
//        //bubble in the vis, then add each node
//        //to nodes to be used later
//        var index = 0;
//        data.forEach(function (d) {
//            index++;
//            var node = {
//                id: "record-" + index,
//                radius: radius_scale(parseInt(d.Ponderacion * 10, 10)),
//                value: d.Ponderacion,
//                name: d.Glosa,
//                org: d.Indice,
//                group: d.Division,
//                x: Math.random() * 700,
//                y: Math.random() * 600,
//                year: d.year
//            };
//            nodes.push(node);
//        });
//
//        nodes.sort(function (a, b) {
//            return b.value - a.value;
//        });
//
//        vis = d3.select("#vis-show").append("svg")
//            .attr("width", width)
//            .attr("height", height)
//            .attr("id", "svg_vis");
//
//        circles = vis.selectAll("circle")
//            .data(nodes, function (d) {
//                return d.id;
//            });
//
//        circles.enter().append("circle")
//            .attr("r", 0)
//            .attr("fill", function (d) {
//                return fill_color(d.group);
//            })
//            .attr("stroke-width", 2)
//            .attr("stroke", function (d) {
//                return d3.rgb(fill_color(d.group)).darker();
//            })
//            .attr("id", function (d) {
//                return  "bubble_" + d.id;
//            })
//            .on("mouseover", function (d, i) {
//                show_details(d, i, this);
//            })
//            .on("mouseout", function (d, i) {
//                hide_details(d, i, this);
//            });
//
//        circles.transition().duration(2000).attr("r", function (d) {
//            return d.radius;
//        });
//
//    }
//
//    function charge(d) {
//        return -Math.pow(d.radius, 2.0) / 8;
//    }
//
//    function start() {
//        force = d3.layout.force()
//            .nodes(nodes)
//            .size([width, height]);
//    }
//
//    function display_group_all() {
//        force.gravity(layout_gravity)
//            .charge(charge)
//            .friction(0.9)
//            .on("tick", function (e) {
//                circles.each(move_towards_center(e.alpha))
//                    .attr("cx", function (d) {
//                        return d.x;
//                    })
//                    .attr("cy", function (d) {
//                        return d.y;
//                    });
//            });
//        force.start();
//        hide_years();
//    }
//
//    function move_towards_center(alpha) {
//        return function (d) {
//            d.x = d.x + (center.x - d.x) * (damper + 0.02) * alpha;
//            d.y = d.y + (center.y - d.y) * (damper + 0.02) * alpha;
//        };
//    }
//
//    function display_by_year() {
//        force.gravity(layout_gravity)
//            .charge(charge)
//            .friction(0.9)
//            .on("tick", function (e) {
//                circles.each(move_towards_year(e.alpha))
//                    .attr("cx", function (d) {
//                        return d.x;
//                    })
//                    .attr("cy", function (d) {
//                        return d.y;
//                    });
//            });
//        force.start();
//        display_years();
//    }
//
//    function move_towards_year(alpha) {
//        return function (d) {
//            var target = year_centers[d.year];
//            d.x = d.x + (target.x - d.x) * (damper + 0.02) * alpha * 1.1;
//            d.y = d.y + (target.y - d.y) * (damper + 0.02) * alpha * 1.1;
//        };
//    }
//
//
//    function display_years() {
//        var years_x = {"2013": width/3, "2014": 2*(width/3) };
//
//        var years_data = d3.keys(years_x);
//        var years = vis.selectAll(".years")
//            .data(years_data);
//
//        years.enter().append("text")
//            .attr("class", "years")
//            .attr("x", function (d) {
//                return years_x[d];
//            })
//            .attr("y", 40)
//            .attr("text-anchor", "middle")
//            .text(function (d) {
//                return d;
//            });
//
//    }
//
//    function hide_years() {
//        var years = vis.selectAll(".years").remove();
//    }
//
//
//    function show_details(data, i, element) {
//        d3.select(element).attr("stroke", "black");
//        var content = "<span class=\"name\">Title:</span><span class=\"value\"> " + (data.name) + "</span><br/>";
//        content += "<span class=\"name\">Ponderación:</span><span class=\"value\"> " + data.value + "%" + "</span><br/>";
//        content += "<span class=\"name\">División:</span><span class=\"value\"> " + (data.group) + "</span><br/>";
//        content += "<span class=\"name\">Año:</span><span class=\"value\"> " + data.year + "</span>";
//        tooltip.showTooltip(content, d3.event);
//    }
//
//    function hide_details(data, i, element) {
//        d3.select(element).attr("stroke", function (d) {
//            return d3.rgb(fill_color(d.group)).darker();
//        });
//        tooltip.hideTooltip();
//    }
//
//
//};
//
//
//
//
//}