Ext.application({
    name: 'PosMApp',
    launch: function() {
        Ext.Viewport.add({
            xtype: 'navigationview',
            items: [{
                xtype: 'panel',
                title: 'PosMApp',
                layout: 'hbox',
                items : [{
                    xtype: 'image',
                    src: 'img/map_deim2014.png',
                    flex: 1
                }]
            }]
        });
    }
});