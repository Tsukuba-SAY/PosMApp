Ext.define('TouchTomatoes.proxy.RottenTomatoes', {
    extend: 'Ext.data.proxy.JsonP',
    alias: 'proxy.rottentomatoes',

    config: {
        url: "http://api.rottentomatoes.com/api/public/v1.0/",
        extraParams: {
            apikey: 'hbjgfgryw8tygxztr5wtag3u'
        },
        filterParam: "q",
        limitParam: "page_limit",
        service: "movies.json",
        reader: {
            type: "json",
            rootProperty: "movies"
        }
    },
    getUrl: function() {
        return this._url + this.getService();
    },
    encodeFilters: function(filters) {
        if (Ext.isArray(filters) && filters.length > 0) return filters[0].getValue();
        return "";
    }
});