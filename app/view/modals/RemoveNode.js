Ext.define('Aap.view.modals.RemoveNode', {
    extend: 'Ext.window.Window',
    alias: 'widget.removenode',
    layout: 'fit',
    autoShow: true,
    initComponent: function () {
        this.items = [
            {
                xtype: 'panel',
				html: '<h1>Warnung</h1><p>Wollen Sie Die Daten wirklich unwiderrufbar löschen</p>'
            }
        ];
        this.buttons = [
            {
                text: 'Besätigen',
                action: 'confirm'
			},
			{
                text: 'Abbrechen',
                scope: this,
                handler: this.close
            }
        ];
        this.callParent(arguments);
    }
});