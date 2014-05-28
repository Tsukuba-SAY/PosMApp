//<debug>
Ext.Loader.setPath({
    'Ext': '../../src'
});
//</debug>

// This utility function takes a date and returns a representation in words.
var timeAgoInWords = function(date) {
    try {
        var now = Math.ceil(Number(new Date()) / 1000),
            dateTime = Math.ceil(Number(new Date(date)) / 1000),
            diff = now - dateTime,
            str;

        if (diff < 60) {
            return String(diff) + ' seconds ago';
        } else if (diff < 3600) {
            str = String(Math.ceil(diff / (60)));
            return str + (str == "1" ? ' minute' : ' minutes') + ' ago';
        } else if (diff < 86400) {
            str = String(Math.ceil(diff / (3600)));
            return str + (str == "1" ? ' hour' : ' hours') + ' ago';
        } else if (diff < 60 * 60 * 24 * 365) {
            str = String(Math.ceil(diff / (60 * 60 * 24)));
            return str + (str == "1" ? ' day' : ' days') + ' ago';
        } else {
            return Ext.Date.format(new Date(date), 'jS M \'y');
        }
    } catch (e) {
        return '';
    }
};

/**
 * This examples illustrates the 'List Paging' and 'Pull Refresh' plugins
 */
Ext.setup({
    requires: [
        'Ext.data.Store',
        'Ext.List',
        'Ext.data.proxy.Rest',
        'Ext.plugin.ListPaging',
        'Ext.plugin.PullRefresh'
    ],

    startupImage: {
        '320x460': 'resources/startup/Default.jpg', // Non-retina iPhone, iPod touch, and all Android devices
        '640x920': 'resources/startup/640x920.png', // Retina iPhone and iPod touch
        '640x1096': 'resources/startup/640x1096.png', // iPhone 5 and iPod touch (fifth generation)
        '768x1004': 'resources/startup/768x1004.png', //  Non-retina iPad (first and second generation) in portrait orientation
        '748x1024': 'resources/startup/748x1024.png', //  Non-retina iPad (first and second generation) in landscape orientation
        '1536x2008': 'resources/startup/1536x2008.png', // : Retina iPad (third generation) in portrait orientation
        '1496x2048': 'resources/startup/1496x2048.png' // : Retina iPad (third generation) in landscape orientation
    },

    isIconPrecomposed: false,
    icon: {
        57: 'resources/icons/icon.png',
        72: 'resources/icons/icon@72.png',
        114: 'resources/icons/icon@2x.png',
        144: 'resources/icons/icon@144.png'
    },

    onReady: function() {
        Ext.override(Ext.data.proxy.Rest, {
            getMethod: function(){
                return 'POST';
            }
        });

        Ext.define('TweetStore', {
            extend: 'Ext.data.Store',

            config: {
                fields: ['from_user', 'profile_image_url', 'text', 'created_at'],

                pageSize: 15,
                autoLoad:true,
                proxy: {
                    type: 'rest',
                    url: 'http://schematic-ipsum.herokuapp.com/?n=15',

                    extraParams: {
                         "type": "object",
                         "properties[id][type]":"string",
                         "properties[id][ipsum]":"id",
                         "properties[from_user][type]":"string",
                         "properties[from_user][ipsum]":"first name",
                         "properties[profile_image_url][type]":"string",
                         "properties[profile_image_url][ipsum]":"small image",
                         "properties[text][type]":"string",
                         "properties[text][ipsum]":"sentence",
                         "properties[created_at][type]":"string",
                         "properties[created_at][format]":"date-time"
                    }
                }
            }
        });

        Ext.define('TweetList', {
            extend: 'Ext.List',

            config: {
                useSimpleItems: false,
                variableHeights: true,
                infinite: true,
                disableSelection: true,
                allowDeselect: false,
                scrollToTopOnRefresh: false,
                store: Ext.create('TweetStore'),

                plugins: [
                    { xclass: 'Ext.plugin.ListPaging' },
                    { xclass: 'Ext.plugin.PullRefresh' }
                ],
                emptyText: '<p class="no-searches">No tweets found matching that search</p>',

                itemTpl: Ext.create('Ext.XTemplate',
                    '<div class="twitter-post">',
                    '<img src="{profile_image_url}" />',
                    '<div class="tweet">',
                    '<span class="posted">{[this.posted(values.created_at)]}</span>',
                    '<h2>@{from_user}</h2>',
                    '<p>{text}</p>',
                    '</div>',
                    {
                        posted: timeAgoInWords
                    }
                )
            }
        });

        if (Ext.os.is.Phone) {
            Ext.create('TweetList', {
                fullscreen: true
            });
        } else {
            Ext.Viewport.add({
                xclass: 'TweetList',
                width: 380,
                height: 420,
                centered: true,
                modal: true,
                hideOnMaskTap: false
            }).show();
        }
    }
});
