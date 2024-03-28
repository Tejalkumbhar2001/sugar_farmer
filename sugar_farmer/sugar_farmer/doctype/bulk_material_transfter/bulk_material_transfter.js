// Copyright (c) 2024, quantbit technologies pvt ltd and contributors
// For license information, please see license.txt

frappe.ui.form.on('Bulk Material Transfter', {
	// refresh: function(frm) {

	// }
});

frappe.ui.form.on('Bulk Material Transfer Details', {
	source_warehouse: function(frm) {
		frm.call({
			method:'available_qty',
			doc:frm.doc
		})
	}
});
frappe.ui.form.on('Bulk Material Transfer Details', {
	item_code: function(frm) {
		frm.call({
			method:'available_qty',
			doc:frm.doc
		})
	}
});



//  set Source warehouse in Bulk Material Transfer Details
frappe.ui.form.on('Bulk Material Transfter', {
    set_source_warehouse(frm) {
        if (frm.doc.set_target){
            frm.doc.items.forEach(function(i){
                i.source_warehouse = frm.doc.set_source_warehouse;
            });
           
        } frm.refresh_field('items');
    }
});

frappe.ui.form.on('Bulk Material Transfer Details', {
    item_code: function(frm, cdt, cdn) {
        var child = locals[cdt][cdn];
        if (frm.doc.set_source_warehouse) {
            frappe.model.set_value(child.doctype, child.name, 'source_warehouse', frm.doc.set_source_warehouse);
        }
        frm.refresh_field('items');
    }
});


//  set Target warehouse in Bulk Material Transfer Details
frappe.ui.form.on('Bulk Material Transfter', {
    set_target_warehouse(frm) {
        if (frm.doc.set_target){
            frm.doc.items.forEach(function(i){
                i.target_warehouse = frm.doc.set_target_warehouse;
            });
           
        } frm.refresh_field('items');
    }
});

frappe.ui.form.on('Bulk Material Transfer Details', {
    item_code: function(frm, cdt, cdn) {
        var child = locals[cdt][cdn];
        if (frm.doc.set_target_warehouse) {
            frappe.model.set_value(child.doctype, child.name, 'target_warehouse', frm.doc.set_target_warehouse);
        }
        frm.refresh_field('items');
    }
});