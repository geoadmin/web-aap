Ext.define('Aap.controller.MainHeader', {
	extend: 'Ext.app.Controller',
	views: [
		'modals.Information'
	],

    init: function() {
        this.control({
			'mainheader button[action=openinfo]': {
                click: this.onInfoClick
			},	
			'mainheader button[action=toggleedit]': {
                toggle: this.onToggleEditButton
			},	
			'mainheader button[action=login]': {
           	// 	render: this.renderLoginButton,
              	toggle: this.toggleLoginButton ,
				click: this.onLoginButtonClick
			}	
		});
    },

    onInfoClick: function() {
		Ext.widget('information');
	},
  
	onToggleEditButton: function(button, pressed) {
		if(!pressed){
		
			// toggle header button
  	 		button.setText('Bearbeiten');

			// toggle tree buttons
   			Ext.getCmp('createbutton').hide();
			Ext.getCmp('editbutton').hide();
			Ext.getCmp('removebutton').hide();
			Ext.getCmp('exportbutton').show();
		
			// unlock drag&drop
			Ext.getCmp('treestructure').getView().getPlugin().dragZone.lock();
		}	
    	else {
		
			// toggle header button
  		  	button.setText('Bearbeiten abschliessen');
			
			// toggle tree buttons
   			Ext.getCmp('createbutton').show();
			Ext.getCmp('editbutton').show();
			Ext.getCmp('removebutton').show();
			Ext.getCmp('exportbutton').hide();

			// unlock drag&drop
			Ext.getCmp('treestructure').getView().getPlugin().dragZone.unlock();
		}
	},



	onLoginButtonClick: function() {
		if (Ext.getCmp('login').pressed == true) {
			Ext.getCmp('login').onClick = googleLogout();
		}
		else {
			Ext.getCmp('login').onClick = handleClientLoad(); 
		}
	},

  	toggleLoginButton: function() {
		if (Ext.getCmp('login').pressed == true) {
			Ext.getCmp('login').setText('Abmelden');
		}	  		
		else {
			Ext.getCmp('login').setText('Anmelden');
		}

		
	}

});

