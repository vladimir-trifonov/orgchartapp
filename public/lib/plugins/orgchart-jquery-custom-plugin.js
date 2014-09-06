// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;
(function($, window, document, undefined) {
    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.
    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).
    // Create the defaults once
    var pluginName = "orgChart",
        defaults = {
            ver: "0.0.1"
        };
    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;
        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = {
            hideParent: false
        }
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;

        if(typeof this.settings.root === "undefined") {
        	return;
        }

        this.init();
    }
    Plugin.prototype = {
        init: function() {
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.settings
            // you can add more functions like the one below and
            // call them like so: this.yourOtherFunction(this.element, this.settings).
            var hideParent = this.settings.hideParent || false;
            var defsData = [{
                types: {
                    main: "linearGradient",
                    nested: "stop"
                },
                attr: {
                    main: {
                        id: 'gradientLevel1',
                        x1: '0px',
                        x2: '200px',
                        y1: '0px',
                        y2: '150px',
                        gradientUnits: "userSpaceOnUse"
                    },
                    nested: [{
                        'class': 'gradientLevel1Stop1',
                        'offset': '0%',
                        'stop-color': '#fff',
                        'stop-opacity': '.3'
                    }, {
                        'class': 'gradientLevel1Stop2',
                        'offset': '100%',
                        'stop-color': '#870303',
                        'stop-opacity': '.3'
                    }]
                }
            }, {
                types: {
                    main: "linearGradient",
                    nested: "stop"
                },
                attr: {
                    main: {
                        id: 'gradientLevel2',
                        x1: '0px',
                        x2: '350px',
                        y1: '0px',
                        y2: '300px',
                        gradientUnits: "userSpaceOnUse"
                    },
                    nested: [{
                        'class': 'gradientLevel2Stop1',
                        'offset': '0%',
                        'stop-color': '#0D0D87',
                        'stop-opacity': '.3'
                    }, {
                        'class': 'gradientLevel2Stop2',
                        'offset': '100%',
                        'stop-color': '#fff',
                        'stop-opacity': '.3'
                    }]
                }
            }, {
                types: {
                    main: "linearGradient",
                    nested: "stop"
                },
                attr: {
                    main: {
                        id: 'gradientLevel3',
                        x1: '0px',
                        x2: '200px',
                        y1: '0px',
                        y2: '150px',
                        gradientUnits: "userSpaceOnUse"
                    },
                    nested: [{
                        'class': 'gradientLevel3Stop1',
                        'offset': '0%',
                        'stop-color': '#fff',
                        'stop-opacity': '1'
                    }, {
                        'class': 'gradientLevel3Stop2',
                        'offset': '100%',
                        'stop-color': '#870303',
                        'stop-opacity': '1'
                    }]
                }
            }, {
                types: {
                    main: "linearGradient",
                    nested: "stop"
                },
                attr: {
                    main: {
                        id: 'gradientLevel4',
                        x1: '0px',
                        x2: '350px',
                        y1: '0px',
                        y2: '300px',
                        gradientUnits: "userSpaceOnUse"
                    },
                    nested: [{
                        'class': 'gradientLevel4Stop1',
                        'offset': '0%',
                        'stop-color': '#0D0D87',
                        'stop-opacity': '1'
                    }, {
                        'class': 'gradientLevel4Stop2',
                        'offset': '100%',
                        'stop-color': '#fff',
                        'stop-opacity': '1'
                    }]
                }
            }, {
                types: {
                    main: "linearGradient",
                    nested: "stop"
                },
                attr: {
                    main: {
                        id: 'gradientLevel5',
                        x1: '0px',
                        x2: '350px',
                        y1: '0px',
                        y2: '300px',
                        gradientUnits: "userSpaceOnUse"
                    },
                    nested: [{
                        'class': 'gradientLevel5Stop1',
                        'offset': '0%',
                        'stop-color': '#edf7ff',
                        'stop-opacity': '1'
                    }, {
                        'class': 'gradientLevel5Stop2',
                        'offset': '100%',
                        'stop-color': '#cde7ee',
                        'stop-opacity': '1'
                    }]
                }
            }];
            var margin = {
                top: hideParent ? -50 : 80,
                //top: hideParent ? -120 : 60,
                right: 120,
                bottom: 20,
                left: 120
            },
                width = 2100 - margin.right - margin.left,
                height = 1000 - margin.top - margin.bottom;
            var counter = 0,
                duration = 600,
                rectW = 125,
                rectH = 75,
                circleX = rectW / 2,
                circleY = rectH / 2,
                circleR = rectH / 2;
            var nodeSize = [rectW + 125, rectH],
                headerMaxSymbolsCount = 10,
                infoMaxSymbolsCount = 12
            var infoTextOffset = {
                mainX: rectW / 2,
                mainY: (rectH / 2) - 20,
                additionalX: rectW / 2,
                additionalY: (rectH / 2) - 4
            };
            var nodeTypes = [{
                type: "box",
                fig: "rect",
                isDefault: true,
                attr: {
                    width: rectW,
                    height: rectH,
                    rx: 5,
                    ry: 5
                },
                textAttr: {
                    x: 5,
                    y: 5,
                    width: rectW - 10,
                    height: rectH - 14
                },
                textClass: "text-fig-box",
                nodeClassExpanded: "fig-theme fig-theme-1-exp",
                //nodeClassCollapsed: "fig-theme fig-theme-1-coll"
                nodeClassCollapsed: "fig-theme fig-theme-1-exp"
            }
            //, 
            // {
            //     type: "round",
            //     fig: "circle",
            //     attr: {
            //         cx: circleX,
            //         cy: circleY,
            //         r: circleR
            //     },
            //     textAttr: {
            //         x: 10 + rectW / 4,
            //         y: 20,
            //         width: rectW / 2 - 20,
            //         height: rectH - 40,
            //         style: "text-align: center;"
            //     },
            //     textClass: "text-fig-round",
            //     nodeClassExpanded: "fig-theme fig-theme-2-exp",
            //     //nodeClassExpanded: "fig-theme fig-theme-2-exp",
            //     nodeClassCollapsed: "fig-theme fig-theme-2-exp"
            // }
            ];
            var htmlHelper = (function() {
                var htmlEscapes = {
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#x27;',
                    '/': '&#x2F;'
                };
                // Regex containing the keys listed immediately above.
                var htmlEscaper = /[&<>"'\/]/g;
                // Escape a string for HTML interpolation.
                var escape = function(string) {
                    return ('' + string).replace(htmlEscaper, function(match) {
                        return htmlEscapes[match];
                    });
                };
                return {
                    escape: escape
                }
            })();
            //Step function is used to convert the source data collection in proper way, best for the presentation purposes.
            //The idea here is that the last children's collection in each tree's branch is transformed like that to be possible
            //to be displayed in vertical order, not in horizontal like is by default. Also it's used to set the preventClick flag
            //in use to prevent user's click of expanding/collapsing the parent's branch. If you can't understand the idea
            //comment the function below, the caller and separation function call chained on tree function and see what'll happened.
            var step = function(data, depth) {
                var depth = depth || 0;
                depth++;
                if (typeof data.children !== "undefined") {
                    var childrenDepth = -1;
                    data.children.forEach(function(el) {
                        childrenDepth = step(el, depth);
                    });
                    if (childrenDepth !== -1) {
                        data.isLastParent = true;
                        var coll = {
                            children: []
                        },
                            currColl = coll.children;
                        for (var i = 0; i < data.children.length; i++) {
                            var el = data.children[i];
                            currColl.push([{}]);
                            currColl[0].name = el.name;
                            currColl[0].type = el.type;
                            currColl[0].text = el.text;
                            currColl[0].preventClick = true;
                            if (i < data.children.length - 1) {
                                currColl[0].children = [];
                                currColl = currColl[0].children;
                            }
                        }
                        data.children = coll.children;
                    }
                } else {
                    return depth;
                }
                return -1;
            };
            step(this.settings.root);
            var tree = d3.layout.tree().nodeSize(nodeSize).separation(function(a, b) {
                return (a.parent == b.parent ? 0.8 : 1.8) / (a.depth + 0.35);
            });

            // $(this.element).css({
            //     height: height,
            //     width: width
            // });
            var diagonal = d3.svg.diagonal().projection(function(d) {
                return [d.x + rectW / 2, diagY = d.y ];
            });
            var horizontalOffset = ((width / 2) - (rectW / 2));
            var svg = d3.select(this.element).append("svg")
            	.attr("class", "org-chart-svg")
            //.attr("width", width - 2).attr("height", height - 2)
            	.style({"border": "2px solid #428bca"})
            	.call(zm = d3.behavior.zoom().scaleExtent([0.1, 3])
        		.on("zoom", redraw))
                .on("dblclick.zoom", null)
        		.append("g")
        		.attr("transform", "translate(" + horizontalOffset + "," + margin.top + ")" + " scale(" + 0.8 + ")");
            //necessary so that zoom knows where to zoom and unzoom from
            zm.translate([horizontalOffset, margin.top]);
            zm.scale(0.8);
            this.settings.root.x0 = 0;
            this.settings.root.y0 = height / 2;
            var defs = svg.append('defs');
            appendDefs(defs, defsData);
            //Uncomment the line below if you want to display the tree collapsed on first initializing;
            this.settings.root.children.forEach(collapse);
            update.call(this, this.settings.root);

            function update(source) {
                // Compute the new tree layout.
                var nodes = tree.nodes(this.settings.root).reverse(),
                    links = tree.links(nodes),
                    sourceType = source["type"];
                var sourceTypeData = (function() {
                    var data = null;
                    nodeTypes.forEach(function(nodeData) {
                        if (nodeData.type === sourceType) {
                            data = nodeData;
                        }
                        if (data === null && nodeData.isDefault) {
                            data = nodeData;
                        }
                    });
                    return data;
                })();
                // Normalize for fixed-depth.
                nodes.forEach(function(d) {
                    d.y = d.depth * 85;

                });
                // Update the nodes…
                var node = null;
                node = svg.selectAll("g.node").data(nodes, function(d) {
                    return d.id || (d.id = ++counter);
                });
                // Enter any new nodes at the parent's previous position.
                var nodeEnter = node.enter().append("g").attr("class", function(d) {
                    return "node" + (d["classes"] ? " " + d["classes"] + " " : "") + (typeof d.type !== "undefined" ? (" fig-type-" + d.type) + "-wrapper" : "") + (hideParent && d.depth === 0 ? " hidden" : "");
                }).attr("transform", function(d) {                   
                    return "translate(" + source.x0 + "," + source.y0 + ")";
                }).on("click", click);
                nodeTypes.forEach(function(nodeData) {
                    var filteredCollection = nodeEnter.filter(function(d) {
                        return nodeDataFilter(d, nodeData);
                    });
                    filteredCollection.append(nodeData.fig).attr(nodeData.attr).attr("class", function(d) {
                        return toggleNodeClass(d, nodeData);
                    });
                    filteredCollection.append("foreignObject").attr(nodeData.textAttr).append("xhtml:body").html(function(d) {
                        //return '<p class="text text-main ' + nodeData.textClass + '">' + htmlHelper.escape(d.name || "") + '</p>' + '<p class="text text-additional ' + nodeData.textClass + '">' + htmlHelper.escape(d.text || "") + '</p>';
                        return '<p class="text text-main ' + nodeData.textClass + '" title="' + 
                        (d.text ? d.text : "") 
                        //d.name + (d.text ? "\r\n" + d.text : "") 
                        + '"">' + htmlHelper.escape(d.name || "");
                    });
                });
                // nodeEnter.append("title").text(function(d) {
                //     return d.name + (d.text ? "\r\n" + d.text : "");
                // });
                // Transition nodes to their new position.
                var nodeUpdate = node.transition().duration(duration).attr("transform", function(d, i) {                    
                    return "translate(" + d.x + "," + ((!hideParent && d.depth) === 0 ? -75 : d.y) + ")";
                });
                nodeTypes.forEach(function(nodeData) {
                    nodeUpdate.filter(function(d) {
                        return nodeDataFilter(d, nodeData);
                    }).select(nodeData.fig).attr(nodeData.attr).attr("class", function(d) {
                        return (d["classes"] ? d["classes"] + " " : "") + toggleNodeClass(d, nodeData);
                    });
                });
                nodeUpdate.select("text").style("fill-opacity", 1);
                // Transition exiting nodes to the parent's new position.
                var nodeExit = node.exit().transition().duration(duration).attr("transform", function(d) {                 
                    return "translate(" + source.x + "," + source.y + ")";
                }).remove();
                nodeTypes.forEach(function(nodeData) {
                    nodeExit.filter(function(d) {
                        return nodeDataFilter(d, nodeData);
                    }).select(nodeData.fig).attr(nodeData.attr).attr("class", function(d) {
                        return (d["classes"] ? d["classes"] + " " : "") + toggleNodeClass(d, nodeData);
                    });
                });
                nodeExit.select("text");
                // Update the links…
                var link = svg.selectAll("path.link").data(links, function(d) {
                    return d.target.id;
                });
                // Enter any new links at the parent's previous position.
                link.enter().insert("path", "g").attr("x", rectW / 2).attr("y", rectH / 2).attr("class", function(d) {
                    if (hideParent && d.source.depth === 0) {
                        return "hidden";
                    }
                    return "link";
                }).attr("d", function(d) {
                    var o = {
                        x: source.x0,
                        y: source.y0
                    };
                    return diagonal({
                        source: o,
                        target: o
                    });
                });
                // Transition links to their new position.
                link.transition().duration(duration).attr("d", diagonal);
                // Transition exiting nodes to the parent's new position.
                link.exit().transition().duration(duration).attr("d", function(d) {
                    var o = {
                        x: source.x,
                        y: source.y
                    };
                    return diagonal({
                        source: o,
                        target: o
                    });
                }).remove();
                // Stash the old positions for transition.
                nodes.forEach(function(d) {
                    d.x0 = d.x;
                    d.y0 = d.y;
                });
            };

            function appendDefs(wrapper, data) {
                data.forEach(function(elData) {
                    var el = wrapper.append(elData.types.main).attr(elData.attr.main);
                    elData.attr.nested.forEach(function(nestedDataAttr) {
                        el.append(elData.types.nested).attr(nestedDataAttr);
                    });
                })
            };

            function toggleNodeClass(d, nodeData) {
                return d._children ? nodeData.nodeClassCollapsed : nodeData.nodeClassExpanded;
            }

            function nodeDataFilter(d, nodeData) {
                return d.type === nodeData.type || (typeof d.type === "undefined" && nodeData.isDefault === true);
            }

            function collapse(d) {
                if (d.children) {
                    d._children = d.children;
                    //d._children.forEach(collapse);
                    d.children = null;
                }
            };
            // Toggle children on click.
            var canClick = true;
            var self = this;
            function click(d) {
                if (d.canCollapse === true && d.preventClick !== true && canClick === true) {
                    canClick = false;
                    if (d.children) {
                        d._children = d.children;
                        d.children = null;
                    } else {
                        d.children = d._children;
                        d._children = null;
                    }
                    update.call(self, d);
                    window.setTimeout(function() {
                        canClick = true;
                    }, duration);
                }
            };
            //Redraw for zoom
            function redraw() {
                svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
            };
        },
        refresh: function() { }
    };
    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function(options) {
        this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
        // chain jQuery functions
        return this;
    };
})(jQuery, window, document);