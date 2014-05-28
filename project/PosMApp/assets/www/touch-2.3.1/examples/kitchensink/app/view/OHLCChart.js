/**
 * Demonstrates how use Ext.chart.series.Line
 */
//<feature charts>
Ext.define('Kitchensink.view.OHLCChart', {
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

                            //reset the legend
                            chart.resetLegendStore();
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
                        zoomOnPanGesture: false,
                        axes: {
                            "left": {
                                allowPan: false,
                                allowZoom: false
                            },
                            "bottom": {
                                allowPan: true,
                                allowZoom: true
                            }
                        }
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
                            ohlcType: 'ohlc',
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
            interaction = Ext.ComponentQuery.query('interaction', this)[0];
        if (toolbar && interaction && !interaction.isMultiTouch()) {
            toolbar.add(interaction.getModeToggleButton());
        }
    }
});
//</feature>
