//------------------------------------------------------------------
// tree controls
//------------------------------------------------------------------

Ext.define('Aap.controller.Tree', {
	extend: 'Ext.app.Controller',
	requires: [	
		'Aap.util.Tree'
	],
	stores: ['TreeStore'],
	models: ['TreeNode'],
	views: [
		'mainbody.Tree'
	],
	
	init: function() {
		this.control({
			'tree': {
				afterrender: this.initSelection,
			},	
			'tree dataview': {
				beforedrop: this.beforedropNode,
				drop: this.dropNode
			}
		});
	}, 

 	beforedropNode: function(node, data, overModel, dropPosition, dropHandlers) {
    	console.log('beforedrop')
		dropHandlers.wait = true;
		Ext.MessageBox.show({
			title: 'Warnung!',
            msg: 'Durch das Verschieben werden die Metadaten der neuen übergeordneten Position übernommen!</br></br>Was möchten Sie tun?',
           	icon: Ext.MessageBox.WARNING, 
            buttons: Ext.MessageBox.YESNO,
            buttonText:{ 
                yes: "Daten verschieben!", 
                no: "Abbrechen!" 
            },
			fn: function(btn){
    		    if (btn === 'yes') {
					dropHandlers.processDrop();
   			    } 
				else {
    	  	    	dropHandlers.cancelDrop();
    	 		}
			}
		});
 	},  

    dropNode: function(node, data, overModel, dropPosition, eOpts) {
   		console.log('drop');
		var tree = Ext.getCmp('treestructure').getView();
		var target_node = tree.getRecord(node);
		var moved_node = data.records[0];
		var meta_id;	
		if (dropPosition != 'append') {
			target_node = target_node.parentNode;
			console.log('not append');
		}
		if (Aap.util.Tree.isInherited(target_node) == true || Aap.util.Tree.isMetanode(target_node) == true) {
			meta_id = Aap.util.Tree.getParentsMetaId(target_node);
			Aap.util.Tree.setChildrensMetaId(moved_node, meta_id);
			if (Aap.util.Tree.isMetanode(moved_node) == true) {
				moved_node.set('metanode', false);
			}
		}	
		else {
			Aap.util.Tree.setChildrensMetaId2(moved_node);
		}
    }, 

	initSelection:  function() {
		Ext.getCmp('treestructure').getView().getPlugin().dragZone.lock();
	}

});

