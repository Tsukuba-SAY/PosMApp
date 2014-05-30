Ext.application({
    launch: function() {
        Ext.Viewport.add({
            xtype: 'navigationview',
            items: [{
                xtype: 'panel',
                title: 'Hello World!',    // �i�r�Q�[�V�����o�[�ɕ\�����镶����
                layout: 'vbox',
                items : [
                {
                    xtype: 'image',
                    src: 'img/map_deim2014.png',
                	flex: 1
                },{
                    xtype: 'button',
                    text: 'Push Next View',
                   
                    // �{�^���ɃC�x���g��ݒ�
                    handler: function() {

                        // ���̃R���|�[�l���g��2��� navigationview �Œ�`���ꂽ���\�b�h
                        this.parent.parent.push({
                            xtype: 'panel',
                            title: 'Second View',
                            items: [{
                                xtype: 'label',
                                html: 'This is Second View' // ��ʑJ�ڌ�Ƀi�r�Q�[�V�����o�[�ɕ\�����镶����
                            }]
                        });
                    }
                }]
            }]
        });
    }
});