Ext.define('Aap.controller.DataAdd', {
	extend: 'Ext.app.Controller',
	requires: ['Aap.util.Tree'],
	stores: ['AapStore'],
	models: ['AapModel'],
	views: ['modals.DataAdd'],

    init: function() {
        this.control({
            'dataadd':  {
                afterrender: this.afterAddPanelRendered
            },
			'dataadd button[action=save]': {
				click: this.addData
            }
        });
    },

    afterAddPanelRendered: function() {
        console.log('"Erstellen" window rendered!');
		var node = Aap.util.Tree.getSelectedNode();
	
		var node = Aap.util.Tree.getSelectedNode(); 
		
		// disable edit, but display metaaap when node is inherited	
		if (Aap.util.Tree.isInherited(node) == true || Aap.util.Tree.isMetanode(node) == true) {
			Ext.getCmp('edit_verf').getForm().loadRecord(node);
		 	Ext.getCmp('edit_arch').getForm().loadRecord(node);
			
			Ext.getCmp('edit_verf').getForm().getFields().each(function(field) {
   		    	field.setDisabled(true);  
			});
			Ext.getCmp('edit_arch').getForm().getFields().each(function(field) {
   		    	field.setDisabled(true);  
			});
		}

	},

	addData: function(button){
		console.log('data add');

		var node = Aap.util.Tree.getSelectedNode()


		// data handling if meta data is inherited
		if (Aap.util.Tree.isInherited(node) == true || Aap.util.Tree.isMetanode(node) == true) {
			var allg_values = Ext.getCmp('edit_allg').getForm().getValues();
			var node_data = Aap.util.Tree.getParentsMetadataNode(node).getData();

				
			if (Ext.getCmp('edit_allg').getForm().isValid()==true) {	

				newNode = ('Aap.model.AapModel',{
					metanode: false,
					loaded: true,
					leaf: false,
	
					modif: new Date(),
					erfass: new Date(),

					name: allg_values.name, 
					name: allg_values.name, 
					ident: allg_values.ident, 
					georefdat: allg_values.georefdat, 
					fachst: allg_values.fachst, 
					zugberech: allg_values.zugberech, 
					echkateg: allg_values.echkateg, 
					nachfzeitr: allg_values.nachfzeitr, 
					datenmente: allg_values.datenmenge, 
					imjr: allg_values.imjr, 
					datenzuw: allg_values.datenzuw, 
					bemerk: allg_values.bemerk,

					aufbewzs: node_data.aufbewzs, 
					begrzs: node_data.begrzs,
					inpauf: node_data.inpaufb,
					aufbewws: node_data.aufbewws,
					begrw: node_data.begrw,		
					entsaufbew: node_data.entsaufbew,
					bemerkaufbew: node_data.bemerkaufbew,

	      			bewzs: node_data.bewzs,
					begrzs: node_data.begrzs,
					inparch: node_data.inparch,
					bewws: node_data.bewws,
					begrw: node_data.begrw,
					bewba: node_data.bewba,
					begrba: node_data.begrba,
					artsampl: node_data.artsampl,
					entsarch: node_data.entsarch,
					bemerkarch: node_data.bemerkarch
				});

				node.appendChild(newNode);
				node.expand();
	
				// close windows 
				var win = button.up('window');
	  	 		win.close();

			}

		}
	
		// data handling if meta data is not inherited
		else {
			var allg_values = Ext.getCmp('edit_allg').getForm().getValues();
			var verf_values = Ext.getCmp('edit_verf').getForm().getValues();
			var arch_values = Ext.getCmp('edit_arch').getForm().getValues();
	


			if (
				Ext.getCmp('edit_allg').getForm().isValid()==true 
				&& Ext.getCmp('edit_verf').getForm().isValid()==true
				&& Ext.getCmp('edit_arch').getForm().isValid()==true
			) {	

				function calcEntsarch(a,b,c) {
					var e ;
					if (a=='A' || b=='A' || c=='A') {e='A'}
					else if (a=='S' || b=='S' || c=='S') {e='S'}
					else if (a=='N' || b=='N' || c=='N') {e='N'}
					return e
				}
				var entscheid_archivierung = calcEntsarch(arch_values.bewzs, arch_values.bewws, arch_values.bewba);
	
				newNode = ('Aap.model.AapModel',{
					metanode: true,
					loaded: true,
					leaf: false,

					modif: new Date(),
					erfass: new Date(),

					name: allg_values.name, 
					ident: allg_values.ident, 
					georefdat: allg_values.georefdat, 
					fachst: allg_values.fachst, 
					zugberech: allg_values.zugberech, 
					echkateg: allg_values.echkateg, 
					nachfzeitr: allg_values.nachfzeitr, 
					datenmente: allg_values.datenmenge, 
					imjr: allg_values.imjr, 
					datenzuw: allg_values.datenzuw, 
					bemerk: allg_values.bemerk,

					aufbewzs: verf_values.aufbewzs, 
					begrzs: verf_values.begrzs,
					inpauf: verf_values.inpaufb,
					aufbewws: verf_values.aufbewws,
					begrw: verf_values.begrw,		
					entsaufbew: Math.max(verf_values.aufbewzs, verf_values.aufbewws),
					bemerkaufbew: verf_values.bemerkaufbew,
	
		      		bewzs: arch_values.bewzs,
					begrzs: arch_values.begrzs,
					inparch: arch_values.inparch,
					bewws: arch_values.bewws,
					begrw: arch_values.begrw,
					bewba: arch_values.bewba,
					begrba: arch_values.begrba,
					artsampl: arch_values.artsampl,
					entsarch: entscheid_archivierung,
					bemerkarch: arch_values.bemerkarch
				});
	
				node.appendChild(newNode);
				node.expand();

				// close windows 
				var win = button.up('window');
	    		win.close();
		
			}	

		}

    }



});

