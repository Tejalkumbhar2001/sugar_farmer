# Copyright (c) 2024, quantbit technologies pvt ltd and contributors
# For license information, please see license.txt

import frappe
import re
from frappe.model.document import Document

class FarmerAccess(Document):
	
	def before_save(self):
		# email = self.email
		# email_pattern = re.compile(r'^[\w\.-]+@[\w\.-]+\.\w+$')

		# if not email_pattern.match(email):
		# 	frappe.throw('Please enter a valid Email.....')

		# mobile = self.mobile
		# mobile_pattern = re.compile(r'^[6789]\d{9}$')

		# if not mobile_pattern.match(mobile):
		# 	frappe.throw('Please enter a valid Indian mobile number.')

		# if self.select_one == 'PAN':
		# 	self.gst=None
		# 	pan = self.pan
		# 	pan_pattern = re.compile(r'^[A-Z]{5}[0-9]{4}[A-Z]$')

		# 	if not pan_pattern.match(pan):
		# 		frappe.throw('Please enter a valid PAN.......')

		
        # Check for duplicate company


		# if self.mobile:
		# 	if frappe.get_all('Company Registration', filters={'mobile': self.mobile}):
		# 		frappe.throw('Mobile Number already exists.')

		# # Check for duplicate PAN
		# if self.pan:
		# 	if frappe.get_all('Company Registration', filters={'pan': self.pan}):
		# 		frappe.throw('PAN already exists.')

		
		# Create a new user
		doc = frappe.new_doc('User')
		doc.first_name = self.vendor_name
		doc.email = self.email
		doc.mobile_no = self.mobile
		doc.new_password = self.password
		doc.user_type = 'System User'
		doc.role_profile_name="Farmer"
		doc.insert(ignore_permissions=True)
		self.doc_user=doc.name
		doc.save()

  
		permission = frappe.new_doc('User Permission')
		permission.user = self.email
		permission.allow = 'Farmer List'
		permission.for_value = self.farmer
		permission.apply_to_all_doctypes = 1
		permission.insert(ignore_permissions=True)
		self.doc_user_permission=permission.name
		permission.save()

		# perm= frappe.new_doc('User Permission')
		# perm.user = self.email
		# perm.allow = 'Village'
		# perm.for_value = self.village
		# perm.apply_to_all_doctypes = 1
		# perm.insert(ignore_permissions=True)

		
		# self.doc_user_perm=perm.name
		# perm.save()
		
	def on_trash(self):
		self.delete_company_name_field_from_user_permission()
		self.delete_company_name_field_from_user()
	
	def delete_company_name_field_from_user_permission(self):
		frappe.delete_doc("User Permission",self.doc_user_permission,force=True)
		# frappe.delete_doc("User Permission",self.doc_user_perm,force=True)

	def delete_company_name_field_from_user(self):
		frappe.delete_doc("User",self.doc_user,force=True)
  
  