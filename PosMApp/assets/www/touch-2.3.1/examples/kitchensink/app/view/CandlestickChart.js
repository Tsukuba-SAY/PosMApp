/**
 * Demonstrates how use Ext.chart.series.Line
 */
//<feature charts>
Ext.define('Kitchensink.view.CandlestickChart', {
    extend: 'Ext.Panel',
    requires: [
        'Ext.chart.Chart',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Time',
        'Ext.chart.series.CandleStick'
    ],
    config: {
        cls: 'card1',
        layout: 'fit',
        items: [
            {
                xtype: 'toolbar',
                cls: 'charttoolbar',
                top: 0,
                right: 0,
                zIndex: 50,
                style: {
                    background: 'none'
                },
                items: [
                    {
                        xtype: 'spacer'
                    },
                    {
                        text: 'Reset',
                        handler: function () {
                            //ensure the query gets the chart for this kitchensink example
                            var chart = Ext.ComponentQuery.query('chart', this.getParent().getParent())[0];

                            //reset the axis
                            Ext.ComponentQuery.query('axis', chart)[1].setVisibleRange([0, 0.3]);
                            chart.redraw();
                        }
                    }
                ]
            },
            {
                xtype: 'chart',
                background: 'white',
                interactions: [
                    {
                        type: 'panzoom',
                        enabled: false,
                        zoomOnPanGesture: false,
                        axes: {
                            left: {
                                allowPan: false,
                                allowZoom: false
                            },
                            bottom: {
                                allowPan: true,
                                allowZoom: true
                            }
                        }
                    },
                    {
                        type: 'crosshair'
                    }
                ],
                series: [
                    {
                        store: 'StockPrice',
                        type: 'candlestick',
                        xField: 'time',
                        openField: 'open',
                        highField: 'high',
                        lowField: 'low',
                        closeField: 'close',
                        style: {
                            barWidth: 10,
                            opacity: 0.9,
                            dropStyle: {
                                fill: 'rgb(237,123,43)',
                                stroke: 'rgb(237,123,43)'
                            },
                            raiseStyle: {
                                fill: 'rgb(55,153,19)',
                                stroke: 'rgb(55,153,19)'
                            }
                        },
                        aggregator: {
                            strategy: 'time'
                        }
                    }
                ],
                axes: [
                    {
                        type: 'numeric',
                        fields: ['open', 'high', 'low', 'close'],
                        position: 'left',
                        maximum: 1000,
                        minimum: 0
                    },
                    {
                        type: 'time',
                        fields: ['time'],
                        position: 'bottom',
                        visibleRange: [0, 0.3],
                        style: {
                            axisLine: false
                        }
                    }
                ]
            }
        ]
    },
    initialize: function () {
        this.callSuper();
        var toolbar = Ext.ComponentQuery.query('toolbar', this)[0],
            interactions = Ext.ComponentQuery.query('interaction', this),
            panzoom = interactions[0],
            crosshair = interactions[1];

        toolbar.add({
            xtype: 'segmentedbutton',
            margin: '0 5 0 0',
            items: [
                {
                    text: 'Crosshair',
                    pressed: true,
                    handler: function () {
                        crosshair.setEnabled(true);
                        panzoom.setEnabled(false);
                    }
                },
                {
                    text: 'Pan/Zoom',
                    handler: function () {
                        panzoom.setEnabled(true);
                        crosshair.setEnabled(false);
                    }
                }
            ]
        });
        if (toolbar && panzoom && !panzoom.isMultiTouch()) {
            toolbar.add(panzoom.getModeToggleButton());
        }
    }
});
//</feature>
