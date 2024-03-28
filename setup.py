from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in sugar_farmer/__init__.py
from sugar_farmer import __version__ as version

setup(
	name="sugar_farmer",
	version=version,
	description="create user and its permissions",
	author="quantbit technologies pvt ltd",
	author_email="contact@erpdata.in",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
