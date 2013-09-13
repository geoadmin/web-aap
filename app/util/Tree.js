Ext.define('Aap.util.Tree', {
    statics: {
		
		//***********************************************************
		// get selection in tree
		// output: selection object 
		//***********************************************************
        getTreeSelection: function () {
        	var treeelement = Ext.getCmp('treestructure');
			var selectionmodel = treeelement.getSelectionModel();
			var selection = selectionmodel.getSelection();
			return selection;
        },

		//***********************************************************
		// get selection in tree
		// output: selection item (object)
		//***********************************************************
        getSelectedItem:  function() {
        	var treeelement = Ext.getCmp('treestructure');
			var selectionmodel = treeelement.getSelectionModel();
			var selectedItem = selectionmodel.getSelection()[0]; // not very pretty
			return selectedItem;
        },

		//***********************************************************
		// check whether tree item is selected or not
		// inpput: selection object 
		// output: true = selected, false = not selected (boolean)
		//***********************************************************
		isSelectedNode: function(selection) {
			var length = selection.length;
			var isselectednode;
			if (length == 0)
				{ isselectednode = false; } 
			else 	
				{ isselectednode = true}
			return isselectednode;
		}, 

		//***********************************************************
		// check whether node is starting point of meta data inhertance 
		// inpput: id of selected node (int) 
		// output: (boolean)	
		//		true = is meta node, 
		//   	false = is not meta node 
		//***********************************************************
		isMetanode: function(selectedItem) {
			var selitem = selectedItem
			var mn = selitem.get('metanode');
			return mn;
		},

 		//***********************************************************
		// check for inheritating node somewhere heigher in the 
		//	 treestructure
		// input: (record: Ext.data.Model)
		// output: (boolean)
		//		true = inheritating node present, 
		//   	false = no inheritating node presen 
		//***********************************************************
		isInherited: function(record) {
			var response = false;
			var currentitem = record;
	
			function checkForInheritance(currentitem){	
				if (currentitem.parentNode.isRoot() == true) {
					return false;
				}
				else if (Aap.util.Tree.isMetanode(currentitem) == true) {	
					return true;
				}
				else {
					var parentid = currentitem.parentNode.get('id');
					var currentitem = Ext.getStore('TreeStore').getNodeById(parentid);
					return checkForInheritance(currentitem);
				}
			} 
		
			if (Aap.util.Tree.isMetanode(currentitem) == true || currentitem.isRoot() == true) {
				return false;
			} 
			else {
				var response = checkForInheritance(currentitem);	
				return response;
			}
		},	

		
		//***********************************************************
		// change the metaaap_id of all child nodes below the passed node
		// input:
		// 		currentnode (Ext.data.Model): starting point of cascading
		//		new_metaid (int): new value for the metaaap_id property 
		//***********************************************************
		setChildrensMetaId: function(currentnode, new_metaid) { 
			currentnode.cascadeBy(function (new_id) {
				this.set('metaaap_id', new_id);
				console.log(this.get('metaaap_id'));
			}, null, [new_metaid]);
		},
			
		//***********************************************************
		// get the metaaap_id from the parents nodes
		// input: currentnode (Ext.data.Model): starting point of cascading
		// output: parents_metaid (int): metaaap_id in one of the parent nodes 
		//***********************************************************
		getParentsMetaId: function(currentnode) { 
			var parents_metaid = 0;
			currentnode.bubble(function (p_metaid) {
				console.log(this.get('name'));
				console.log(this.get('metanode'));
				console.log(this.get('metaaap_id'));
				if (this.get('metanode') == true){
					parents_metaid = this.get('metaaap_id');
				}
			}, null, [parents_metaid]);
			return parents_metaid;
		}	
    
	}
});

