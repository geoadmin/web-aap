Ext.define('Aap.store.AapStore', {

	extend: 'Ext.data.TreeStore',
    model: 'Aap.model.AapModel',
    storeId: 'AapStore',

    root: data,

	proxy: {
		type: 'memory',
		reader: {
			type: 'json',
			root: 'children'
		}
	}

});
