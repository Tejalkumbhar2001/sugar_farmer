// Copyright (c) 2024, quantbit technologies pvt ltd and contributors
// For license information, please see license.txt

frappe.ui.form.on('Bulk Payment Entry', {
	// refresh: function(frm) {

	// }
});




frappe.ui.form.on('Bulk Payment Entry', {
  setup: function(frm, cdt, cdn) {
        frm.fields_dict['bulk_payment_entry_details'].grid.get_field('party_type').get_query = function(doc, cdt, cdn) {
            return {
                filters: [
                    ['DocType', 'name','in', ['Supplier','Customer',  'Shareholder', 'Employee']]
                ]
            };
        };
    }
});


frappe.ui.form.on('Bulk Payment Entry', {
	setup: function(frm, cdt, cdn) {
		  frm.fields_dict['deduction'].grid.get_field('party_type').get_query = function(doc, cdt, cdn) {
			  return {
				  filters: [
					  ['DocType', 'name','in', ['Customer', 'Supplier', 'Shareholder', 'Employee']]
				  ]
			  };
		  };
	  }
  });
  
  frappe.ui.form.on('Bulk Payment Entry', {
	setup: function(frm, cdt, cdn) {
		  frm.fields_dict['taxes'].grid.get_field('party_type').get_query = function(doc, cdt, cdn) {
			  return {
				  filters: [
					  ['DocType', 'name','in', ['Customer', 'Supplier', 'Shareholder', 'Employee']]
				  ]
			  };
		  };
	  }
  });


frappe.ui.form.on('Bulk Payment Entry', {
	setup: function(frm) {
        frm.set_query("party_type", function(doc) {
            return {
                filters: [
                    ['DocType', 'name', 'in', ['Customer', 'Supplier','Shareholder','Employee']]
                ]
            };
        });
    }
});


frappe.ui.form.on('Bulk Payment Entry Details', {
	check: function(frm) {
        frm.clear_table("payment_reference");
		frm.refresh_field('payment_reference');
		frm.call({
			method:'call_two_in_one',
			doc:frm.doc
		})
	}
});

frappe.ui.form.on('Bulk Payment Entry Details', {
	check2: function(frm) {
        frm.clear_table("payment_reference");
		frm.refresh_field('payment_reference');
		frm.call({
			method:'call_two_in_one',
			doc:frm.doc
		})
	}
});

frappe.ui.form.on('Bulk Payment Entry Details', {
	party: function(frm) {
		frm.call({
			method:'get_accounts',
			doc:frm.doc
		})
	}
});

frappe.ui.form.on('Bulk Payment Entry Details', {
	bulk_payment_entry_details_add: function(frm,cdt,cdn) {   
        frm.refresh_field("bulk_payment_entry_details")
		frm.call({
			method:'set_party_type',
			doc:frm.doc
		})
        frm.clear_table("bulk_payment_entry_details");
	}
});


frappe.ui.form.on('Bulk Payment Entry Details', {
	bulk_payment_entry_details_remove: function(frm,cdt,cdn) {   
        frm.refresh_field("payment_reference")
		frm.call({
			method:'call_two_in_one',
			doc:frm.doc
		})
        frm.clear_table("payment_reference");
	}
});



frappe.ui.form.on('Bulk Payment Entry Details', {
	party: function(frm,cdt,cdn) {   
		frm.call({
			method:'set_pn',
			doc:frm.doc
		})
	}
});

frappe.ui.form.on('Bulk Payment Entry Deduction', {
	party: function(frm,cdt,cdn) {   
		frm.call({
			method:'trigger_party',
			doc:frm.doc
		})
	}
});

frappe.ui.form.on('Bulk Advance Taxes and Charges', {
	party: function(frm,cdt,cdn) {   
		frm.call({
			method:'trigger_party',
			doc:frm.doc
		})
	}
});

frappe.ui.form.on('Bulk Payment Entry Deduction', {
	deduction_add: function(frm,cdt,cdn) {   
        frm.refresh_field("deduction")
		frm.call({
			method:'set_party_type',
			doc:frm.doc
		})
        frm.clear_table("deduction");
	}
});

frappe.ui.form.on('Bulk Advance Taxes and Charges', {
	taxes_add: function(frm,cdt,cdn) {   
        frm.refresh_field("deduction")
		frm.call({
			method:'set_party_type',
			doc:frm.doc
		})
        frm.clear_table("deduction");
	}
});

frappe.ui.form.on('Bulk Payment Reference', {
    allocated_amount: function(frm, cdt, cdn) {   
        frm.call({
            method: 'allocated_trigger',
            doc: frm.doc
        });
    }
});


frappe.ui.form.on('Bulk Advance Taxes and Charges', {
	tax_amount: function(frm) {
		frm.call({
			method:'calculate_taxes',
			doc:frm.doc
		})
	}
});

frappe.ui.form.on('Bulk Payment Entry', {
	before_save: function(frm) {
		frm.call({
			method:'calculate_taxes',
			doc:frm.doc
		})
	}
});
frappe.ui.form.on('Bulk Advance Taxes and Charges', {
	rate: function(frm,cdt,cdn) {   
		frm.call({
			method:'calculate_taxes',
			doc:frm.doc
		})
	}
});

























// frappe.ui.form.on('Bulk Payment Entry', {
//     deduction_add: function(frm) {
//         frappe.call({
//             method: 'get_party_filter',
//             doc: frm.doc,
//             callback: function(r) {
//                 if (r.message) {
// 					frappe.msgprint(str(r.message))
//                     var partyList = r.message;

//                     frm.fields_dict.deduction.get_query = function(doc, cdt, cdn) {
//                         return {
//                             filters: [
//                                 ['party', 'in', partyList],
//                             ]
//                         };
//                     };
//                 }
//             }
//         });
//     }
// });

