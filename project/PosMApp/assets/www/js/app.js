Ext.application({
    launch: function() {
        Ext.Viewport.add({
            xtype: 'navigationview',
            items: [{
                xtype: 'panel',
                title: 'Hello World!',    // ナビゲーションバーに表示する文字列
                layout: 'vbox',
                items : [
                {
                    xtype: 'image',
                    src: 'img/map_deim2014.png',
                	flex: 1
                },{
                    xtype: 'button',
                    text: 'Push Next View',
                   
                    // ボタンにイベントを設定
                    handler: function() {

                        // このコンポーネントの2つ上の navigationview で定義されたメソッド
                        this.parent.parent.push({
                            xtype: 'panel',
                            title: 'Second View',
                            items: [{
                                xtype: 'label',
                                html: 'This is Second View' // 画面遷移後にナビゲーションバーに表示する文字列
                            }]
                        });
                    }
                }]
            }]
        });
    }
});