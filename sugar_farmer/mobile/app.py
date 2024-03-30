import json
import os
import calendar
import frappe
from frappe import _
from hrms.hr.doctype.leave_application.leave_application import (
            get_leave_balance_on,
        )
from bs4 import BeautifulSoup
from frappe.utils import cstr, now, today
from frappe.auth import LoginManager
from frappe.permissions import has_permission
from frappe.utils import (
    cstr,
    get_date_str,
    today,
    nowdate,
    getdate,
    now_datetime,
    get_first_day,
    get_last_day,
    date_diff,
    flt,
    pretty_date,
    fmt_money,
)
from frappe.utils.data import nowtime
from sugar_farmer.mobile.app_utils import (
    gen_response,
    generate_key,
    role_profile,
    ess_validate,
    get_employee_by_user,
    validate_employee_data,
    get_ess_settings,
    get_global_defaults,
    exception_handel,
)

from erpnext.accounts.utils import get_fiscal_year



@frappe.whitelist(allow_guest=True)
def login(usr, pwd):
    try:
        login_manager = LoginManager()
        login_manager.authenticate(usr, pwd)
        login_manager.post_login()
        if frappe.response["message"] == "Logged In":
            frappe.response["user"] = login_manager.user
            frappe.response["farmer_id"] = farmer_id()
            frappe.response["key_details"] = generate_key(login_manager.user)
        gen_response(200, frappe.response["message"])
    except frappe.AuthenticationError:
        gen_response(500, frappe.response["message"])
    except Exception as e:
        return exception_handel(e)


@frappe.whitelist()
def farmer_id():
    user_doc=frappe.get_doc("User",frappe.session.user)
    mobile=user_doc.mobile_no
    farmer_id=frappe.get_value("Farmer Access",{"email":frappe.session.user,"mobile":mobile},"farmer")
    if farmer_id:
        return farmer_id
