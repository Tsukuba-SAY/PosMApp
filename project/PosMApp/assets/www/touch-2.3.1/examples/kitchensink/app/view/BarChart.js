/**
 * Demonstrates how use Ext.chart.ColumnChart
 */
//<feature charts>
Ext.define('Kitchensink.view.BarChart', {
    extend: 'Ext.Panel',
    requires: ['Ext.chart.Chart', 'Ext.chart.interactions.PanZoom',
               'Ext.chart.series.Bar', 'Ext.chart.axis.Numeric', 'Ext.chart.axis.Category'],
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
                        iconCls: 'refresh',
                        text: 'Refresh',
                        handler: function () {
                            Ext.getStore('Pie').generateData(15);
                        }
                    },
                    {
                        text: 'Reset',
                        handler: function () {
                            //ensure the query gets the chart for this kitchensink example
                            var chart = Ext.ComponentQuery.query('chart', this.getParent().getParent())[0];

                            //reset the axis
                            Ext.ComponentQuery.query('axis', chart)[1].setVisibleRange([0, 1]);
                            chart.redraw();
                        }
                    }
                ]
            },
            {
                xtype: 'chart',
                store: 'Pie',
                background: 'white',
                flipXY: true,
                colors: Kitchensink.view.ColorPatterns.getBaseColors(),
                interactions: [
                    {
                        type: 'panzoom'
                    },
                    'itemhighlight'
                ],
                series: [
                    {
                        type: 'bar',
                        xField: 'name',
                        yField: ['g1', 'g2', 'g3', 'g4', 'g5'],
                        highlightCfg: {
                            strokeStyle: 'red',
                            lineWidth: 3
                        },
                        style: {
                            stroke: 'rgb(40,40,40)',
                            maxBarWidth: 30
                        }
                    }
                ],
                axes: [
                    {
                        type: 'numeric',
                        position: 'bottom',
                        fields: ['g1'],
                        grid: {
                            odd: {
                                fill: '#e8e8e8'
                            }
                        },
                        label: {
                            rotate: {
                                degrees: -30
                            }
                        },
                        maxZoom: 1
                    },
                    {
                        type: 'category',
                        position: 'left',
                        fields: 'name',
                        maxZoom: 4
                    }
                ]
            }
        ]
    },

    initialize: function () {
        this.callParent();
        Ext.getStore('Pie').generateData(15);
        var toolbar = Ext.ComponentQuery.query('toolbar', this)[0],
            interaction = Ext.ComponentQuery.query('interaction', this)[0];
        if (toolbar && interaction && !interaction.isMultiTouch()) {
            toolbar.add(interaction.getModeToggleButton());
        }
    }
});
//</feature>
