Ext.Loader.setConfig({
	enabled: true, // Allows dynamc loading of JavaSCript files
	disableCaching: false // Disable random parameter in the URLs path
});

Ext.application({
	name: 'Aap',
	controllers: [
		'Tree'
	],

	stores: ['Allgemein'],

/*	launch: function(){
		var store = this.getCompaniesStore();
		store.each(function(company){
			console.log('Company:' + company.get('name'));
		});
		
	},*/
	autoCreateViewport: true
});
