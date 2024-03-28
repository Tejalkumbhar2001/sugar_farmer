// Copyright (c) 2024, quantbit technologies pvt ltd and contributors
// For license information, please see license.txt

frappe.ui.form.on('Farmer Access', {
	// refresh: function(frm) {

	// }
});


// frappe.ui.form.on('Farmer Access', {
// 	after_save: function(frm) {
// 		frm.call({
// 			method:'create_upermission',
// 			doc:frm.doc
// 		})
// 	}
// });


frappe.ui.form.on('Farmer Access', {
	setup: function(frm) {
		frm.set_query("village", function(doc) {
			if (frm.doc.circle_office) {
			return {
				filters: [
				    ['Village', 'circle_office', '=', frm.doc.circle_office],
				]
			};
		}else{
			return {};
		}
		});
	},
})



frappe.ui.form.on('Farmer Access', {
	setup: function(frm) {
		frm.set_query("farmer", function(doc) {
			if (frm.doc.circle_office && frm.doc.village) {
			return {
				filters: [
				    ['Farmer List', 'circle_office', '=', frm.doc.circle_office],
					['Farmer List', 'village', '=', frm.doc.village],
				]
			};
		}else{
			return {};
		}
		});
	},
})

