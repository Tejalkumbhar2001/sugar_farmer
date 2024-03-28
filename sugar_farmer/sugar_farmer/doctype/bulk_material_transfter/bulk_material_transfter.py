# Copyright (c) 2024, quantbit technologies pvt ltd and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class BulkMaterialTransfter(Document):
	
			
	@frappe.whitelist()
	def available_qty(self):
		for row in self.get("items"):
			if row.source_warehouse and row.item_code:
				doc_name = frappe.get_value('Bin',{'item_code':row.item_code,'warehouse': row.source_warehouse}, "actual_qty")
				row.available_qty = doc_name
 
 
 
	def on_submit(self):
		self.material_transfer()
  
	def material_transfer(self):	
		doc = frappe.new_doc("Stock Entry")
		doc.stock_entry_type = "Material Transfer"
		doc.company = self.company
		doc.posting_date =self.date
		for i in self.get("items"):
			if(i.qty>0):
				doc.append("items", {
									"s_warehouse":i.source_warehouse,
									"t_warehouse":i.target_warehouse,
									"item_code": i.item_code,
									"qty":i.qty,
									})
		if doc.items:
			doc.bulk_material_transfer = self.name
			doc.insert()
			doc.save()
			doc.submit()

