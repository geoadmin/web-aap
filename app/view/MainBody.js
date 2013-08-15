Ext.define('Aap.view.MainBody',{
	extend: 'Ext.panel.Panel',
	requires: [
		'Aap.view.mainbody.Geodatenstand',
		'Aap.view.mainbody.Allgemein',
		'Aap.view.mainbody.Verfuegbarkeit',
		'Aap.view.mainbody.Archievwuerdigkeit'
	],
	xtype: 'mainbody',
	layout: {
		type: 'hbox',
		bodyPadding: 5,
		align: 'stretch'
	},
	items: [
		{
			xtype: 'geodatenstand',
			title: 'Geodatenbestand',
			flex: 1,
			padding: 5
		},{
			xtype: 'panel',
			flex: 1,
			padding: 5,
			border: 0, 
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
				{
					xtype: 'panel',
					title: 'Metadaten Allgemein',
					height: 26
				},{
					xtype: 'allgemein',
					title: 'Allgemein',
					margin: '5 0 0 0',
					flex: 1
				}
			]
		},{
			xtype: 'panel',
			flex: 2,
			padding: 5,
			border: 0, 
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
				{
					xtype: 'panel',
					title: 'Metadaten AAP',
					height: 26
				},{
					xtype: 'panel',
					flex: 1,
					margin: '5 0 0 0',
					border: 0, 
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [
						{
							xtype: 'verfuegbarkeit',
							title: 'Bewertung Nachhaltige Verfügbarkeit',
							flex: 1,
							margin: '0 5 0 0'
						},{
							xtype: 'archievwuerdigkeit',
							title: 'Bewertung Archivwürdigkeit',
							flex: 1,
							margin: '0 0 0 5'
						}	
					]
				}
			]	
		}
	]
});
