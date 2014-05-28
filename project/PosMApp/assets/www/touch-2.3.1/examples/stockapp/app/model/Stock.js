Ext.define("StockApp.model.Stock", {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            'date',
            "open",
            "high",
            "low",
            "close",
            "volume",
            "adjClose"
        ]
    }
});
